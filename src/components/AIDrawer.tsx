
import React, { useState, useRef, useEffect } from "react";
import { Send, X, Loader, Code, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCode?: string;
  currentFile?: string;
  cursorPosition?: { line: number; col: number };
}

const AIDrawer: React.FC<AIDrawerProps> = ({
  open,
  onOpenChange,
  selectedCode,
  currentFile,
  cursorPosition,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hello! I'm your AI coding assistant. How can I help you with your code today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare context for the AI
    const contextInfo = {
      selectedCode: selectedCode || null,
      file: currentFile || null,
      position: cursorPosition || null,
    };

    // Simulate API call to OpenAI or another LLM
    // In a real implementation, this would be a fetch or axios call
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input, contextInfo),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);

    // Show a toast notification
    toast({
      title: "Message sent",
      description: "Your message has been sent to the AI assistant.",
      duration: 2000,
    });
  };

  const generateMockResponse = (query: string, context: any): string => {
    // This is a mock response generator
    // In a real implementation, this would be replaced with an API call to OpenAI or another LLM

    if (query.toLowerCase().includes("explain") || query.toLowerCase().includes("what")) {
      return `I'll explain this code:\n\n\`\`\`${context.file || 'typescript'}\n${context.selectedCode || 'No code selected'}\n\`\`\`\n\nThis code appears to ${context.selectedCode ? 'handle user interactions' : 'be related to your project structure'}. It's written in ${context.file?.split('.').pop() || 'TypeScript/JavaScript'}. Would you like me to suggest any improvements?`;
    } 
    else if (query.toLowerCase().includes("refactor") || query.toLowerCase().includes("improve")) {
      return `Here's a refactored version of your code:\n\n\`\`\`typescript\n// Improved version\n${context.selectedCode || '// No code selected to refactor'}\n\`\`\`\n\nI've made these improvements:\n- Better variable naming\n- More concise expressions\n- Better error handling`;
    }
    else if (query.toLowerCase().includes("steps") || query.toLowerCase().includes("workflow")) {
      return "Here's how I'd approach this:\n\n1. **Setup**: Create basic files and structure\n2. **Implementation**: Add core functionality\n3. **Testing**: Verify functionality\n4. **Refinement**: Optimize and clean up code\n\nWould you like me to elaborate on any of these steps?";
    }
    else {
      return `I'm here to help with your code. Currently, you're ${context.file ? `working on ${context.file}` : 'in the editor'}. ${context.selectedCode ? 'You have some code selected.' : ''}\n\nCan you tell me more about what you need assistance with?`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAskAboutSelection = () => {
    if (!selectedCode) {
      toast({
        title: "No code selected",
        description: "Please select some code to analyze.",
        duration: 3000,
      });
      return;
    }

    const prompt = `Analyze this code from ${currentFile || 'unknown file'}:\n${selectedCode}`;
    setInput(prompt);
  };

  const handleGenerateWorkflow = () => {
    const prompt = "Break down the next steps for implementing this feature into a logical workflow with file names and functions to create.";
    setInput(prompt);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[70vh] max-h-[70vh] bg-editor-background border-t border-gray-800">
        <div className="flex flex-col h-full">
          <DrawerHeader className="flex justify-between items-center py-2 px-4 border-b border-gray-800">
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2 text-blue-400" />
              <h3 className="text-sm font-medium text-gray-200">AI Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAskAboutSelection}
                className="flex items-center text-xs"
              >
                <Code size={14} className="mr-1" /> Ask about selection
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleGenerateWorkflow}
                className="flex items-center text-xs"
              >
                <MessageSquare size={14} className="mr-1" /> Generate workflow
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X size={16} />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === "assistant" ? "pr-8" : "pl-8"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-editor-active text-gray-300"
                      : "bg-blue-700/20 text-gray-200 ml-auto"
                  }`}
                >
                  <pre className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </pre>
                </div>
                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    message.role === "user" ? "text-right" : ""
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center text-gray-400 text-sm">
                <Loader size={16} className="animate-spin mr-2" />
                Assistant is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <DrawerFooter className="p-4 border-t border-gray-800">
            <div className="flex items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your code..."
                className="min-h-[80px] resize-none bg-editor-active text-gray-300 border-gray-700 flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || input.trim() === ""}
                className="ml-2 h-10 self-end"
                variant="outline"
                size="icon"
              >
                <Send size={16} />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AIDrawer;
