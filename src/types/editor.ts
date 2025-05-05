
export interface Position {
  line: number;
  column: number;
}

export interface Selection {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
}

export interface EditorOptions {
  readOnly?: boolean;
  minimap?: { enabled: boolean };
  lineNumbers?: 'on' | 'off';
  fontSize?: number;
  tabSize?: number;
  theme?: string;
  wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded';
  autoIndent?: 'none' | 'keep' | 'brackets' | 'advanced' | 'full';
  cursorBlinking?: 'blink' | 'smooth' | 'phase' | 'expand' | 'solid';
  cursorStyle?: 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin';
  scrollBeyondLastLine?: boolean;
  renderLineHighlight?: 'none' | 'gutter' | 'line' | 'all';
  suggestOnTriggerCharacters?: boolean;
  acceptSuggestionOnCommitCharacter?: boolean;
  formatOnType?: boolean;
  formatOnPaste?: boolean;
  formatOnSave?: boolean;
}

// Monaco editor related types
export interface MonacoTheme {
  base: string;
  inherit: boolean;
  rules: any[];
  colors: Record<string, string>;
}

export interface EditorState {
  value: string;
  language: string;
  modelPath?: string;
}
