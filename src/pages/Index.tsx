import React, { useState, useEffect } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Sidebar from "@/components/Sidebar";
import Explorer, { FileItem } from "@/components/Explorer";
import EditorTabs from "@/components/EditorTabs";
import CodeEditor from "@/components/CodeEditor";
import AIAssistant from "@/components/AIAssistant";
import AIDrawer from "@/components/AIDrawer";
import { useToast } from "@/hooks/use-toast";
import { FileSystemService } from "@/services/fileSystem";
import { MessageSquare, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeView, setActiveView] = useState("explorer");
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, col: 0 });
  const [selectedCode, setSelectedCode] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  // Initialize files
  useEffect(() => {
    const filesData = FileSystemService.getFiles();
    setFiles(filesData);
  }, []);

  // Find active file
  const activeFile = openFiles.find(file => file.id === activeFileId) || null;

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleSelectFile = (file: FileItem) => {
    if (file.type === "file") {
      // Check if file is already open
      if (!openFiles.some(f => f.id === file.id)) {
        setOpenFiles([...openFiles, file]);
      }
      setActiveFileId(file.id);
    }
  };

  const handleSelectFileById = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const handleCloseFile = (fileId: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    // If we closed the active file, set the new active file
    if (fileId === activeFileId) {
      setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1].id : null);
    }
  };

  const handleCodeChange = (fileId: string, newContent: string) => {
    // Update the file content in both openFiles and files
    setOpenFiles(prev => 
      prev.map(file => file.id === fileId ? { ...file, content: newContent } : file)
    );
    
    // Update the file content in the file system
    FileSystemService.updateFileContent(fileId, newContent);
    
    // Update the UI state
    const updatedFiles = [...files];
    setFiles(updatedFiles);
  };

  // Update cursor position and selected code
  const handleCursorPositionChange = (position: { line: number, col: number }) => {
    setCursorPosition(position);
  };

  const handleSelectionChange = (selection: string | undefined) => {
    setSelectedCode(selection);
  };

  // File operations
  const handleCreateFile = (parentId: string, name: string) => {
    const newFile = FileSystemService.createFile(parentId, name);
    if (newFile) {
      // Update the UI state
      const updatedFiles = [...files];
      setFiles(updatedFiles);
    }
  };

  const handleCreateFolder = (parentId: string, name: string) => {
    const newFolder = FileSystemService.createFolder(parentId, name);
    if (newFolder) {
      // Update the UI state
      const updatedFiles = [...files];
      setFiles(updatedFiles);
    }
  };

  const handleRenameItem = (id: string, newName: string) => {
    const renamedItem = FileSystemService.renameItem(id, newName);
    if (renamedItem) {
      // Update the UI state
      const updatedFiles = [...files];
      setFiles(updatedFiles);
      
      // If the renamed item is open, update it in openFiles
      if (openFiles.some(file => file.id === id)) {
        setOpenFiles(prev => 
          prev.map(file => file.id === id ? { ...file, name: newName } : file)
        );
      }
    }
  };

  const handleDeleteItem = (id: string) => {
    const deleted = FileSystemService.deleteItem(id);
    if (deleted) {
      // Update the UI state
      const updatedFiles = [...files];
      setFiles(updatedFiles);
      
      // If the deleted item is open, close it
      if (openFiles.some(file => file.id === id)) {
        handleCloseFile(id);
      }
    }
  };

  // Mock save function
  const handleSaveFile = () => {
    if (activeFile) {
      toast({
        title: "File saved",
        description: `${activeFile.name} has been saved.`,
        duration: 2000,
      });
    }
  };

  // Set up keyboard shortcut for saving
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveFile();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-editor-background text-gray-300">
      {/* Main Sidebar */}
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      
      {/* Secondary Panel */}
      {activeView === "explorer" && (
        <div className="w-64 h-full bg-editor-sidebar overflow-auto border-r border-gray-800">
          <Explorer 
            files={files} 
            onSelectFile={handleSelectFile} 
            selectedFileId={activeFileId}
            onCreateFile={handleCreateFile}
            onCreateFolder={handleCreateFolder}
            onRenameItem={handleRenameItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      )}
      
      {activeView === "assistant" && (
        <div className="w-80 h-full border-r border-gray-800">
          <AIAssistant selectedCode={activeFile?.content} />
        </div>
      )}
      
      {/* Editor Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center p-1 border-b border-gray-800">
          <EditorTabs 
            openFiles={openFiles}
            activeFileId={activeFileId}
            onSelectFile={handleSelectFileById}
            onCloseFile={handleCloseFile}
          />
          <Link to="/marketplace">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs flex items-center"
            >
              <Package size={14} className="mr-1" /> Extensions
            </Button>
          </Link>
        </div>
        
        <ResizablePanelGroup direction="vertical" className="flex-1">
          <ResizablePanel defaultSize={75} minSize={30}>
            <div className="h-full overflow-hidden">
              <CodeEditor 
                file={activeFile}
                onCodeChange={handleCodeChange}
                onCursorPositionChange={handleCursorPositionChange}
                onSelectionChange={handleSelectionChange}
              />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={25} minSize={10}>
            <div className="h-full overflow-auto bg-editor-panel border-t border-gray-800 p-2">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2">
                <h3 className="text-sm font-medium">Terminal / Console</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center text-xs"
                >
                  <MessageSquare size={14} className="mr-1" /> Ask AI
                </Button>
              </div>
              <div className="font-mono text-xs text-gray-400">
                {/* Fix: Properly escape ">" characters in JSX */}
                <p>{"> Project loaded successfully"}</p>
                <p>{"> Ready for development"}</p>
                <p>{"> Monaco editor initialized with extended language support"}</p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* AI Assistant Drawer */}
      <AIDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen}
        selectedCode={selectedCode}
        currentFile={activeFile?.name}
        cursorPosition={cursorPosition}
      />
    </div>
  );
};

export default Index;
