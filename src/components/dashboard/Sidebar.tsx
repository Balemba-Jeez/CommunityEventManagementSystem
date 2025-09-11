import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  MapPin, 
  Globe, 
  Bookmark, 
  Radio, 
  Plus, 
  Bell, 
  Megaphone, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Link } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const mainNavItems = [
  { icon: Home, label: 'Home', href: '/dashboard', active: true },
  { icon: Calendar, label: 'All Events', href: '/events/all' },
  { icon: MapPin, label: 'Zone Events', href: '/events/zone' },
  { icon: Globe, label: 'Global Events', href: '/events/global' },
  { icon: Bookmark, label: 'Saved Events', href: '/events/saved' },
  { icon: Radio, label: 'Live Now', href: '/events/live', badge: 'LIVE' },
];

const utilityItems = [
  { icon: Bell, label: 'Notifications', href: '/notifications', badge: '3' },
  { icon: Megaphone, label: 'Advertisement Request', href: '/ads' },
  { icon: Settings, label: 'Settings/Preferences', href: '/settings' },
  { icon: HelpCircle, label: 'Help/Contact Support', href: '/help' },
];

const footerSections = [
  {
    title: 'Company',
    items: ['About', 'Press', 'Copyright', 'Contact', 'Creators']
  },
  {
    title: 'Business',
    items: ['Advertise', 'Developers', 'Terms', 'Privacy']
  },
  {
    title: 'Platform',
    items: ['Policy & Safety', 'How Site Works', 'Test New Features']
  }
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active = false, 
  badge 
}: { 
  icon: any; 
  label: string; 
  href: string; 
  active?: boolean; 
  badge?: string; 
}) => {
  const content = (
    <Link
      to={href}
      className={`flex items-center w-full h-12 px-3 transition-colors ${
        active 
          ? 'font-semibold text-[#2C3E94] border-l-2 border-[#2C3E94]' 
          : 'hover:bg-gray-100 hover:text-black text-gray-700 rounded-lg'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0 ${
                      active ? 'text-[#2C3E94]' : 'text-gray-600'
                      }`} />
      {!collapsed && (
        <>
          <span className="flex-1 text-left font-medium">{label}</span>
          {badge && (
            <span className={`text-xs px-2 py-1 rounded-full text-white font-medium bg-[#e74d3c] ${
              badge === 'LIVE' 
                ? 'bg-live text-live-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};


  return (
    <aside className={`fixed left-2 top-0 h-full bg-background transition-all duration-300 z-40 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full  pt-[82px]">
        {/* Header */}
        {/* <div className="p-10 border-b border-border">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold font-heading text-sm">PC</span>
                </div>
                <div>
                  <h2 className="font-heading font-bold text-sm">PC Community</h2>
                  <p className="text-xs text-muted-foreground">Essential Plan</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onToggle}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-heading text-sm">PC</span>
              </div>
            </div>
          )}
        </div> */}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {/* Main Navigation */}
          <Collapsible 
            open={expandedSections.includes('main')}
            onOpenChange={() => toggleSection('main')}
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className={`w-full justify-between mb-2  hover:bg-gray-100   ${collapsed ? 'hidden' : ''}`}>
                <span className="font-semibold text-sm text-muted-foreground">MAIN</span>
                {expandedSections.includes('main') ? (
                  <ChevronDown className="h-4 w-4 text-[#7F8C8D]" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[#7F8C8D]" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarItem key={item.href} {...item} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Create Post Action */}
          <div className="py-4">
            <Button
              className={`w-full gradient-primary hover:shadow-glow transition-all ${
                collapsed ? 'p-3' : 'px-4 py-3'
              }`}
            >
              <Plus className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && <span className="font-medium">Create Post</span>}
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Utility Items */}
          {!collapsed && (
            <div className="space-y-1 pb-4">
                <p className="text-xs font-semibold text-muted-foreground px-3 mb-3">UTILITIES</p>
                {utilityItems.map((item) => (
                  <SidebarItem key={item.href} {...item} />
                ))}
            </div>
          )}

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 pt-6 pb-4 border-t border-border mt-auto">
            <div className="space-y-4">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                    {section.title.toUpperCase()}
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {section.items.map((item) => (
                      <Link 
                        key={item}
                        to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="block h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        {item}
                      </Link>

                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


      </div>



      </div>
    </aside>
  );
};