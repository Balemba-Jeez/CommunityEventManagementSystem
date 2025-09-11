import { useState } from 'react';
import { Search, Plus, Bell, Menu,} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Logo } from '../ui/Logo';
import { Link } from 'react-router-dom';
import SearchComponent from './Search';
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-6 py-4">
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
        <div className='mr-3'>
            <SearchComponent 
              placeholder="What are you looking for?"
              onSearch={handleSearch}
              className="max-w-2xl mx-auto w-[512px]"
            
            />  
        </div>

        <Button
        asChild
        variant="secondary"
        className="font-medium bg-[#e2e5e9] hover:bg-[#d6d9dd] hover:text-black"
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

          <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <AvatarImage src="/api/placeholder/32/32" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-6 pb-4 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events, streams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 w-full bg-accent/50 border-accent focus:bg-background focus:border-primary transition-all"
          />
        </div>
      </div>
    </header>
  );
};