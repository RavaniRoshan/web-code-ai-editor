
import React from "react";
import { cn } from "@/lib/utils";

interface StatusBarItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
}

const StatusBarItem: React.FC<StatusBarItemProps> = ({ children, onClick, tooltip, className }) => (
  <div 
    className={cn(
      "px-2 h-full flex items-center text-xs border-r border-gray-800 hover:bg-editor-active cursor-pointer",
      className
    )} 
    onClick={onClick}
    title={tooltip}
  >
    {children}
  </div>
);

interface StatusBarProps {
  lineCount: number;
  currentLine: number;
  currentColumn: number;
  language: string;
  encoding?: string;
  lineEnding?: string;
  indentation?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({
  lineCount,
  currentLine,
  currentColumn,
  language,
  encoding = "UTF-8",
  lineEnding = "LF",
  indentation = "Spaces: 4"
}) => {
  return (
    <div className="h-6 bg-editor-background border-t border-gray-800 flex justify-between text-gray-400">
      {/* Left items */}
      <div className="flex h-full">
        <StatusBarItem tooltip="Git status">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.175 13.354l-4.5-4.5.7-.7 3.8 3.8 3.8-3.8.7.7-4.5 4.5zm0-8l-4.5 4.5.7.7 3.8-3.8 3.8 3.8.7-.7-4.5-4.5z" />
            </svg>
            <span>master</span>
          </div>
        </StatusBarItem>
        
        <StatusBarItem tooltip="0 errors, 0 warnings">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.6-.1-3.2.5-4.4 1.6-1.2 1.1-1.9 2.6-2 4.3 0 1.7.6 3.2 1.8 4.3 1.1 1.1 2.5 1.7 4 1.7h.3z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M8.7 8.7V4.2h-1v3.9l-2.3 2.3.7.7 2.6-2.4z" />
            </svg>
            <span>0 ⚠ 0</span>
          </div>
        </StatusBarItem>
      </div>
      
      {/* Right items */}
      <div className="flex h-full">
        <StatusBarItem tooltip="Current line number">
          <span>Ln {currentLine}, Col {currentColumn}</span>
        </StatusBarItem>
        
        <StatusBarItem tooltip="File language">
          <span className="capitalize">{language}</span>
        </StatusBarItem>
        
        <StatusBarItem tooltip="File encoding">
          <span>{encoding}</span>
        </StatusBarItem>
        
        <StatusBarItem tooltip="Line ending">
          <span>{lineEnding}</span>
        </StatusBarItem>
        
        <StatusBarItem tooltip="Tab size">
          <span>{indentation}</span>
        </StatusBarItem>
        
        <StatusBarItem tooltip="Current theme">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.5 1a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 12a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm.5-10v1h1v1h-1v3.188L9 8l.002-.012a1.5 1.5 0 1 1-2 0L7 8l1-.812V4H7V3h1zm-.5 7.6a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8z" />
            </svg>
            <span>Plain Text</span>
          </div>
        </StatusBarItem>
      </div>
    </div>
  );
};

export default StatusBar;
