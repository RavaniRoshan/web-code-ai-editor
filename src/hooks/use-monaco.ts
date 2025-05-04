
import { useRef, useEffect, useState } from 'react';
import { EditorOptions } from '@/types/editor';

interface MonacoEditor {
  create: (element: HTMLElement, options: any) => any;
}

interface Monaco {
  editor: {
    create: (element: HTMLElement, options: any) => any;
  }
}

declare global {
  interface Window {
    monaco?: Monaco;
  }
}

export const useMonaco = (options: EditorOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<any | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Monaco editor is loaded asynchronously, so we need to check if it's available
    if (typeof window !== 'undefined' && window.monaco) {
      const defaultOptions = {
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
