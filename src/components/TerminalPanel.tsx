
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Terminal as TerminalIcon } from "lucide-react";
import Terminal from "@/components/Terminal";

interface TerminalPanelProps {
  onOpenAIDrawer: () => void;
}

const TerminalPanel: React.FC<TerminalPanelProps> = ({ onOpenAIDrawer }) => {
  return (
    <div className="h-64 overflow-hidden flex flex-col border-t border-gray-800">
      <div className="flex items-center justify-between p-1 border-b border-gray-800">
        <div className="flex items-center px-2 py-1 text-xs bg-editor-active rounded-t border border-gray-700 border-b-0 relative -mb-px">
          <TerminalIcon size={12} className="mr-1" />
          <span>Terminal</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onOpenAIDrawer}
          className="flex items-center text-xs"
        >
          <MessageSquare size={14} className="mr-1" /> Ask AI
        </Button>
      </div>
      <div className="flex-1">
        <Terminal />
      </div>
    </div>
  );
};

export default TerminalPanel;
