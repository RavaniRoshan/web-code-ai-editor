
import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([
    "Welcome to Web IDE Terminal",
    "Type 'help' for available commands",
    "> "
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const command = currentInput;
      
      // Add command to history
      if (command.trim()) {
        setCommandHistory([...commandHistory, command]);
      }
      
      // Process command
      setLines([...lines.slice(0, -1), `> ${command}`, ...processCommand(command), "> "]);
      setCurrentInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };
  
  const processCommand = (command: string): string[] => {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === "") {
      return [];
    } else if (cmd === "help") {
      return [
        "Available commands:",
        "  help     - Show this help message",
        "  clear    - Clear terminal",
        "  ls       - List files",
        "  echo     - Echo text",
        "  date     - Show current date and time",
        "  whoami   - Show current user"
      ];
    } else if (cmd === "clear") {
      setTimeout(() => {
        setLines(["Welcome to Web IDE Terminal", "> "]);
      }, 0);
      return [];
    } else if (cmd === "ls") {
      return [
        "src/",
        "package.json",
        "README.md",
        "index.html"
      ];
    } else if (cmd.startsWith("echo ")) {
      return [command.substring(5)];
    } else if (cmd === "date") {
      return [new Date().toString()];
    } else if (cmd === "whoami") {
      return ["web-ide-user"];
    } else {
      return [`Command not found: ${command}. Type 'help' for available commands.`];
    }
  };
  
  // Auto-scroll to bottom when lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);
  
  return (
    <div className="flex flex-col h-full bg-editor-panel">
      <div className="p-3 border-b border-gray-800 flex items-center">
        <TerminalIcon size={18} className="mr-2 text-green-500" />
        <h3 className="text-sm font-medium">Terminal</h3>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-auto p-3 font-mono text-sm"
        onClick={() => document.getElementById("terminal-input")?.focus()}
      >
        {lines.slice(0, -1).map((line, i) => (
          <div key={i} className="whitespace-pre-wrap mb-1">
            {line}
          </div>
        ))}
        <div className="flex whitespace-nowrap">
          {lines[lines.length - 1]}
          <span 
            id="terminal-input"
            className="outline-none"
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            onInput={(e) => setCurrentInput(e.currentTarget.textContent || "")}
          >
            {currentInput}
          </span>
          <span className="cursor ml-px"></span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
