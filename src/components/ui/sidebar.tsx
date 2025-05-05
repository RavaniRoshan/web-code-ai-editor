import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Files, Search, Code, Play, Package, Settings, MessageSquare } from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const sidebarItems = [
    { id: "explorer", icon: Files, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "assistant", icon: MessageSquare, label: "AI Assistant" },
    { id: "git", icon: Code, label: "Source Control" },
    { id: "debug", icon: Play, label: "Run and Debug" },
    { id: "extensions", icon: Package, label: "Extensions" },
  ];

  return (
    <TooltipProvider>
      <div className="w-12 h-full bg-editor-sidebar border-r border-gray-800 flex flex-col items-center py-2">
        {sidebarItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "w-12 h-12 flex items-center justify-center relative",
                  activeView === item.id
                    ? "text-white after:absolute after:left-0 after:top-0 after:h-full after:w-0.5 after:bg-blue-500"
                    : "text-gray-500 hover:text-gray-300"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <item.icon size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <div className="mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-300">
                <Settings size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
