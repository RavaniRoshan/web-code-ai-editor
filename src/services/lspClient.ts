import * as monaco from 'monaco-editor';
import {
  MonacoLanguageClient,
} from 'monaco-languageclient';
import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter
} from 'vscode-ws-jsonrpc';
import { getLanguageFromExtension } from './languageService';

// Map to keep track of active language clients
const languageClients = new Map<string, MonacoLanguageClient>();

export function createLanguageClient(editor: monaco.editor.IStandaloneCodeEditor, fileName: string): MonacoLanguageClient | null {
  const language = getLanguageFromExtension(fileName);
  
  // Check if we already have a client for this language
  if (languageClients.has(language)) {
    return languageClients.get(language) || null;
  }
  
  // Create WebSocket connection to LSP server
  try {
    const url = new URL(`/lsp?language=${language}`, window.location.href);
    url.protocol = url.protocol.replace('http', 'ws');
    
    console.log(`Connecting to LSP server for ${language} at ${url.href}`);
    const socket = new WebSocket(url.href);
    
    socket.onopen = () => {
      console.log(`WebSocket connection established for ${language}`);
    };
    
    socket.onerror = (error) => {
      console.error(`WebSocket error for ${language}:`, error);
    };
    
    // Create a proper WebSocket interface that vscode-ws-jsonrpc can use
    const socketProxy = toSocket(socket);
    
    // Create message reader and writer using the socket proxy
    const reader = new WebSocketMessageReader(socketProxy);
    const writer = new WebSocketMessageWriter(socketProxy);
    
    // Start the language client
    const client = new MonacoLanguageClient({
      name: `${language.charAt(0).toUpperCase() + language.slice(1)} Language Client`,
      clientOptions: {
        documentSelector: [language],
        // Note: The updated API doesn't use ErrorAction and CloseAction enums
        errorHandler: {
          error: () => ({ action: 1 }), // Continue
          closed: () => ({ action: 1 }) // Restart
        }
      },
      connectionProvider: {
        get: async () => {
          return Promise.resolve({
            reader,
            writer
          });
        }
      }
    });
    
    // Start the client
    client.start();
    languageClients.set(language, client);
    
    return client;
  } catch (error) {
    console.error(`Failed to create language client for ${language}:`, error);
    return null;
  }
}

export function disposeLanguageClient(language: string): void {
  const client = languageClients.get(language);
  if (client) {
    client.dispose();
    languageClients.delete(language);
  }
}
