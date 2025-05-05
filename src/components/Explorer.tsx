import React, { useState } from "react";
import { File, FileCode, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import FileOperations from "./FileOperations";
import { getIconForLanguage } from "@/services/languageService";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  language?: string;
  content?: string;
  children?: FileItem[];
}

interface FolderProps {
  item: FileItem;
  level: number;
  onSelectFile: (file: FileItem) => void;
  selectedFileId: string | null;
  onSelectFolder: (folder: FileItem) => void;
  selectedFolderId: string | null;
}

const FileTreeItem: React.FC<FolderProps> = ({ 
  item, 
  level, 
  onSelectFile, 
  selectedFileId,
  onSelectFolder,
  selectedFolderId
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const isFolder = item.type === "folder";
  const isSelected = isFolder 
    ? selectedFolderId === item.id 
    : selectedFileId === item.id;
  
  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
      onSelectFolder(item);
    } else {
      onSelectFile(item);
    }
  };

  const getFileIcon = () => {
    if (isFolder) {
      return isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />;
    }
    
    if (item.language) {
      const iconClass = getIconForLanguage(item.language);
      return <FileCode size={16} className={iconClass} />;
    }
    
    return <File size={16} />;
  };

  return (
    <div>
      <div 
        className={cn(
          "flex items-center py-1 px-2 hover:bg-editor-active cursor-pointer text-sm",
          isSelected && "bg-editor-active"
        )}
        style={{ paddingLeft: `${(level * 12) + 4}px` }}
        onClick={handleClick}
      >
        <span className="mr-1 text-gray-400">
          {getFileIcon()}
        </span>
        <span className="truncate">{item.name}</span>
      </div>
      
      {isFolder && isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelectFile={onSelectFile}
              selectedFileId={selectedFileId}
              onSelectFolder={onSelectFolder}
              selectedFolderId={selectedFolderId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ExplorerProps {
  files: FileItem[];
  onSelectFile: (file: FileItem) => void;
  selectedFileId: string | null;
  onCreateFile: (parentId: string, name: string) => void;
  onCreateFolder: (parentId: string, name: string) => void;
  onRenameItem: (id: string, newName: string) => void;
  onDeleteItem: (id: string) => void;
}

const Explorer: React.FC<ExplorerProps> = ({ 
  files, 
  onSelectFile,
  selectedFileId,
  onCreateFile,
  onCreateFolder,
  onRenameItem,
  onDeleteItem
}) => {
  const [selectedFolder, setSelectedFolder] = useState<FileItem | null>(files[0]);

  const handleSelectFolder = (folder: FileItem) => {
    setSelectedFolder(folder);
  };

  return (
    <div className="h-full overflow-auto flex flex-col">
      <div className="p-2 text-sm font-medium text-gray-300 border-b border-gray-800">EXPLORER</div>
      
      <FileOperations 
        selectedFolder={selectedFolder}
        onCreateFile={onCreateFile}
        onCreateFolder={onCreateFolder}
        onRenameItem={onRenameItem}
        onDeleteItem={onDeleteItem}
      />
      
      <div className="flex-1 overflow-auto">
        {files.map((item) => (
          <FileTreeItem
            key={item.id}
            item={item}
            level={0}
            onSelectFile={onSelectFile}
            selectedFileId={selectedFileId}
            onSelectFolder={handleSelectFolder}
            selectedFolderId={selectedFolder?.id || null}
          />
        ))}
      </div>
    </div>
  );
};

export default Explorer;
