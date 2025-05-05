
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, X, Plus, Undo, Mic, Attachment, Send } from 'lucide-react';

interface CopilotChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const CopilotChat: React.FC<CopilotChatProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [conversation, setConversation] = useState<{role: 'user' | 'assistant', message: string}[]>([
    { role: 'assistant', message: 'Hello! I\'m Copilot, powered by AI. How can I help you with your code today?' }
  ]);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    // Add user message
    setConversation(prev => [...prev, { role: 'user', message: prompt }]);
    
    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          message: `I'll help you with "${prompt}". I'm a simulated response for now.`
        }
      ]);
    }, 1000);
    
    setPrompt('');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-editor-background border-l border-gray-800 flex flex-col z-50">
      <div className="flex justify-between items-center p-3 border-b border-gray-800">
        <div className="flex items-center">
          <Bot size={20} className="mr-2" />
          <h2 className="font-medium">Copilot</h2>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {conversation.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`rounded-lg p-3 max-w-[85%] ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-editor-active text-gray-200'
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-800">
        <div className="p-2 rounded-lg bg-editor-active flex flex-col">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask a question or type / to use commands..."
            className="bg-transparent border-none resize-none focus:outline-none focus:ring-0 focus:ring-offset-0 min-h-[100px] text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-1.5">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400">
                <Attachment size={14} />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400">
                <Mic size={14} />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className={`${prompt ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-400'}`}
              onClick={handleSubmit}
              disabled={!prompt}
            >
              <Send size={14} className="mr-1" />
              Send
            </Button>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Copilot is powered by AI, so mistakes are possible.</span>
          <span>/ for commands</span>
        </div>
      </div>
    </div>
  );
};

export default CopilotChat;
