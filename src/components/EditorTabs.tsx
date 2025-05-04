
import React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileItem } from "./Explorer";

interface EditorTabsProps {
  openFiles: FileItem[];
  activeFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  openFiles,
  activeFileId,
  onSelectFile,
  onCloseFile,
}) => {
  const getFileIcon = (file: FileItem) => {
    if (file.language === "javascript" || file.language === "jsx") {
      return "js";
    } else if (file.language === "typescript" || file.language === "tsx") {
      return "ts";
    } else if (file.language === "css") {
      return "css";
    } else if (file.language === "html") {
      return "html";
    }
    return "txt";
  };

  return (
    <div className="flex bg-editor-background border-b border-gray-800 overflow-x-auto">
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={cn(
            "flex items-center px-3 py-2 text-sm border-r border-gray-800 min-w-fit cursor-pointer",
            activeFileId === file.id ? "bg-editor-active" : "bg-editor-background hover:bg-editor-line"
          )}
          onClick={() => onSelectFile(file.id)}
        >
          <span className="mr-2 text-xs opacity-70">
            {getFileIcon(file)}
          </span>
          <span className="truncate max-w-[120px]">{file.name}</span>
          <button
            className="ml-2 opacity-50 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onCloseFile(file.id);
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;
