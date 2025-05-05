
import React from "react";
import { ChevronDown, FileText, FolderPlus, FilePlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileItem } from "./Explorer";

interface ExplorerHeaderProps {
  onCreateFile: () => void;
  onCreateFolder: () => void;
  onRefresh: () => void;
  onCollapse: () => void;
  selectedFolder: FileItem | null;
}

const ExplorerHeader: React.FC<ExplorerHeaderProps> = ({
  onCreateFile,
  onCreateFolder,
  onRefresh,
  onCollapse,
  selectedFolder
}) => {
  return (
    <div className="p-2 flex flex-col gap-2 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium uppercase tracking-wide text-gray-400">
          EXPLORER
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={onCreateFile}
            disabled={!selectedFolder}
            title="New File"
          >
            <FilePlus size={16} />
          </Button>
          <Button
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={onCreateFolder}
            disabled={!selectedFolder}
            title="New Folder"
          >
            <FolderPlus size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={onRefresh}
            title="Refresh Explorer"
          >
            {/* Refresh icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
              <path d="M16 21h5v-5"></path>
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon" 
            className="h-6 w-6 text-gray-400 hover:text-white"
            onClick={onCollapse}
            title="Collapse All"
          >
            {/* Collapse icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v6"></path>
              <path d="m16 7-4-4-4 4"></path>
              <path d="M12 21v-6"></path>
              <path d="m16 17-4 4-4-4"></path>
              <path d="M3 12h18"></path>
            </svg>
          </Button>
          <Button
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-white"
            title="More Actions"
          >
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExplorerHeader;
