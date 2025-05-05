
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Code, Edit } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type AIMode = "chat" | "agent" | "manual";

interface AIModeSelectorProps {
  activeMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

const AIModeSelector: React.FC<AIModeSelectorProps> = ({ activeMode, onModeChange }) => {
  return (
    <TooltipProvider>
      <Tabs value={activeMode} onValueChange={(v) => onModeChange(v as AIMode)} className="w-full">
        <TabsList className="grid grid-cols-3 mb-2 bg-editor-active/50 backdrop-blur-sm">
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger value="chat" className="flex items-center gap-1 data-[state=active]:bg-editor-background/50">
                <MessageSquare size={14} />
                <span className="text-xs">Chat</span>
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-editor-background/90 backdrop-blur-sm border-gray-700">
              <p className="text-xs">Chat only mode - no code changes</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger value="agent" className="flex items-center gap-1 data-[state=active]:bg-editor-background/50">
                <Code size={14} />
                <span className="text-xs">AI Agent</span>
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-editor-background/90 backdrop-blur-sm border-gray-700">
              <p className="text-xs">AI can make code changes automatically</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <TabsTrigger value="manual" className="flex items-center gap-1 data-[state=active]:bg-editor-background/50">
                <Edit size={14} />
                <span className="text-xs">Manual</span>
              </TabsTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-editor-background/90 backdrop-blur-sm border-gray-700">
              <p className="text-xs">Get suggestions but apply changes manually</p>
            </TooltipContent>
          </Tooltip>
        </TabsList>
      </Tabs>
    </TooltipProvider>
  );
};

export default AIModeSelector;
