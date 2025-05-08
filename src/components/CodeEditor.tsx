
import React, { useState, useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { FileItem } from "@/components/Explorer";
import { EditorOptions } from "@/types/editor";
import { useMonaco } from "@/hooks/use-monaco";
import { createLanguageClient } from "@/services/lspClient";

interface CodeEditorProps {
  file: FileItem | null;
  onCodeChange: (fileId: string, newContent: string) => void;
  onCursorPositionChange: (position: { line: number, col: number }) => void;
  onSelectionChange: (selection: string | undefined) => void;
  editorOptions?: EditorOptions;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  file, 
  onCodeChange,
  onCursorPositionChange,
  onSelectionChange,
  editorOptions = {}
}) => {
  const editorRef = useRef<any>(null);
  const [code, setCode] = useState<string>("");
  const { containerRef, editorInstance, lspClient } = useMonaco(editorOptions, file?.name);

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

    // Initialize language client if file exists
    if (file) {
      createLanguageClient(editor, file.name);
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    if (file && value !== undefined) {
      setCode(value);
      onCodeChange(file.id, value);
    }
  };

  // Ensure we use the correct types for wordWrap
  const editorDefaults = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: "on" as "on" | "off" | "wordWrapColumn" | "bounded",
    minimap: {
      enabled: false
    },
    fontSize: 14,
    theme: "vs-dark",
  };

  // Merge default options with user provided ones
  const mergedOptions = {
    ...editorDefaults,
    ...editorOptions,
    minimap: {
      ...editorDefaults.minimap,
      ...editorOptions?.minimap
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
      theme={mergedOptions.theme || "vs-dark"}
      options={mergedOptions}
      onChange={handleCodeChange}
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
