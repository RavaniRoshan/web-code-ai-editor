
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onClick: toggleDropdown,
            isOpen
          });
        }
        if (React.isValidElement(child) && child.type === DropdownMenu) {
          return isOpen ? React.cloneElement(child as React.ReactElement<any>, {
            onClose: () => setIsOpen(false)
          }) : null;
        }
        return child;
      })}
    </div>
  );
};

interface DropdownTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
  isOpen?: boolean;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  onClick,
  isOpen
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};

interface DropdownMenuProps {
  children: React.ReactNode;
  onClose?: () => void;
  align?: 'left' | 'right';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  onClose,
  align = 'left'
}) => {
  return (
    <div
      className={cn(
        'absolute z-50 mt-1 min-w-[180px] overflow-hidden rounded-md border border-gray-700 bg-editor-sidebar shadow-md animate-in fade-in',
        align === 'left' ? 'left-0' : 'right-0'
      )}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  className,
  disabled = false
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onClick && onClick(e);
  };

  return (
    <div
      className={cn(
        'flex cursor-pointer select-none items-center px-3 py-1.5 text-sm text-gray-300 hover:bg-editor-active',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
