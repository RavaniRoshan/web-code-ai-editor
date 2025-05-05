
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { FileItem } from "./Explorer";
import { getLanguageFromExtension } from "@/services/languageService";
import EditorSettings from "./EditorSettings";
import { EditorOptions } from "@/types/editor";

interface CodeEditorProps {
  file: FileItem | null;
  onCodeChange: (fileId: string, newContent: string) => void;
  onCursorPositionChange?: (position: { line: number, col: number }) => void;
  onSelectionChange?: (selection: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  file, 
  onCodeChange,
  onCursorPositionChange,
  onSelectionChange
}) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, col: 0 });
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [editorOptions, setEditorOptions] = useState<EditorOptions>({
    fontSize: 14,
    minimap: { enabled: true },
    lineNumbers: 'on',
    tabSize: 2,
    theme: 'vs-dark',
    wordWrap: 'on',
    scrollBeyondLastLine: false,
    renderLineHighlight: 'all',
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnCommitCharacter: true,
    autoIndent: 'full',
    cursorBlinking: 'smooth',
    cursorStyle: 'line'
  });
  
  const handleEditorChange = (value: string = "") => {
    if (file) {
      onCodeChange(file.id, value);
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    setEditorInstance(editor);
    editor.focus();
    
    // Add Monaco editor configuration here
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });
    
    editor.onDidChangeCursorPosition((e: any) => {
      const newPosition = {
        line: e.position.lineNumber,
        col: e.position.column
      };
      setCursorPosition(newPosition);
      onCursorPositionChange?.(newPosition);
    });
    
    editor.onDidChangeCursorSelection((e: any) => {
      const selection = editor.getModel().getValueInRange(e.selection);
      onSelectionChange?.(selection.length > 0 ? selection : undefined);
    });
  };

  const handleOptionsChange = (newOptions: Partial<EditorOptions>) => {
    setEditorOptions(prev => ({
      ...prev,
      ...newOptions
    }));
  };

  const getLanguageFromFilename = (filename: string) => {
    return getLanguageFromExtension(filename);
  };

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Select a file to edit</p>
      </div>
    );
  }

  const language = file.language || getLanguageFromFilename(file.name);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <EditorSettings options={editorOptions} onOptionsChange={handleOptionsChange} />
      </div>
      
      <Editor
        height="calc(100% - 24px)" 
        language={language}
        value={file.content || ""}
        theme={editorOptions.theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          ...editorOptions,
          automaticLayout: true,
        }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-editor-background/80 backdrop-blur-sm text-gray-400 p-1 text-xs border-t border-gray-800">
        Line {cursorPosition.line}, Column {cursorPosition.col} | {language}
      </div>
    </div>
  );
};

export default CodeEditor;
