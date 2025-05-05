
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  label: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    if (children) {
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative">
      <button 
        className={cn(
          "px-3 py-1 text-gray-300 hover:bg-editor-active focus:outline-none",
          isOpen && "bg-editor-active"
        )}
        onClick={handleClick}
      >
        {label}
      </button>
      
      {isOpen && children && (
        <div className="absolute left-0 top-full z-50 min-w-[200px] bg-editor-sidebar border border-gray-800 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

interface SubMenuItemProps {
  label: string;
  shortcut?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ 
  label, 
  shortcut, 
  onClick, 
  children, 
  icon, 
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    if (children) {
      setIsOpen(!isOpen);
      e.stopPropagation();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative">
      <div 
        className={cn(
          "flex items-center justify-between px-4 py-1.5 hover:bg-editor-active cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          isOpen && "bg-editor-active"
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="w-4">{icon}</span>}
          <span>{label}</span>
        </div>
        
        <div className="flex items-center">
          {shortcut && <span className="text-xs text-gray-500 ml-6">{shortcut}</span>}
          {children && <ChevronDown size={14} className="ml-1" />}
        </div>
      </div>
      
      {isOpen && children && (
        <div className="absolute left-full top-0 z-50 min-w-[200px] bg-editor-sidebar border border-gray-800 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

interface MenuDividerProps {}

const MenuDivider: React.FC<MenuDividerProps> = () => {
  return <div className="border-t border-gray-700 my-1"></div>;
};

interface TopMenuBarProps {
  onOpenFile?: () => void;
  onSaveFile?: () => void;
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({
  onOpenFile,
  onSaveFile
}) => {
  return (
    <div className="flex bg-editor-background border-b border-gray-800">
      <MenuItem label="File">
        <div className="py-1">
          <SubMenuItem label="New Text File" shortcut="Ctrl+N" />
          <SubMenuItem label="New File..." shortcut="Ctrl+Alt+Windows+N" />
          <SubMenuItem label="New Window" shortcut="Ctrl+Shift+N" />
          <SubMenuItem label="New Window with Profile" />
          
          <MenuDivider />
          
          <SubMenuItem label="Open File..." shortcut="Ctrl+O" onClick={onOpenFile} />
          <SubMenuItem label="Open Folder..." shortcut="Ctrl+K Ctrl+O" />
          <SubMenuItem label="Open Workspace from File..." />
          <SubMenuItem label="Open Recent" />
          
          <MenuDivider />
          
          <SubMenuItem label="Add Folder to Workspace..." />
          <SubMenuItem label="Save Workspace As..." />
          <SubMenuItem label="Duplicate Workspace" />
          
          <MenuDivider />
          
          <SubMenuItem label="Save" shortcut="Ctrl+S" onClick={onSaveFile} />
          <SubMenuItem label="Save As..." shortcut="Ctrl+Shift+S" />
          <SubMenuItem label="Save All" shortcut="Ctrl+K S" />
          
          <MenuDivider />
          
          <SubMenuItem label="Share" />
          
          <MenuDivider />
          
          <SubMenuItem label="Auto Save" />
          <SubMenuItem label="Preferences" />
          
          <MenuDivider />
          
          <SubMenuItem label="Revert File" />
          <SubMenuItem label="Close Editor" shortcut="Ctrl+F4" />
          <SubMenuItem label="Close Remote Connection" />
          <SubMenuItem label="Close Window" shortcut="Alt+F4" />
          
          <MenuDivider />
          
          <SubMenuItem label="Exit" />
        </div>
      </MenuItem>

      <MenuItem label="Edit">
        <div className="py-1">
          <SubMenuItem label="Undo" shortcut="Ctrl+Z" />
          <SubMenuItem label="Redo" shortcut="Ctrl+Y" />
          
          <MenuDivider />
          
          <SubMenuItem label="Cut" shortcut="Ctrl+X" />
          <SubMenuItem label="Copy" shortcut="Ctrl+C" />
          <SubMenuItem label="Paste" shortcut="Ctrl+V" />
          
          <MenuDivider />
          
          <SubMenuItem label="Find" shortcut="Ctrl+F" />
          <SubMenuItem label="Replace" shortcut="Ctrl+H" />
        </div>
      </MenuItem>

      <MenuItem label="Selection">
        <div className="py-1">
          <SubMenuItem label="Select All" shortcut="Ctrl+A" />
          <SubMenuItem label="Expand Selection" shortcut="Shift+Alt+RightArrow" />
          <SubMenuItem label="Shrink Selection" shortcut="Shift+Alt+LeftArrow" />
          
          <MenuDivider />
          
          <SubMenuItem label="Copy Line Up" shortcut="Shift+Alt+UpArrow" />
          <SubMenuItem label="Copy Line Down" shortcut="Shift+Alt+DownArrow" />
          <SubMenuItem label="Move Line Up" shortcut="Alt+UpArrow" />
          <SubMenuItem label="Move Line Down" shortcut="Alt+DownArrow" />
          <SubMenuItem label="Duplicate Selection" />
          
          <MenuDivider />
          
          <SubMenuItem label="Add Cursor Above" shortcut="Ctrl+Alt+UpArrow" />
          <SubMenuItem label="Add Cursor Below" shortcut="Ctrl+Alt+DownArrow" />
          <SubMenuItem label="Add Cursors to Line Ends" shortcut="Shift+Alt+I" />
        </div>
      </MenuItem>

      <MenuItem label="View">
        <div className="py-1">
          <SubMenuItem label="Command Palette..." shortcut="Ctrl+Shift+P" />
          <SubMenuItem label="Open View..." />
          
          <MenuDivider />
          
          <SubMenuItem label="Appearance" />
          <SubMenuItem label="Editor Layout" />
          
          <MenuDivider />
          
          <SubMenuItem label="Explorer" shortcut="Ctrl+Shift+E" />
          <SubMenuItem label="Search" shortcut="Ctrl+Shift+F" />
          <SubMenuItem label="Source Control" shortcut="Ctrl+Shift+G" />
          <SubMenuItem label="Run" shortcut="Ctrl+Shift+D" />
          <SubMenuItem label="Extensions" shortcut="Ctrl+Shift+X" />
          
          <MenuDivider />
          
          <SubMenuItem label="Terminal" shortcut="Ctrl+`" />
          <SubMenuItem label="Output" shortcut="Ctrl+Shift+U" />
          <SubMenuItem label="Problems" shortcut="Ctrl+Shift+M" />
          <SubMenuItem label="Debug Console" shortcut="Ctrl+Shift+Y" />
          
          <MenuDivider />
          
          <SubMenuItem label="Word Wrap" shortcut="Alt+Z" />
        </div>
      </MenuItem>

      <MenuItem label="Go">
        <div className="py-1">
          <SubMenuItem label="Back" shortcut="Alt+LeftArrow" />
          <SubMenuItem label="Forward" shortcut="Alt+RightArrow" />
          <SubMenuItem label="Last Edit Location" shortcut="Ctrl+K Ctrl+Q" />
          
          <MenuDivider />
          
          <SubMenuItem label="Switch Editor" />
          <SubMenuItem label="Switch Group" />
          
          <MenuDivider />
          
          <SubMenuItem label="Go to File..." shortcut="Ctrl+P" />
          <SubMenuItem label="Go to Symbol in Workspace..." shortcut="Ctrl+T" />
          <SubMenuItem label="Go to Symbol in Editor..." shortcut="Ctrl+Shift+O" />
          <SubMenuItem label="Go to Definition" shortcut="F12" />
          <SubMenuItem label="Go to Declaration" />
          <SubMenuItem label="Go to Type Definition" />
          <SubMenuItem label="Go to Implementations" shortcut="Ctrl+F12" />
          <SubMenuItem label="Go to References" shortcut="Shift+F12" />
          
          <MenuDivider />
          
          <SubMenuItem label="Go to Line/Column..." shortcut="Ctrl+G" />
          <SubMenuItem label="Go to Bracket" shortcut="Ctrl+Shift+\" />
          
          <MenuDivider />
          
          <SubMenuItem label="Next Problem" shortcut="F8" />
          <SubMenuItem label="Previous Problem" shortcut="Shift+F8" />
        </div>
      </MenuItem>

      <MenuItem label="Run">
        <div className="py-1">
          <SubMenuItem label="Start Debugging" shortcut="F5" />
          <SubMenuItem label="Run Without Debugging" shortcut="Ctrl+F5" />
          <SubMenuItem label="Stop Debugging" shortcut="Shift+F5" />
          <SubMenuItem label="Restart Debugging" shortcut="Ctrl+Shift+F5" />
          
          <MenuDivider />
          
          <SubMenuItem label="Open Configurations" />
          <SubMenuItem label="Add Configuration..." />
          
          <MenuDivider />
          
          <SubMenuItem label="Step Over" shortcut="F10" />
          <SubMenuItem label="Step Into" shortcut="F11" />
          <SubMenuItem label="Step Out" shortcut="Shift+F11" />
          <SubMenuItem label="Continue" shortcut="F5" />
          
          <MenuDivider />
          
          <SubMenuItem label="Toggle Breakpoint" shortcut="F9" />
          <SubMenuItem label="New Breakpoint" />
          
          <MenuDivider />
          
          <SubMenuItem label="Enable All Breakpoints" />
          <SubMenuItem label="Disable All Breakpoints" />
          <SubMenuItem label="Remove All Breakpoints" />
        </div>
      </MenuItem>

      <MenuItem label="Terminal">
        <div className="py-1">
          <SubMenuItem label="New Terminal" shortcut="Ctrl+Shift+`" />
          <SubMenuItem label="Split Terminal" shortcut="Ctrl+Shift+5" />
          
          <MenuDivider />
          
          <SubMenuItem label="Run Task..." />
          <SubMenuItem label="Run Build Task..." shortcut="Ctrl+Shift+B" />
          <SubMenuItem label="Run Active File" />
          <SubMenuItem label="Run Selected Text" />
          
          <MenuDivider />
          
          <SubMenuItem label="Show Running Tasks..." />
          <SubMenuItem label="Restart Running Task..." />
          <SubMenuItem label="Terminate Task..." />
          
          <MenuDivider />
          
          <SubMenuItem label="Configure Tasks..." />
          <SubMenuItem label="Configure Default Build Task..." />
        </div>
      </MenuItem>

      <MenuItem label="Help">
        <div className="py-1">
          <SubMenuItem label="Welcome" />
          <SubMenuItem label="Get Started" />
          <SubMenuItem label="Show All Commands" shortcut="Ctrl+Shift+P" />
          <SubMenuItem label="Documentation" />
          
          <MenuDivider />
          
          <SubMenuItem label="Editor Playground" />
          <SubMenuItem label="Show Release Notes" />
          
          <MenuDivider />
          
          <SubMenuItem label="Keyboard Shortcuts Reference" />
          <SubMenuItem label="Video Tutorials" />
          <SubMenuItem label="Tips and Tricks" />
          
          <MenuDivider />
          
          <SubMenuItem label="Join Community" />
          <SubMenuItem label="Report Issue" />
          
          <MenuDivider />
          
          <SubMenuItem label="Check for Updates..." />
          <SubMenuItem label="About" />
        </div>
      </MenuItem>
    </div>
  );
};

export { TopMenuBar, MenuItem, SubMenuItem, MenuDivider };
