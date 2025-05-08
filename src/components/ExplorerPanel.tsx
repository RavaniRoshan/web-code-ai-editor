
import React from "react";
import Explorer, { FileItem } from "@/components/Explorer";
import ExplorerHeader from "@/components/ExplorerHeader";

interface ExplorerPanelProps {
  files: FileItem[];
  selectedFolder: FileItem | null;
  activeFileId: string | null;
  onSelectFile: (file: FileItem) => void;
  onCreateFile: () => void;
  onCreateFolder: () => void;
  onRefresh: () => void;
  onCollapse: () => void;
  onRenameItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onCreateFileFromExplorer: (parentId: string, name: string) => void;
  onCreateFolderFromExplorer: (parentId: string, name: string) => void;
}

const ExplorerPanel: React.FC<ExplorerPanelProps> = ({
  files,
  selectedFolder,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onCreateFolder,
  onRefresh,
  onCollapse,
  onRenameItem,
  onDeleteItem,
  onCreateFileFromExplorer,
  onCreateFolderFromExplorer,
}) => {
  return (
    <div className="w-64 h-full bg-editor-sidebar overflow-hidden flex flex-col border-r border-gray-800">
      <ExplorerHeader
        onCreateFile={onCreateFile}
        onCreateFolder={onCreateFolder}
        onRefresh={onRefresh}
        onCollapse={onCollapse}
        selectedFolder={selectedFolder}
      />
      <div className="flex-grow overflow-auto">
        <Explorer 
          files={files} 
          onSelectFile={onSelectFile} 
          selectedFileId={activeFileId}
          onCreateFile={onCreateFileFromExplorer}
          onCreateFolder={onCreateFolderFromExplorer}
          onRenameItem={onRenameItem}
          onDeleteItem={onDeleteItem}
        />
      </div>
    </div>
  );
};

export default ExplorerPanel;
