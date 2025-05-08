
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import EditorTabs from "@/components/EditorTabs";
import CodeEditor from "@/components/CodeEditor";
import WelcomePage from "@/components/WelcomePage";
import EditorSettings from "@/components/EditorSettings";
import { FileItem } from "@/components/Explorer";
import { EditorOptions } from "@/types/editor";

interface EditorAreaProps {
  openFiles: FileItem[];
  activeFileId: string | null;
  showWelcome: boolean;
  onSelectFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
  onCodeChange: (fileId: string, newContent: string) => void;
  onCursorPositionChange: (position: { line: number, col: number }) => void;
  onSelectionChange: (selection: string | undefined) => void;
  editorOptions: EditorOptions;
  onEditorOptionsChange: (newOptions: Partial<EditorOptions>) => void;
}

const EditorArea: React.FC<EditorAreaProps> = ({
  openFiles,
  activeFileId,
  showWelcome,
  onSelectFile,
  onCloseFile,
  onCodeChange,
  onCursorPositionChange,
  onSelectionChange,
  editorOptions,
  onEditorOptionsChange
}) => {
  const activeFile = openFiles.find(file => file.id === activeFileId) || null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Editor tabs */}
      <div className="flex justify-between items-center border-b border-gray-800">
        <EditorTabs 
          openFiles={openFiles}
          activeFileId={activeFileId}
          onSelectFile={onSelectFile}
          onCloseFile={onCloseFile}
        />
        <div className="flex items-center gap-2">
          <EditorSettings 
            options={editorOptions}
            onOptionsChange={onEditorOptionsChange}
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
      </div>
      
      {/* Editor content area */}
      <div className="flex-1 overflow-hidden relative">
        {showWelcome && openFiles.length === 0 ? (
          <WelcomePage />
        ) : (
          <CodeEditor 
            file={activeFile}
            onCodeChange={onCodeChange}
            onCursorPositionChange={onCursorPositionChange}
            onSelectionChange={onSelectionChange}
            editorOptions={editorOptions}
          />
        )}
      </div>
    </div>
  );
};

export default EditorArea;
