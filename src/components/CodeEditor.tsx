import React, { useState, useRef, useEffect } from 'react';
import Editor, { useMonaco, DiffEditor } from "@monaco-editor/react";
import { FileItem } from "@/components/Explorer";

interface CodeEditorProps {
  file: FileItem | null;
  onCodeChange: (fileId: string, newContent: string) => void;
  onCursorPositionChange: (position: { line: number, col: number }) => void;
  onSelectionChange: (selection: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  file, 
  onCodeChange,
  onCursorPositionChange,
  onSelectionChange
}) => {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    if (file) {
      setCode(file.content || "");
    }
  }, [file]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Set initial cursor position
    editor.setPosition({ lineNumber: 1, column: 1 });

    // Subscribe to cursor position changes
    editor.onDidChangeCursorPosition((e: any) => {
      onCursorPositionChange({
        line: e.position.lineNumber,
        col: e.position.column,
      });
    });

    // Subscribe to selection changes
    editor.onDidChangeCursorSelection((e: any) => {
      const selection = editor.getModel()?.getValueInRange(e.selection);
      onSelectionChange(selection);
    });
  };

  const handleCodeChange = (value: string) => {
    if (file) {
      setCode(value);
      onCodeChange(file.id, value);
    }
  };

  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: "on",
    wrappingIndent: "indent",
    minimap: {
      enabled: false
    },
  };

  if (!file) {
    return <div className="flex-1 flex items-center justify-center">No file selected</div>;
  }

  return (
    <Editor
      height="100%"
      width="100%"
      language={file.language || "plaintext"}
      value={code}
      theme="vs-dark"
      options={editorOptions}
      onChange={handleCodeChange}
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
