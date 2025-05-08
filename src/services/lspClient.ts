import * as monaco from 'monaco-editor';
import {
  MonacoLanguageClient,
  CloseAction,
  ErrorAction,
  MessageTransports,
  createProtocolConnection
} from 'monaco-languageclient';
import {
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
    const webSocket = new WebSocket(url.href);
    
    webSocket.onopen = () => {
      console.log(`WebSocket connection established for ${language}`);
    };
    
    webSocket.onerror = (error) => {
      console.error(`WebSocket error for ${language}:`, error);
    };
    
    // Create message reader and writer
    const reader = new WebSocketMessageReader(webSocket);
    const writer = new WebSocketMessageWriter(webSocket);
    
    // Create connection and client
    const connection = createProtocolConnection(reader, writer);
    
    // Start the language client
    const client = new MonacoLanguageClient({
      name: `${language.charAt(0).toUpperCase() + language.slice(1)} Language Client`,
      clientOptions: {
        documentSelector: [language],
        errorHandler: {
          error: () => ErrorAction.Continue,
          closed: () => CloseAction.Restart
        }
      },
      connectionProvider: {
        get: async () => {
          return Promise.resolve({
            reader,
            writer
          } as MessageTransports);
        }
      }
    });
    
    // Start the client and add all the registered features
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
