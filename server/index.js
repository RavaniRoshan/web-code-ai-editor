
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const path = require('path');
const { createWebSocketConnection } = require('vscode-ws-jsonrpc/lib/connection');
const { createServerProcess } = require('./lspProcesses');
const { setupTerminal } = require('./terminal');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// LSP WebSocket handler
wss.on('connection', (websocket, request) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  
  // Handle LSP connections
  if (url.pathname === '/lsp') {
    const languageParam = url.searchParams.get('language') || 'typescript';
    console.log(`LSP connection established for ${languageParam}`);
    
    // Create LSP process based on language parameter
    const serverProcess = createServerProcess(languageParam);
    
    // Create WS connection and forward it to the process
    const webSocketConnection = createWebSocketConnection(websocket);
    const lspConnection = serverProcess.forward(webSocketConnection);
    
    lspConnection.onClose(() => {
      console.log(`LSP connection closed for ${languageParam}`);
    });
    
    websocket.on('error', (error) => {
      console.error(`LSP WebSocket error:`, error);
    });
  }
  
  // Handle terminal connections
  else if (url.pathname.startsWith('/terminals/')) {
    const workspace = url.pathname.replace('/terminals/', '');
    setupTerminal(websocket, workspace);
  }
});

// REST API routes
app.get('/api/languages', (req, res) => {
  res.json({
    supported: ['typescript', 'javascript', 'html', 'css', 'json', 'python']
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
