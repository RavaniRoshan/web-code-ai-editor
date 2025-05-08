
import React, { useState, useEffect } from "react";
import { TopMenuBar } from "@/components/TopMenuBar";
import Sidebar from "@/components/ui/sidebar";
import StatusBar from "@/components/StatusBar";
import AIDrawer from "@/components/AIDrawer";
import EditorLayout from "@/components/EditorLayout";
import { useToast } from "@/hooks/use-toast";
import { FileSystemService } from "@/services/fileSystem";
import { FileItem } from "@/components/Explorer";
import { NewFileDialog, NewFolderDialog, RenameDialog } from "@/components/FileMenus";
import { EditorOptions } from "@/types/editor";

const Index = () => {
  // Editor settings state
  const [editorOptions, setEditorOptions] = useState<EditorOptions>({
    wordWrap: "on",
    minimap: { enabled: false },
    fontSize: 14,
    theme: "vs-dark",
    tabSize: 2,
    lineNumbers: "on",
  });
  
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

  // Editor options change handler
  const handleEditorOptionsChange = (newOptions: Partial<EditorOptions>) => {
    setEditorOptions((prevOptions) => ({
      ...prevOptions,
      ...newOptions,
    }));
  };

  // File creation functions for Explorer interactions
  const handleCreateFileFromExplorer = (parentId: string) => {
    const folder = FileSystemService.getItem(parentId);
    setSelectedFolder(folder as FileItem);
    setIsNewFileDialogOpen(true);
  };

  const handleCreateFolderFromExplorer = (parentId: string) => {
    const folder = FileSystemService.getItem(parentId);
    setSelectedFolder(folder as FileItem);
    setIsNewFolderDialogOpen(true);
  };

  // Helper functions
  const handleRefreshFiles = () => {
    const filesData = FileSystemService.getFiles();
    setFiles(filesData);
  };

  const handleCollapseAll = () => {
    toast({
      title: "Folders collapsed",
      description: "All folders have been collapsed.",
      duration: 2000,
    });
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
        
        {/* Main Editor Layout */}
        <EditorLayout 
          activeView={activeView}
          files={files}
          openFiles={openFiles}
          activeFileId={activeFileId}
          selectedFolder={selectedFolder}
          showWelcome={showWelcome}
          isChatOpen={isChatOpen}
          isDrawerOpen={isDrawerOpen}
          editorOptions={editorOptions}
          onSelectFile={handleSelectFile}
          onSelectFileById={handleSelectFileById}
          onCloseFile={handleCloseFile}
          onCodeChange={handleCodeChange}
          onCursorPositionChange={handleCursorPositionChange}
          onSelectionChange={handleSelectionChange}
          onEditorOptionsChange={handleEditorOptionsChange}
          onCreateFile={() => setIsNewFileDialogOpen(true)}
          onCreateFolder={() => setIsNewFolderDialogOpen(true)}
          onRefreshFiles={handleRefreshFiles}
          onCollapseAll={handleCollapseAll}
          onRenameItem={(id) => {
            const item = FileSystemService.getItem(id);
            if (item) {
              setItemToRename(item);
              setIsRenameDialogOpen(true);
            }
          }}
          onDeleteItem={handleDeleteItem}
          onCreateFileFromExplorer={handleCreateFileFromExplorer}
          onCreateFolderFromExplorer={handleCreateFolderFromExplorer}
          setIsDrawerOpen={setIsDrawerOpen}
          setIsChatOpen={setIsChatOpen}
        />
        
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
