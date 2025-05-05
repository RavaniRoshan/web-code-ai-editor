
import React, { useState, useEffect } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import Sidebar from "@/components/Sidebar";
import Explorer, { FileItem } from "@/components/Explorer";
import EditorTabs from "@/components/EditorTabs";
import CodeEditor from "@/components/CodeEditor";
import AIAssistant from "@/components/AIAssistant";
import AIDrawer from "@/components/AIDrawer";
import TopMenuBar from "@/components/TopMenuBar";
import StatusBar from "@/components/StatusBar";
import ExplorerHeader from "@/components/ExplorerHeader";
import Terminal from "@/components/Terminal";
import WelcomePage from "@/components/WelcomePage";
import CopilotChat from "@/components/CopilotChat";
import { NewFileDialog, NewFolderDialog, RenameDialog } from "@/components/FileMenus";
import { useToast } from "@/hooks/use-toast";
import { FileSystemService } from "@/services/fileSystem";
import { Search, Package, MessageSquare, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeView, setActiveView] = useState("explorer");
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });
  const [selectedCode, setSelectedCode] = useState<string | undefined>(undefined);
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FileItem | null>(null);
  const [itemToRename, setItemToRename] = useState<FileItem | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const { toast } = useToast();

  // Initialize files
  useEffect(() => {
    const filesData = FileSystemService.getFiles();
    setFiles(filesData);
    
    // Set root as the selected folder
    if (filesData.length > 0) {
      setSelectedFolder(filesData[0]);
    }
  }, []);

  // Find active file
  const activeFile = openFiles.find(file => file.id === activeFileId) || null;

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleSelectFile = (file: FileItem) => {
    if (file.type === "file") {
      setShowWelcome(false);
      // Check if file is already open
      if (!openFiles.some(f => f.id === file.id)) {
        setOpenFiles([...openFiles, file]);
      }
      setActiveFileId(file.id);
    } else if (file.type === "folder") {
      setSelectedFolder(file);
    }
  };

  const handleSelectFileById = (fileId: string) => {
    setActiveFileId(fileId);
    setShowWelcome(false);
  };

  const handleCloseFile = (fileId: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    // If we closed the active file, set the new active file
    if (fileId === activeFileId) {
      setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1].id : null);
      if (newOpenFiles.length === 0) {
        setShowWelcome(true);
      }
    }
  };

  const handleCodeChange = (fileId: string, newContent: string) => {
    // Update the file content in both openFiles and files
    setOpenFiles(prev => 
      prev.map(file => file.id === fileId ? { ...file, content: newContent } : file)
    );
    
    // Update the file content in the file system
    FileSystemService.updateFileContent(fileId, newContent);
    
    // Update the UI state to reflect changes
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
  const handleCreateFile = (name: string) => {
    if (!selectedFolder) return;
    
    const newFile = FileSystemService.createFile(selectedFolder.id, name);
    if (newFile) {
      // Update the UI state
      const updatedFiles = [...files];
      setFiles(updatedFiles);
      
      // Open the new file
      setOpenFiles([...openFiles, newFile]);
      setActiveFileId(newFile.id);
      setShowWelcome(false);
      
      toast({
        title: "File created",
        description: `${name} has been created successfully.`,
        duration: 3000,
      });
    }
  };

  const handleCreateFolder = (name: string) => {
    if (!selectedFolder) return;
    
    const newFolder = FileSystemService.createFolder(selectedFolder.id, name);
    if (newFolder) {
      // Update the UI state
      const updatedFiles = [...files];
      setFiles(updatedFiles);
      
      toast({
        title: "Folder created",
        description: `${name} folder has been created.`,
        duration: 3000,
      });
    }
  };

  const handleRenameItem = (newName: string) => {
    if (!itemToRename) return;
    
    const renamedItem = FileSystemService.renameItem(itemToRename.id, newName);
    if (renamedItem) {
      // Update the UI state
      const updatedFiles = [...files];
      setFiles(updatedFiles);
      
      // If the renamed item is open, update it in openFiles
      if (openFiles.some(file => file.id === itemToRename.id)) {
        setOpenFiles(prev => 
          prev.map(file => file.id === itemToRename.id ? { ...file, name: newName } : file)
        );
      }
      
      toast({
        title: "Item renamed",
        description: `Item has been renamed to ${newName}.`,
        duration: 3000,
      });
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
      
      toast({
        title: "Item deleted",
        description: "The item has been deleted.",
        duration: 3000,
      });
    }
  };

  // Save function
  const handleSaveFile = () => {
    if (activeFile) {
      // In a real app, you'd save to filesystem
      toast({
        title: "File saved",
        description: `${activeFile.name} has been saved.`,
        duration: 2000,
      });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveFile();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        // Open command palette (simulated)
        toast({
          title: "Command Palette",
          description: "Command palette would open here.",
          duration: 2000,
        });
      } else if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "i") {
        e.preventDefault();
        setIsChatOpen(!isChatOpen);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile, isChatOpen]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-editor-background text-gray-300">
      {/* Main Sidebar */}
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      
      {/* Full layout */}
      <div className="flex flex-col flex-grow h-full">
        {/* Top Menu Bar */}
        <TopMenuBar 
          onOpenFile={() => toast({
            title: "Open File",
            description: "File dialog would open here.",
            duration: 2000,
          })}
          onSaveFile={handleSaveFile}
        />
        
        <div className="flex flex-grow overflow-hidden">
          {/* Secondary Panel - Explorer, Terminal, etc */}
          {activeView === "explorer" && (
            <div className="w-64 h-full bg-editor-sidebar overflow-hidden flex flex-col border-r border-gray-800">
              <ExplorerHeader
                onCreateFile={() => setIsNewFileDialogOpen(true)}
                onCreateFolder={() => setIsNewFolderDialogOpen(true)}
                onRefresh={() => {
                  const filesData = FileSystemService.getFiles();
                  setFiles(filesData);
                }}
                onCollapse={() => {
                  // Collapse all folders
                  toast({
                    title: "Folders collapsed",
                    description: "All folders have been collapsed.",
                    duration: 2000,
                  });
                }}
                selectedFolder={selectedFolder}
              />
              <div className="flex-grow overflow-auto">
                <Explorer 
                  files={files} 
                  onSelectFile={handleSelectFile} 
                  selectedFileId={activeFileId}
                  onCreateFile={(parentId, name) => {
                    const folder = FileSystemService.getItem(parentId);
                    setSelectedFolder(folder as FileItem);
                    setIsNewFileDialogOpen(true);
                  }}
                  onCreateFolder={(parentId, name) => {
                    const folder = FileSystemService.getItem(parentId);
                    setSelectedFolder(folder as FileItem);
                    setIsNewFolderDialogOpen(true);
                  }}
                  onRenameItem={(id) => {
                    const item = FileSystemService.getItem(id);
                    if (item) {
                      setItemToRename(item);
                      setIsRenameDialogOpen(true);
                    }
                  }}
                  onDeleteItem={handleDeleteItem}
                />
              </div>
            </div>
          )}
          
          {activeView === "assistant" && (
            <div className="w-80 h-full border-r border-gray-800">
              <AIAssistant selectedCode={activeFile?.content} />
            </div>
          )}
          
          {/* Editor Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Editor tabs */}
            <div className="flex justify-between items-center border-b border-gray-800">
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
                  className="text-xs flex items-center mr-1"
                >
                  <Package size={14} className="mr-1" /> Extensions
                </Button>
              </Link>
            </div>
            
            {/* Editor content area */}
            <div className="flex-1 overflow-hidden relative">
              {showWelcome && openFiles.length === 0 ? (
                <WelcomePage />
              ) : (
                <CodeEditor 
                  file={activeFile}
                  onCodeChange={handleCodeChange}
                  onCursorPositionChange={handleCursorPositionChange}
                  onSelectionChange={handleSelectionChange}
                />
              )}
            </div>
            
            {/* Terminal panel */}
            <div className="h-64 overflow-hidden flex flex-col border-t border-gray-800">
              <div className="flex items-center justify-between p-1 border-b border-gray-800">
                <div className="flex items-center px-2 py-1 text-xs bg-editor-active rounded-t border border-gray-700 border-b-0 relative -mb-px">
                  <TerminalIcon size={12} className="mr-1" />
                  <span>Terminal</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center text-xs"
                >
                  <MessageSquare size={14} className="mr-1" /> Ask AI
                </Button>
              </div>
              <div className="flex-1">
                <Terminal />
              </div>
            </div>
          </div>
          
          {/* Copilot Chat */}
          <CopilotChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
        
        {/* Status Bar */}
        <StatusBar
          lineCount={1000}
          currentLine={cursorPosition.line}
          currentColumn={cursorPosition.col}
          language={activeFile?.language || "plaintext"}
        />
      </div>

      {/* Dialogs */}
      <NewFileDialog
        isOpen={isNewFileDialogOpen}
        onClose={() => setIsNewFileDialogOpen(false)}
        onCreateFile={handleCreateFile}
        parentFolder={selectedFolder}
      />
      
      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onClose={() => setIsNewFolderDialogOpen(false)}
        onCreateFolder={handleCreateFolder}
        parentFolder={selectedFolder}
      />
      
      <RenameDialog
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        onRename={handleRenameItem}
        item={itemToRename}
      />

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
