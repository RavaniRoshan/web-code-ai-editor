
import React, { useState } from "react";
import { FileItem } from "./Explorer";
import { 
  Folder, 
  File as FileIcon, 
  Plus, 
  Trash, 
  Edit, 
  Check, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileOperationsProps {
  selectedFolder: FileItem | null;
  onCreateFile: (parentId: string, name: string) => void;
  onCreateFolder: (parentId: string, name: string) => void;
  onRenameItem: (id: string, newName: string) => void;
  onDeleteItem: (id: string) => void;
}

const FileOperations: React.FC<FileOperationsProps> = ({
  selectedFolder,
  onCreateFile,
  onCreateFolder,
  onRenameItem,
  onDeleteItem
}) => {
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const { toast } = useToast();

  const handleCreateFile = () => {
    if (!selectedFolder || selectedFolder.type !== "folder") {
      toast({
        title: "Error",
        description: "Please select a folder first",
        variant: "destructive"
      });
      return;
    }
    setIsCreatingFile(true);
    setNewItemName("");
  };

  const handleCreateFolder = () => {
    if (!selectedFolder || selectedFolder.type !== "folder") {
      toast({
        title: "Error",
        description: "Please select a folder first",
        variant: "destructive"
      });
      return;
    }
    setIsCreatingFolder(true);
    setNewItemName("");
  };

  const handleRenameItem = () => {
    if (!selectedFolder) {
      toast({
        title: "Error",
        description: "Please select an item to rename",
        variant: "destructive"
      });
      return;
    }
    setIsRenaming(true);
    setNewItemName(selectedFolder.name);
  };

  const handleDeleteItem = () => {
    if (!selectedFolder) {
      toast({
        title: "Error",
        description: "Please select an item to delete",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedFolder.id === "root") {
      toast({
        title: "Error",
        description: "Cannot delete the root folder",
        variant: "destructive"
      });
      return;
    }
    
    onDeleteItem(selectedFolder.id);
    toast({
      title: "Deleted",
      description: `${selectedFolder.name} has been deleted`
    });
  };

  const handleSubmitCreate = (type: 'file' | 'folder') => {
    if (!newItemName.trim() || !selectedFolder) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (type === 'file') {
      onCreateFile(selectedFolder.id, newItemName);
      setIsCreatingFile(false);
    } else {
      onCreateFolder(selectedFolder.id, newItemName);
      setIsCreatingFolder(false);
    }
    
    setNewItemName("");
    toast({
      title: "Created",
      description: `${newItemName} has been created`
    });
  };

  const handleSubmitRename = () => {
    if (!newItemName.trim() || !selectedFolder) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    onRenameItem(selectedFolder.id, newItemName);
    setIsRenaming(false);
    setNewItemName("");
    toast({
      title: "Renamed",
      description: `Item has been renamed to ${newItemName}`
    });
  };

  return (
    <div className="p-2 border-b border-gray-800">
      {(isCreatingFile || isCreatingFolder || isRenaming) ? (
        <div className="flex items-center">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            autoFocus
            className="flex-1 bg-editor-active text-gray-300 border border-gray-700 rounded px-2 py-1 text-sm"
            placeholder={
              isCreatingFile ? "File name..." : 
              isCreatingFolder ? "Folder name..." :
              "New name..."
            }
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              if (isCreatingFile) handleSubmitCreate('file');
              else if (isCreatingFolder) handleSubmitCreate('folder');
              else handleSubmitRename();
            }}
            className="ml-1"
          >
            <Check size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              setIsCreatingFile(false);
              setIsCreatingFolder(false);
              setIsRenaming(false);
            }}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateFile}
            className="flex items-center"
          >
            <FileIcon size={14} className="mr-1" /> New File
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateFolder}
            className="flex items-center"
          >
            <Folder size={14} className="mr-1" /> New Folder
          </Button>
          {selectedFolder && selectedFolder.id !== "root" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRenameItem}
                className="flex items-center"
              >
                <Edit size={14} className="mr-1" /> Rename
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteItem}
                className="flex items-center text-red-400 hover:text-red-300"
              >
                <Trash size={14} className="mr-1" /> Delete
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FileOperations;
