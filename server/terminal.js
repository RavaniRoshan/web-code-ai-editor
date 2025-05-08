
const pty = require('node-pty');
const os = require('os');
const path = require('path');

// Setup terminal with PTY
exports.setupTerminal = function(websocket, workspace = 'default') {
  // Determine shell to use
  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
  const workspaceDir = path.resolve(path.join('./workspaces', workspace));
  
  // Create PTY instance
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: workspaceDir,
    env: process.env
  });
  
  // Handle WebSocket events
  websocket.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      switch (message.type) {
        case 'input':
          // Send user input to the PTY
          ptyProcess.write(message.content);
          break;
          
        case 'resize':
          // Resize terminal
          ptyProcess.resize(message.cols, message.rows);
          break;
          
        default:
          console.warn(`Unknown terminal message type: ${message.type}`);
      }
    } catch (error) {
      console.error('Terminal WebSocket message error:', error);
    }
  });
  
  // Send terminal output to the WebSocket
  ptyProcess.onData((data) => {
    if (websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({ type: 'output', content: data }));
    }
  });
  
  // Handle WebSocket close event
  websocket.on('close', () => {
    ptyProcess.kill();
    console.log(`Terminal WebSocket closed for workspace: ${workspace}`);
  });
  
  // Handle WebSocket error event
  websocket.on('error', (error) => {
    console.error(`Terminal WebSocket error:`, error);
  });
  
  return ptyProcess;
};
