
import React from "react";
import ExplorerPanel from "@/components/ExplorerPanel";
import AIAssistant from "@/components/AIAssistant";
import EditorArea from "@/components/EditorArea";
import TerminalPanel from "@/components/TerminalPanel";
import CopilotChat from "@/components/CopilotChat";
import { FileItem } from "@/components/Explorer";
import { EditorOptions } from "@/types/editor";

interface EditorLayoutProps {
  activeView: string;
  files: FileItem[];
  openFiles: FileItem[];
  activeFileId: string | null;
  selectedFolder: FileItem | null;
  showWelcome: boolean;
  isChatOpen: boolean;
  isDrawerOpen: boolean;
  editorOptions: EditorOptions;
  onSelectFile: (file: FileItem) => void;
  onSelectFileById: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
  onCodeChange: (fileId: string, newContent: string) => void;
  onCursorPositionChange: (position: { line: number, col: number }) => void;
  onSelectionChange: (selection: string | undefined) => void;
  onEditorOptionsChange: (newOptions: Partial<EditorOptions>) => void;
  onCreateFile: () => void;
  onCreateFolder: () => void;
  onRefreshFiles: () => void;
  onCollapseAll: () => void;
  onRenameItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onCreateFileFromExplorer: (parentId: string, name: string) => void;
  onCreateFolderFromExplorer: (parentId: string, name: string) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  setIsChatOpen: (isOpen: boolean) => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  activeView,
  files,
  openFiles,
  activeFileId,
  selectedFolder,
  showWelcome,
  isChatOpen,
  isDrawerOpen,
  editorOptions,
  onSelectFile,
  onSelectFileById,
  onCloseFile,
  onCodeChange,
  onCursorPositionChange,
  onSelectionChange,
  onEditorOptionsChange,
  onCreateFile,
  onCreateFolder,
  onRefreshFiles,
  onCollapseAll,
  onRenameItem,
  onDeleteItem,
  onCreateFileFromExplorer,
  onCreateFolderFromExplorer,
  setIsDrawerOpen,
  setIsChatOpen,
}) => {
  const activeFile = openFiles.find(file => file.id === activeFileId);
  
  return (
    <div className="flex flex-grow overflow-hidden">
      {/* Secondary Panel - Explorer, Terminal, etc */}
      {activeView === "explorer" && (
        <ExplorerPanel 
          files={files}
          selectedFolder={selectedFolder}
          activeFileId={activeFileId}
          onSelectFile={onSelectFile}
          onCreateFile={onCreateFile}
          onCreateFolder={onCreateFolder}
          onRefresh={onRefreshFiles}
          onCollapse={onCollapseAll}
          onRenameItem={onRenameItem}
          onDeleteItem={onDeleteItem}
          onCreateFileFromExplorer={onCreateFileFromExplorer}
          onCreateFolderFromExplorer={onCreateFolderFromExplorer}
        />
      )}
      
      {activeView === "assistant" && (
        <div className="w-80 h-full border-r border-gray-800">
          <AIAssistant selectedCode={activeFile?.content} />
        </div>
      )}
      
      {/* Editor Area with Tabs, Editor, Terminal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <EditorArea 
          openFiles={openFiles}
          activeFileId={activeFileId}
          showWelcome={showWelcome}
          onSelectFile={onSelectFileById}
          onCloseFile={onCloseFile}
          onCodeChange={onCodeChange}
          onCursorPositionChange={onCursorPositionChange}
          onSelectionChange={onSelectionChange}
          editorOptions={editorOptions}
          onEditorOptionsChange={onEditorOptionsChange}
        />
        
        <TerminalPanel onOpenAIDrawer={() => setIsDrawerOpen(true)} />
      </div>
      
      {/* Copilot Chat */}
      <CopilotChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default EditorLayout;
