
import React, { useState, useEffect } from "react";
import { File, FileCode, Folder, ChevronRight, ChevronDown, MoreVertical, FilePlus, FolderPlus, Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@/components/ui/dropdown";
import { getIconForLanguage } from "@/services/languageService";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  language?: string;
  content?: string;
  children?: FileItem[];
}

interface FileTreeItemProps {
  item: FileItem;
  level: number;
  onSelectFile: (file: FileItem) => void;
  selectedFileId: string | null;
  onSelectFolder: (folder: FileItem) => void;
  selectedFolderId: string | null;
  onCreateFile: (parentId: string, name: string) => void;
  onCreateFolder: (parentId: string, name: string) => void;
  onRenameItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ 
  item, 
  level, 
  onSelectFile, 
  selectedFileId,
  onSelectFolder,
  selectedFolderId,
  onCreateFile,
  onCreateFolder,
  onRenameItem,
  onDeleteItem
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const [isHovered, setIsHovered] = useState(false);
  const isFolder = item.type === "folder";
  const isSelected = isFolder 
    ? selectedFolderId === item.id 
    : selectedFileId === item.id;
  
  const handleClick = (e: React.MouseEvent) => {
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
        style={{ paddingLeft: `${(level * 16) + 4}px` }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="mr-1.5 text-gray-400 flex-shrink-0">
          {getFileIcon()}
        </span>
        <span className="truncate flex-grow">{item.name}</span>
        
        {isHovered && (
          <div className="flex items-center gap-1">
            <Dropdown>
              <DropdownTrigger>
                <button 
                  className="p-0.5 rounded hover:bg-gray-700 text-gray-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical size={14} />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                {isFolder && (
                  <>
                    <DropdownItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreateFile(item.id, "");
                      }}
                    >
                      <FilePlus size={14} className="mr-2" />
                      New File
                    </DropdownItem>
                    <DropdownItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreateFolder(item.id, "");
                      }}
                    >
                      <FolderPlus size={14} className="mr-2" />
                      New Folder
                    </DropdownItem>
                  </>
                )}
                
                <DropdownItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRenameItem(item.id);
                  }}
                >
                  <Edit size={14} className="mr-2" />
                  Rename
                </DropdownItem>
                
                <DropdownItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item.id);
                  }}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash size={14} className="mr-2" />
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
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
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
              onRenameItem={onRenameItem}
              onDeleteItem={onDeleteItem}
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
  onRenameItem: (id: string) => void;
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

  // Update selectedFolder if the files prop changes (e.g. after initialization)
  useEffect(() => {
    if (files.length > 0 && !selectedFolder) {
      setSelectedFolder(files[0]);
    }
  }, [files]);

  return (
    <div className="h-full overflow-auto flex flex-col">      
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
            onCreateFile={onCreateFile}
            onCreateFolder={onCreateFolder}
            onRenameItem={onRenameItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Explorer;
