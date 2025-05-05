
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileItem } from "./Explorer";
import AIModelSelector from "./AIModelSelector";
import AIModeSelector, { AIMode } from "./AIModeSelector";

interface AIDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCode?: string;
  currentFile?: string;
  cursorPosition: { line: number; col: number };
}

const AIDrawer: React.FC<AIDrawerProps> = ({
  open,
  onOpenChange,
  selectedCode,
  currentFile,
  cursorPosition,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiMode, setAIMode] = useState<AIMode>("chat");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsSubmitting(false);
      setPrompt("");
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-editor-background text-gray-100 border-t border-gray-800">
        <div className="container max-w-4xl mx-auto p-4">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between">
              <span>AI Assistant</span>
              <AIModelSelector 
                selectedModel={selectedModel} 
                onModelChange={setSelectedModel} 
              />
            </DrawerTitle>
            <DrawerDescription className="text-gray-400">
              {selectedCode
                ? "Ask about the selected code or get help with a specific task."
                : "Ask about your code or get help with a specific task."}
            </DrawerDescription>
            
            <AIModeSelector activeMode={aiMode} onModeChange={setAIMode} />
            
            {currentFile && (
              <div className="mt-2 text-xs text-gray-500">
                File: {currentFile} • Line: {cursorPosition.line}, Column:{" "}
                {cursorPosition.col}
              </div>
            )}
            
            {selectedCode && (
              <div className="mt-2 p-2 bg-editor-active rounded border border-gray-700 overflow-auto text-xs">
                <pre className="whitespace-pre-wrap">
                  <code>{selectedCode}</code>
                </pre>
              </div>
            )}
          </DrawerHeader>
          
          <div className="p-4 rounded-md bg-editor-active/50 backdrop-blur-sm border border-gray-800">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Ask me about your code${selectedCode ? " or the selected snippet" : ""}...`}
              className="resize-none bg-editor-background border-gray-700 min-h-[120px]"
            />
            <div className="flex justify-between mt-2">
              <div className="text-xs text-gray-500">
                {aiMode === "chat" ? "Chat mode - no code changes" : 
                 aiMode === "agent" ? "AI agent mode - can modify code" :
                 "Manual mode - get suggestions only"}
              </div>
              <div className="space-x-2">
                <DrawerClose asChild>
                  <Button variant="outline" size="sm">Cancel</Button>
                </DrawerClose>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!prompt.trim() || isSubmitting} 
                  size="sm"
                >
                  {isSubmitting ? "Thinking..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
          
          <DrawerFooter className="px-0">
            <div className="text-xs text-center text-gray-500">
              The AI may provide inaccurate information. Always review suggestions.
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AIDrawer;
