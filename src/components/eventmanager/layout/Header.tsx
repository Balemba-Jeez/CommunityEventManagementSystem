import React from 'react';
import { Search, Moon, Sun, Plus, ChevronDown } from 'lucide-react';
import { UserProfileDropdown } from '@/components/dashboard/user-profile-dropdown';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header({
  isDarkMode,
  toggleDarkMode
}) {
  const getHoverClass = () => {
    return isDarkMode 
      ? 'hover:bg-[#1b2027]' 
      : 'hover:bg-[#e4e4e7]';
  };

  const getTooltipClass = () => {
    return isDarkMode
      ? 'bg-[#5a6ab4] text-black border-[#5a6ab4]'
      : 'bg-[#2c3e94] text-white border-[#2c3e94]';
  };

  return (
    <TooltipProvider>
      <header
        className="py-4 px-6 flex items-center justify-between"
        style={{
          backgroundColor: 'var(--card)',
          borderBottom: '1px solid var(--border)',
          color: 'var(--card-foreground)'
        }}
      >
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${getHoverClass()}`}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </TooltipTrigger>
            <TooltipContent className={getTooltipClass()}>
              <p>{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${getHoverClass()}`}
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)'
                }}
              >
                <Settings className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className={getTooltipClass()}>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${getHoverClass()}`}
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)'
                }}
              >
                <Plus className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className={getTooltipClass()}>
              <p>Create new</p>
            </TooltipContent>
          </Tooltip>
         
          {/* Replace the hardcoded profile section with UserProfileDropdown */}
          <UserProfileDropdown />
        </div>
      </header>
    </TooltipProvider>
  );
}

function Settings(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}