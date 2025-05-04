
import React, { useState, useRef, useEffect } from "react";
import { FileItem } from "./Explorer";

interface CodeEditorProps {
  file: FileItem | null;
  onCodeChange: (fileId: string, newContent: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ file, onCodeChange }) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, col: 0 });
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const content = file?.content || "";
  const lines = content.split("\n");
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [file?.id]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        const newContent = content.substring(0, start) + "  " + content.substring(end);
        onCodeChange(file?.id || "", newContent);
        
        // Set cursor position after indentation
        setTimeout(() => {
          textarea.selectionStart = start + 2;
          textarea.selectionEnd = start + 2;
        }, 0);
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (file) {
      onCodeChange(file.id, e.target.value);
    }
  };
  
  const handleTextareaScroll = () => {
    if (textareaRef.current && editorRef.current) {
      editorRef.current.scrollTop = textareaRef.current.scrollTop;
      editorRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select a file to edit</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div 
        ref={editorRef}
        className="absolute inset-0 overflow-auto code-editor p-2 text-gray-300"
      >
        {/* Line numbers and syntax highlighted code */}
        <div className="flex">
          <div className="pr-4 text-right select-none">
            {lines.map((_, i) => (
              <div key={i} className="text-gray-500 w-8">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre">
                {line || " "}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Invisible textarea for input handling */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={handleTextareaScroll}
        className="absolute inset-0 w-full h-full opacity-0 resize-none outline-none overflow-auto code-editor p-2 text-transparent caret-transparent bg-transparent"
        spellCheck="false"
        autoCapitalize="off"
        autoCorrect="off"
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-editor-background text-gray-500 p-1 text-xs border-t border-gray-800">
        Line {cursorPosition.line + 1}, Column {cursorPosition.col + 1} | {file.language || "plaintext"}
      </div>
    </div>
  );
};

export default CodeEditor;
