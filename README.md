
# Markcode IDE - AI-Powered Code Editor

<div align="center">
  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" width="600" alt="Markcode IDE Screenshot">
  <p><em>Modern web-based code editor with integrated AI assistance</em></p>
</div>

## 🌟 Features

- **Monaco Editor Integration** - Powered by the same editor engine as VS Code
- **AI Assistant** - Get intelligent code suggestions, explanations, and help
- **Interactive UI** - Modern, responsive interface with dark mode
- **Virtual File System** - Create, edit, and manage files in the browser
- **AI Workflows** - Step-by-step guidance for complex development tasks
- **Integrated Terminal** - Run commands directly within the editor

## 🚀 Demo

Try the live demo at [https://markcode-ide.dev](https://markcode-ai-editor.vercel.app/)

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Editor**: Monaco Editor
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **AI Integration**: OpenAI API
- **Routing**: React Router

## 🏗️ Architecture

The application follows a component-based architecture with the following key parts:

1. **Core Editor** - Monaco integration with syntax highlighting and IntelliSense
2. **File Explorer** - Virtual file system for managing project files
3. **Terminal** - Command execution and output display
4. **AI Assistant** - AI-powered chat interface for code help
5. **UI Components** - Reusable UI elements built with shadcn/ui

## 🧠 AI Features

- **Code Explanations** - Understand complex code with plain English explanations
- **Refactoring Suggestions** - Get AI recommendations for code improvements
- **Error Debugging** - Identify and fix bugs with AI assistance
- **Workflow Guidance** - Step-by-step instructions for implementing features
- **Context-Aware Help** - AI understands your current file and cursor position

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/RavaniRoshan/web-code-ai-editor.git

# Navigate to the project directory
cd web-code-ai-editor

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Configuration

To use the AI features, you'll need to set up an API key:

1. Create a `.env` file in the project root
2. Add your OpenAI API key: `VITE_OPENAI_API_KEY=your_api_key_here`

## 📚 Usage

1. Launch the application using `npm run dev`
2. Use the file explorer to create or open files
3. Write code in the editor
4. Use the AI assistant for help by clicking the AI button or selecting code and using the context menu

### Keyboard Shortcuts

- `Ctrl+S` - Save current file
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+A` - Toggle AI assistant
- `F1` - Command palette

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://github.com/microsoft/monaco-editor)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)
- [React](https://reactjs.org/)

---

<div align="center">
  <p>Built with ❤️ by the Markcode IDE team</p>
</div>
