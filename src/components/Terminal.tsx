
import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface TerminalProps {
  workspace?: string;
  height?: number | string;
}

const Terminal: React.FC<TerminalProps> = ({ workspace = "default", height = "100%" }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<XTerm | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null);
  const [connected, setConnected] = useState(false);

  // Initialize terminal
  useEffect(() => {
    if (terminalRef.current && !terminal) {
      // Create terminal with FitAddon
      const term = new XTerm({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, Consolas, monospace',
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          cursor: '#00ff00',
          selection: 'rgba(255, 255, 255, 0.3)',
          black: '#000000',
          red: '#cd3131',
          green: '#0dbc79',
          yellow: '#e5e510',
          blue: '#2472c8',
          magenta: '#bc3fbc',
          cyan: '#11a8cd',
          white: '#e5e5e5',
          brightBlack: '#666666',
          brightRed: '#f14c4c',
          brightGreen: '#23d18b',
          brightYellow: '#f5f543',
          brightBlue: '#3b8eea',
          brightMagenta: '#d670d6',
          brightCyan: '#29b8db',
          brightWhite: '#ffffff'
        }
      });
      
      const fit = new FitAddon();
      term.loadAddon(fit);
      
      // Open terminal in the container
      term.open(terminalRef.current);
      setTerminal(term);
      setFitAddon(fit);
      
      // Connect to WebSocket
      const wsUrl = new URL(`/terminals/${workspace}`, window.location.href);
      wsUrl.protocol = wsUrl.protocol.replace('http', 'ws');
      
      try {
        const ws = new WebSocket(wsUrl.href);
        setSocket(ws);
        
        ws.onopen = () => {
          console.log('Terminal WebSocket connected');
          setConnected(true);
          term.writeln('Connected to terminal server');
        };
        
        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            if (message.type === 'output') {
              term.write(message.content);
            }
          } catch (err) {
            // If it's not JSON, just write it directly
            term.write(event.data);
          }
        };
        
        ws.onclose = () => {
          setConnected(false);
          term.writeln('\r\nConnection closed. Refresh to reconnect.');
        };
        
        ws.onerror = (error) => {
          console.error('Terminal WebSocket error:', error);
          term.writeln('\r\nError connecting to terminal server.');
        };
        
        // Handle terminal input
        term.onData((data) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'input', content: data }));
          }
        });
        
        // Handle resize events
        term.onResize(({ cols, rows }) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'resize', cols, rows }));
          }
        });
        
        // Initial fit
        setTimeout(() => {
          fit.fit();
        }, 100);
        
        // Handle window resize events
        const handleResize = () => {
          if (fit) {
            fit.fit();
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          window.removeEventListener('resize', handleResize);
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
          term.dispose();
        };
      } catch (error) {
        console.error('Failed to connect to terminal server:', error);
        term.writeln('Failed to connect to terminal server. Server may not be running.');
        return () => {
          term.dispose();
        };
      }
    }
  }, [workspace]);
  
  // Handle manual resize when panel size changes
  useEffect(() => {
    if (fitAddon) {
      setTimeout(() => {
        fitAddon.fit();
      }, 100);
    }
  }, [height, fitAddon]);
  
  // Fallback terminal content when not connected
  const renderFallbackContent = () => {
    return (
      <div className="p-4 text-gray-400">
        <p>Terminal server is not connected.</p>
        <p className="mt-2">Make sure the backend server is running with:</p>
        <div className="bg-gray-800 p-2 mt-2 rounded">
          <code>node server/index.js</code>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-editor-panel">
      <div className="p-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <TerminalIcon size={18} className="mr-2 text-green-500" />
          <h3 className="text-sm font-medium">Terminal</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden" style={{ height }}>
        <div ref={terminalRef} className="h-full"></div>
        {!connected && !terminal && renderFallbackContent()}
      </div>
    </div>
  );
};

export default Terminal;
