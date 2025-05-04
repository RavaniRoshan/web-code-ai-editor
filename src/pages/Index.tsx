
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Explorer, { FileItem } from "@/components/Explorer";
import EditorTabs from "@/components/EditorTabs";
import CodeEditor from "@/components/CodeEditor";
import AIAssistant from "@/components/AIAssistant";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeView, setActiveView] = useState("explorer");
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);
  const [files, setFiles] = useState<FileItem[]>(sampleFiles);
  const { toast } = useToast();

  // Find active file
  const activeFile = openFiles.find(file => file.id === activeFileId) || null;

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleSelectFile = (file: FileItem) => {
    if (file.type === "file") {
      // Check if file is already open
      if (!openFiles.some(f => f.id === file.id)) {
        setOpenFiles([...openFiles, file]);
      }
      setActiveFileId(file.id);
    }
  };

  const handleSelectFileById = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const handleCloseFile = (fileId: string) => {
    const newOpenFiles = openFiles.filter(file => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    // If we closed the active file, set the new active file
    if (fileId === activeFileId) {
      setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1].id : null);
    }
  };

  const handleCodeChange = (fileId: string, newContent: string) => {
    // Update the file content in both openFiles and files
    setOpenFiles(prev => 
      prev.map(file => file.id === fileId ? { ...file, content: newContent } : file)
    );
    
    // Helper function to update nested files
    const updateFileContent = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === fileId) {
          return { ...item, content: newContent };
        } else if (item.children) {
          return { ...item, children: updateFileContent(item.children) };
        }
        return item;
      });
    };
    
    setFiles(updateFileContent(files));
  };

  // Mock save function
  const handleSaveFile = () => {
    if (activeFile) {
      toast({
        title: "File saved",
        description: `${activeFile.name} has been saved.`,
        duration: 2000,
      });
    }
  };

  // Set up keyboard shortcut for saving
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveFile();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-editor-background text-gray-300">
      {/* Main Sidebar */}
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      
      {/* Secondary Panel */}
      {activeView === "explorer" && (
        <div className="w-64 h-full bg-editor-sidebar overflow-auto border-r border-gray-800">
          <Explorer 
            files={files} 
            onSelectFile={handleSelectFile} 
            selectedFileId={activeFileId}
          />
        </div>
      )}
      
      {activeView === "assistant" && (
        <div className="w-80 h-full border-r border-gray-800">
          <AIAssistant selectedCode={activeFile?.content} />
        </div>
      )}
      
      {/* Editor Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <EditorTabs 
          openFiles={openFiles}
          activeFileId={activeFileId}
          onSelectFile={handleSelectFileById}
          onCloseFile={handleCloseFile}
        />
        
        <div className="flex-1 overflow-hidden">
          <CodeEditor 
            file={activeFile}
            onCodeChange={handleCodeChange}
          />
        </div>
      </div>
    </div>
  );
};

// Sample files data
const sampleFiles: FileItem[] = [
  {
    id: "root",
    name: "my-project",
    type: "folder",
    children: [
      {
        id: "src",
        name: "src",
        type: "folder",
        children: [
          {
            id: "app-js",
            name: "App.js",
            type: "file",
            language: "javascript",
            content: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello World!</h1>\n      <p>Welcome to my React app</p>\n    </div>\n  );\n}\n\nexport default App;`,
          },
          {
            id: "styles-css",
            name: "styles.css",
            type: "file",
            language: "css",
            content: `body {\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\n.App {\n  text-align: center;\n  padding: 2rem;\n}`,
          }
        ]
      },
      {
        id: "index-html",
        name: "index.html",
        type: "file",
        language: "html",
        content: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Web App</title>\n  <link rel="stylesheet" href="src/styles.css">\n</head>\n<body>\n  <div id="root"></div>\n  <script src="src/index.js"></script>\n</body>\n</html>`,
      },
      {
        id: "readme-md",
        name: "README.md",
        type: "file",
        content: `# My Project\n\nThis is a sample README file for the project.\n\n## Getting Started\n\nTo get started with this project:\n\n1. Clone the repository\n2. Install dependencies: \`npm install\`\n3. Start the development server: \`npm start\`\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3`,
      }
    ]
  }
];

export default Index;
