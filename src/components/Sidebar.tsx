
import { useState } from "react";
import { File, FileCode, Folder, MessageSquare, Terminal, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  active = false, 
  onClick 
}) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center w-12 h-12 cursor-pointer hover:bg-editor-active",
        active && "border-l-2 border-blue-500 bg-editor-active"
      )}
      onClick={onClick}
      title={label}
    >
      <div className="text-gray-400">{icon}</div>
    </div>
  );
};

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="h-full w-12 bg-editor-sidebar flex flex-col border-r border-gray-800">
      <SidebarItem 
        icon={<File size={24} />} 
        label="Explorer" 
        active={activeView === "explorer"}
        onClick={() => onViewChange("explorer")} 
      />
      <SidebarItem 
        icon={<Bot size={24} />} 
        label="AI Assistant" 
        active={activeView === "assistant"}
        onClick={() => onViewChange("assistant")} 
      />
      <SidebarItem 
        icon={<Terminal size={24} />} 
        label="Terminal" 
        active={activeView === "terminal"}
        onClick={() => onViewChange("terminal")} 
      />
      <div className="mt-auto">
        <SidebarItem 
          icon={<MessageSquare size={24} />} 
          label="Chat" 
          active={activeView === "chat"}
          onClick={() => onViewChange("chat")} 
        />
      </div>
    </div>
  );
};

export default Sidebar;
