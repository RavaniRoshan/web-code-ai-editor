
import { useRef, useEffect, useState } from 'react';
import { editor } from 'monaco-editor';
import { EditorOptions } from '@/types/editor';

export const useMonaco = (options: EditorOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Monaco editor is loaded asynchronously, so we need to check if it's available
    if (typeof window !== 'undefined' && window.monaco) {
      const defaultOptions: editor.IEditorOptions = {
        automaticLayout: true,
        scrollBeyondLastLine: false,
        minimap: options.minimap || { enabled: true },
        fontSize: options.fontSize || 14,
        renderLineHighlight: 'all',
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
        },
        lineNumbers: options.lineNumbers || 'on',
        readOnly: options.readOnly || false,
        tabSize: options.tabSize || 2,
        theme: options.theme || 'vs-dark',
      };

      const editor = window.monaco.editor.create(containerRef.current, defaultOptions);
      setEditorInstance(editor);

      // Cleanup function
      return () => {
        editor.dispose();
      };
    }
  }, [options]);

  return { containerRef, editorInstance };
};

