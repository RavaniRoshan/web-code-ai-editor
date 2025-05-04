
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
}
