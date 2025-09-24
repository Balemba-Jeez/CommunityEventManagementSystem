import { useState } from 'react';
import { Search, Plus, Bell, Menu, Mic} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Logo } from '../ui/Logo';
import { Link } from 'react-router-dom';
import SearchComponent from './Search';
import { useAuth } from "@/context/AuthContext";
import UserAvatar from './UserAvatar';
import { UserProfileDropdown } from './user-profile-dropdown';
// import { Clock, Trash2 } from 'lucide-react';
interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

  const handleSearch = (query: string): void => {
    // Handle your search logic here
    console.log('Parent received search:', query);
  };


export const Header = ({ onToggleSidebar, sidebarCollapsed }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const { loginUser } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-6 py-4">
              <style jsx>{`
        @keyframes rainbow-border-flow {
          0% { 
            background-position: 0% 50%;
            transform: rotate(0deg);
          }
          25% { 
            background-position: 100% 50%;
            transform: rotate(90deg);
          }
          50% { 
            background-position: 100% 100%;
            transform: rotate(180deg);
          }
          75% { 
            background-position: 0% 100%;
            transform: rotate(270deg);
          }
          100% { 
            background-position: 0% 50%;
            transform: rotate(360deg);
          }
        }
        
        .rainbow-border-button {
          position: relative;
          background: #e2e5e9;
          border-radius: 9999px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .rainbow-border-button::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(
            45deg,
            #ff0000 0%, #ff7f00 12.5%, #ffff00 25%, #7fff00 37.5%,
            #00ff00 50%, #00ff7f 62.5%, #0000ff 75%, #7f00ff 87.5%, #ff0000 100%
          );
          background-size: 300% 300%;
          border-radius: 9999px;
          opacity: 0;
          z-index: -1;
          animation: rainbow-border-flow 4s linear infinite;
          transition: opacity 0.4s ease;
        }
        
        .rainbow-border-button::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: #e2e5e9;
          border-radius: 9999px;
          z-index: -1;
          transition: background 0.3s ease;
        }
        
        .rainbow-border-button:hover::before {
          opacity: 1;
        }
        
        .rainbow-border-button:hover::after {
          background: #f8f9fa;
        }
        
        .rainbow-border-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>

        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Logo />
          </div>


        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">

        {/* Search Bar */}
        <div className='mr-3 flex items-center gap-2'>
            <SearchComponent 
              placeholder="What are you looking for?"
              onSearch={handleSearch}
              onVoiceSearch={() => console.log('Voice search!')}
              showVoiceIcon={true}
              showMobileSearch={true}
              className="max-w-2xl mx-auto w-[566px]"
            
            />
            <Button variant='ghost' size='sm' className="w-10 h-10 p-0 hover:bg-[#e2e5e9] hover:text-black rounded-full">
                <Mic className='text-black' style={{ width: '24px', height: '24px' }}/>
            </Button>  
        </div>

        {/* <Button
        asChild
        variant="secondary"
        className="font-medium bg-[#e2e5e9] hover:bg-[#d6d9dd] hover:text-black rounded-full"
        >
          <Link to="/create-post">
            <Plus style={{ width: '24px', height: '24px' }} />
            <span className="hidden sm:inline">Create Post</span>
          </Link>
        </Button> */}

        <Button
              asChild
              variant="secondary"
              className="rainbow-border-button font-medium hover:text-black rounded-full relative z-10"
            >
          <Link to="/create-post">
            <Plus style={{ width: '24px', height: '24px' }} />
            <span className="hidden sm:inline">Create Post</span>
          </Link>
        </Button>


          <div className="relative">
            <Button variant="ghost" size="sm" className="relative w-10 h-10 p-0 hover:bg-[#e2e5e9] hover:text-black rounded-full">
              <Bell  style={{ width: '24px', height: '24px' }}/>
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>

          {/* <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              B
            </AvatarFallback>
          </Avatar> */}
          {/* <UserAvatar /> */}
          <UserProfileDropdown />
        </div>
      </div>

    </header>
  );
};