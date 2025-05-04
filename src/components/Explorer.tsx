
import React, { useState } from "react";
import { File, FileCode, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

const FileTreeItem: React.FC<FolderProps> = ({ 
  item, 
  level, 
  onSelectFile, 
  selectedFileId 
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const isFolder = item.type === "folder";
  const isSelected = selectedFileId === item.id;
  
  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelectFile(item);
    }
  };

  const getFileIcon = () => {
    if (isFolder) {
      return isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />;
    }
    
    if (item.language === "javascript" || item.language === "jsx") {
      return <FileCode size={16} className="text-yellow-400" />;
    } else if (item.language === "typescript" || item.language === "tsx") {
      return <FileCode size={16} className="text-blue-400" />;
    } else if (item.language === "css") {
      return <FileCode size={16} className="text-purple-400" />;
    } else if (item.language === "html") {
      return <FileCode size={16} className="text-orange-400" />;
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
}

const Explorer: React.FC<ExplorerProps> = ({ 
  files, 
  onSelectFile,
  selectedFileId
}) => {
  return (
    <div className="h-full overflow-auto">
      <div className="p-2 text-sm font-medium text-gray-300">EXPLORER</div>
      <div>
        {files.map((item) => (
          <FileTreeItem
            key={item.id}
            item={item}
            level={0}
            onSelectFile={onSelectFile}
            selectedFileId={selectedFileId}
          />
        ))}
      </div>
    </div>
  );
};

export default Explorer;
