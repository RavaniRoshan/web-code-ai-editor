
import { v4 as uuidv4 } from 'uuid';
import { FileItem } from "@/components/Explorer";
import { getLanguageFromExtension, getExtensionFromLanguage } from './languageService';

// File System Storage in memory
let fileSystemData: FileItem[] = [];

// Initialize with sample data if empty
const initializeFileSystem = (): FileItem[] => {
  if (fileSystemData.length === 0) {
    fileSystemData = [
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
              },
              {
                id: "python-example",
                name: "example.py",
                type: "file",
                language: "python",
                content: `# Example Python file\ndef greet(name):\n    return f"Hello, {name}!"\n\nif __name__ == "__main__":\n    print(greet("World"))`,
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
  }
  return fileSystemData;
};

// Helper to find a file or folder by ID recursively
const findItemById = (
  items: FileItem[],
  id: string
): { item: FileItem | null; parent: FileItem | null } => {
  for (const item of items) {
    if (item.id === id) {
      return { item, parent: null };
    }
    if (item.children) {
      const { item: found, parent } = findItemById(item.children, id);
      if (found) {
        return { item: found, parent: parent || item };
      }
    }
  }
  return { item: null, parent: null };
};

// Helper to generate a valid file name
const generateUniqueFileName = (
  parentFolder: FileItem,
  baseName: string,
  extension?: string
): string => {
  const childrenNames = parentFolder.children?.map((c) => c.name) || [];
  let name = baseName + (extension ? `.${extension}` : "");
  let counter = 1;

  while (childrenNames.includes(name)) {
    name = `${baseName} (${counter})${extension ? `.${extension}` : ""}`;
    counter++;
  }

  return name;
};

// File System API
export const FileSystemService = {
  // Get the entire file system
  getFiles: (): FileItem[] => {
    return initializeFileSystem();
  },

  // Get a specific file or folder by ID
  getItem: (id: string): FileItem | null => {
    const { item } = findItemById(initializeFileSystem(), id);
    return item;
  },

  // Create a new file
  createFile: (
    parentId: string,
    name: string,
    content: string = "",
    language: string = "plaintext"
  ): FileItem | null => {
    const { item: parent } = findItemById(fileSystemData, parentId);
    
    if (!parent || parent.type !== "folder") {
      return null;
    }

    const newFile: FileItem = {
      id: uuidv4(),
      name: generateUniqueFileName(parent, name, getExtensionFromLanguage(language)),
      type: "file",
      language,
      content,
    };

    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(newFile);
    
    return newFile;
  },

  // Create a new folder
  createFolder: (parentId: string, name: string): FileItem | null => {
    const { item: parent } = findItemById(fileSystemData, parentId);
    
    if (!parent || parent.type !== "folder") {
      return null;
    }

    const newFolder: FileItem = {
      id: uuidv4(),
      name: generateUniqueFileName(parent, name),
      type: "folder",
      children: [],
    };

    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(newFolder);
    
    return newFolder;
  },

  // Rename a file or folder
  renameItem: (id: string, newName: string): FileItem | null => {
    const { item, parent } = findItemById(fileSystemData, id);
    
    if (!item || !parent) {
      return null;
    }

    // Ensure the new name is unique among siblings
    if (parent.children?.some(child => child.name === newName && child.id !== id)) {
      return null;
    }

    item.name = newName;
    
    return item;
  },

  // Delete a file or folder
  deleteItem: (id: string): boolean => {
    const { item, parent } = findItemById(fileSystemData, id);
    
    if (!item || !parent || !parent.children) {
      return false;
    }

    const index = parent.children.findIndex(child => child.id === id);
    if (index === -1) {
      return false;
    }

    parent.children.splice(index, 1);
    return true;
  },

  // Update file content
  updateFileContent: (id: string, content: string): FileItem | null => {
    const { item } = findItemById(fileSystemData, id);
    
    if (!item || item.type !== "file") {
      return null;
    }

    item.content = content;
    return item;
  }
};

// Note: The helper functions getLanguageFromExtension and getExtensionFromLanguage
// have been removed from this file as they are now imported from languageService.ts
