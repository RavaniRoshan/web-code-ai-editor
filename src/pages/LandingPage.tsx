
import React from "react";
import { Button } from "@/components/ui/button";
import { Code, MessageSquare, Terminal, Zap, Github, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-editor-background text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-800 bg-editor-sidebar">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code size={28} className="text-blue-400" />
            <h1 className="text-2xl font-bold">Markcode IDE</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#features" className="text-sm hover:text-blue-400 transition">Features</a>
            <a href="#demo" className="text-sm hover:text-blue-400 transition">Live Demo</a>
            <a href="#tech" className="text-sm hover:text-blue-400 transition">Tech Stack</a>
            <a href="https://github.com/RavaniRoshan/web-code-ai-editor" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-400 transition flex items-center">
              <Github size={16} className="mr-1" />
              GitHub
            </a>
            <Button asChild>
              <Link to="/editor">
                Try Editor
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-editor-background to-editor-sidebar">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Code Smarter with AI Assistance</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            A powerful web-based code editor with built-in AI assistance for faster, 
            smarter development. Like VS Code, but with a brain.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/editor">
                Launch Editor <ChevronRight size={16} className="ml-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/RavaniRoshan/web-code-ai-editor" target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-1" /> Star on GitHub
              </a>
            </Button>
          </div>
          
          <div className="mt-16 rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
              alt="Markcode IDE Editor Interface"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-editor-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Powerful Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-editor-sidebar p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Code size={24} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Monaco Editor</h3>
              <p className="text-gray-400">
                Powered by the same editor that drives VS Code, with full syntax highlighting, 
                IntelliSense, and code formatting.
              </p>
            </div>

            <div className="bg-editor-sidebar p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Assistant</h3>
              <p className="text-gray-400">
                Get code explanations, refactoring suggestions, and answers to your programming 
                questions with context-aware AI.
              </p>
            </div>

            <div className="bg-editor-sidebar p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Terminal size={24} className="text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integrated Terminal</h3>
              <p className="text-gray-400">
                Run commands, view logs, and interact with your project directly within 
                the editor interface.
              </p>
            </div>

            <div className="bg-editor-sidebar p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Workflows</h3>
              <p className="text-gray-400">
                Get step-by-step guidance for complex development tasks with AI-powered 
                workflow assistance.
              </p>
            </div>

            <div className="bg-editor-sidebar p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <Star size={24} className="text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Virtual File System</h3>
              <p className="text-gray-400">
                Create, edit and manage files and folders with a familiar explorer interface, 
                all in your browser.
              </p>
            </div>

            <div className="bg-editor-sidebar p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Github size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Open Source</h3>
              <p className="text-gray-400">
                Built with modern web technologies and available on GitHub. Contribute and make 
                it your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-editor-sidebar">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">See It In Action</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Watch how Lovable.dev helps you write better code faster with AI assistance.
          </p>
          
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto bg-editor-background rounded-lg overflow-hidden border border-gray-800">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-center">
                [Demo Video Placeholder]<br />
                <span className="text-sm">(Replace with actual video embed)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 bg-editor-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center">Built With Modern Technology</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="h-20 flex items-center justify-center mb-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-16" />
              </div>
              <p className="font-medium">React</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 flex items-center justify-center mb-3">
                <img src="https://raw.githubusercontent.com/microsoft/monaco-editor/main/website/monaco-editor-website/public/monaco-icon.svg" alt="Monaco Editor" className="h-16" />
              </div>
              <p className="font-medium">Monaco Editor</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 flex items-center justify-center mb-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" className="h-16" />
              </div>
              <p className="font-medium">TypeScript</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 flex items-center justify-center mb-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" className="h-16" />
              </div>
              <p className="font-medium">Tailwind CSS</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-editor-background to-editor-sidebar">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Coding?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Try Markcode IDE now and experience the future of web-based development.
          </p>
          
          <Button size="lg" asChild>
            <Link to="/editor">
              Launch Editor <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-editor-background border-t border-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Code size={20} className="text-blue-400 mr-2" />
              <h2 className="text-lg font-bold">Markcode IDE</h2>
            </div>
            
            <div className="flex space-x-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-blue-400 transition">Features</a>
              <a href="#demo" className="text-sm text-gray-400 hover:text-blue-400 transition">Demo</a>
              <a href="#tech" className="text-sm text-gray-400 hover:text-blue-400 transition">Tech Stack</a>
              <a href="https://github.com/RavaniRoshan/web-code-ai-editor" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-blue-400 transition">
                GitHub
              </a>
            </div>
            
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">© 2025 Markcode IDE. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
