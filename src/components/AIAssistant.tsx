
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  selectedCode?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ selectedCode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hello! I'm your coding assistant. Ask me any coding questions or for help with your code.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateMockResponse = (query: string): string => {
    if (query.toLowerCase().includes("hello") || query.toLowerCase().includes("hi")) {
      return "Hello! How can I help you with your coding today?";
    } else if (query.toLowerCase().includes("javascript")) {
      return "JavaScript is a versatile programming language commonly used for web development. What specific aspect of JavaScript are you interested in learning about?";
    } else if (query.toLowerCase().includes("react")) {
      return "React is a popular JavaScript library for building user interfaces. It uses a component-based architecture and virtual DOM for efficient rendering. Would you like me to explain a specific React concept?";
    } else if (query.toLowerCase().includes("function") || query.toLowerCase().includes("code")) {
      return "Here's a simple example function:\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n```\nYou can call this function with `greet('World')` to get 'Hello, World!'";
    } else {
      return "I'm here to help with your coding questions. Could you provide more details about what you're trying to accomplish?";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-editor-panel">
      <div className="p-3 border-b border-gray-800 flex items-center">
        <Bot size={18} className="mr-2 text-blue-400" />
        <h3 className="text-sm font-medium">AI Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
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
            <div className="dot-flashing mr-2"></div>
            Assistant is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-gray-800">
        <div className="flex">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about coding..."
            className="min-h-[80px] resize-none bg-editor-active text-gray-300 border-gray-700"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ""}
            className="ml-2 self-end"
            variant="outline"
            size="icon"
          >
            <Send size={18} />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
