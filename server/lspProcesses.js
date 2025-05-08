
const { spawn } = require('child_process');
const { StreamMessageReader, StreamMessageWriter } = require('vscode-jsonrpc');
const { createConnection } = require('vscode-languageserver-protocol/node');
const path = require('path');
const os = require('os');

// Create and manage LSP server processes
exports.createServerProcess = function(language) {
  let command;
  let args;
  let options = { shell: true };
  const workspaceRoot = path.resolve('./');
  
  switch(language.toLowerCase()) {
    case 'typescript':
    case 'javascript':
      // Use typescript-language-server for TypeScript and JavaScript
      command = os.platform() === 'win32' ? 'npx.cmd' : 'npx';
      args = ['typescript-language-server', '--stdio', '--tsserver-path=node_modules/typescript/lib'];
      break;
    
    case 'python':
      // Use pylsp (Python Language Server)
      command = os.platform() === 'win32' ? 'pylsp.exe' : 'pylsp';
      args = [];
      break;
      
    case 'html':
      // Use vscode-html-language-server
      command = os.platform() === 'win32' ? 'npx.cmd' : 'npx';
      args = ['vscode-html-language-server', '--stdio'];
      break;
      
    case 'css':
      // Use vscode-css-language-server
      command = os.platform() === 'win32' ? 'npx.cmd' : 'npx';
      args = ['vscode-css-language-server', '--stdio'];
      break;
      
    case 'json':
      // Use vscode-json-language-server
      command = os.platform() === 'win32' ? 'npx.cmd' : 'npx';
      args = ['vscode-json-language-server', '--stdio'];
      break;
      
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
  
  console.log(`Starting LSP server for ${language}: ${command} ${args.join(' ')}`);
  
  try {
    const childProcess = spawn(command, args, options);
    
    childProcess.on('error', (error) => {
      console.error(`LSP process error for ${language}:`, error);
    });
    
    childProcess.stderr.on('data', (data) => {
      console.error(`LSP stderr for ${language}:`, data.toString());
    });
    
    // Create message reader and writer for the child process
    const reader = new StreamMessageReader(childProcess.stdout);
    const writer = new StreamMessageWriter(childProcess.stdin);
    
    return {
      forward: (clientConnection) => {
        // Forward messages between client and server
        reader.listen((data) => {
          clientConnection.write(data);
        });
        
        clientConnection.listen((data) => {
          writer.write(data);
        });
        
        return {
          onClose: (callback) => {
            childProcess.on('close', callback);
          },
          dispose: () => {
            childProcess.kill();
          }
        };
      }
    };
  } catch (error) {
    console.error(`Failed to start LSP for ${language}:`, error);
    throw error;
  }
};
