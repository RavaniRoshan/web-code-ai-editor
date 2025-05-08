
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      // Include Monaco Editor core
      'monaco-editor/esm/vs/editor/editor.api',
      // Include language features
      'monaco-editor/esm/vs/language/typescript/ts.worker',
      'monaco-editor/esm/vs/language/json/json.worker',
      'monaco-editor/esm/vs/language/css/css.worker',
      'monaco-editor/esm/vs/language/html/html.worker',
      'monaco-editor/esm/vs/editor/editor.worker',
    ],
    exclude: ['monaco-languageclient', 'vscode']
  },
  build: {
    rollupOptions: {
      external: [
        // Externalize problematic Monaco Editor dependencies
        /^monaco-editor\/esm\/vs\/base\/common\/.*\.js$/,
        /^monaco-editor\/esm\/vs\/base\/worker\/.*\.js$/,
        /^monaco-editor\/esm\/vs\/editor\/.*\/.*\.js$/,
        'monaco-editor/esm/vs/base/common/json.js',
        // Externalize problematic VSCode dependencies
        /^vscode\/.*\.js$/
      ],
      output: {
        manualChunks: {
          // Split Monaco Editor into separate chunks
          'monaco-editor': ['monaco-editor'],
          'monaco-languageclient': ['monaco-languageclient'],
          'vscode': ['vscode-languageserver-protocol'],
        }
      }
    },
    commonjsOptions: {
      // Handle CommonJS dependencies
      transformMixedEsModules: true,
      include: [/monaco-editor/, /monaco-languageclient/, /vscode-/]
    },
  }
}));
