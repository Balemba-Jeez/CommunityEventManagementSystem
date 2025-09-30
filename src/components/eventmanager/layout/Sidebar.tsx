// import React from 'react';
// import { LayoutDashboard, Calendar, FileText, DollarSign, Mail, Settings, HelpCircle, Clock, Tags, Cast, Wallet, Folder } from 'lucide-react';
// import { Logo } from '@/components/ui/Logo';
// export function Sidebar() {
//   return <div className="w-56 flex flex-col h-screen fixed left-0 top-0 z-10 pb-6" style={{
//     backgroundColor: 'var(--sidebar)',
//     borderRight: '1px solid var(--sidebar-border)',
//     color: 'var(--sidebar-foreground)'
//   }}>
//       <div className="p-4" style={{
//       borderBottom: '1px solid var(--sidebar-border)'
//     }}>
//         <div className="">
//           <Logo />
//         </div>
//       </div>
//       <div className="py-4 flex-1">
//         <div className="px-4 py-2 text-xs font-medium" style={{
//         color: 'var(--muted-foreground)'
//       }}>
//           MAIN MENU
//         </div>
//         <nav className="mt-2">
//           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full" style={{
//           backgroundColor: 'var(--sidebar-primary)',
//           color: 'var(--sidebar-primary-foreground)'
//         }}>
//             <LayoutDashboard className="h-5 w-5 mr-3" />
//             Dashboard
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
//           color: 'var(--sidebar-foreground)'
//         }}>
//             <Calendar className="h-5 w-5 mr-3" />
//             Events
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
//           color: 'var(--sidebar-foreground)'
//         }}>
//             <Clock className="h-5 w-5 mr-3" />
//             Pending Events
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
//           color: 'var(--sidebar-foreground)'
//         }}>
//             <Folder className="h-5 w-5 mr-3" />
//             Categories
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
//           color: 'var(--sidebar-foreground)'
//         }}>
//             <Cast className="h-5 w-5 mr-3" />
//             Go Live
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
//           color: 'var(--sidebar-foreground)'
//         }}>
//             <Wallet className="h-5 w-5 mr-3" />
//             Contributions
//           </a>
//         </nav>
//         <div className="px-4 py-2 mt-2 text-xs font-medium" style={{
//         color: 'var(--muted-foreground)'
//       }}>
//           OTHER
//         </div>
//         <nav className="mt-2">
//           <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
//           color: 'var(--sidebar-foreground)'
//         }}>
//             <Settings className="h-5 w-5 mr-3" />
//             Settings
//           </a>
//           <a href="#" className="flex items-center px-4 py-3 pb-6 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
//           color: 'var(--sidebar-foreground)'
//         }}>
//             <HelpCircle className="h-5 w-5 mr-3" />
//             Help & Support
//           </a>
//         </nav>
//       </div>
//       {/* <div className="p-4" style={{
//       borderTop: '1px solid var(--sidebar-border)'
//     }}>
//         <div className="p-4 rounded-lg" style={{
//         backgroundColor: 'var(--muted)'
//       }}>
//           <div className="font-medium text-sm">Upgrade to a better plan.</div>
//           <div className="text-xs mt-1" style={{
//           color: 'var(--muted-foreground)'
//         }}>
//             Unlock additional features, enhanced capabilities
//           </div>
//           <button className="mt-4 w-full py-2 px-4 rounded-md flex items-center justify-center text-xs font-medium" style={{
//           backgroundColor: 'var(--primary)',
//           color: 'var(--primary-foreground)'
//         }}>
//             <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             See plans
//           </button>
//         </div>
//       </div> */}
//     </div>;
// }

import React, { useState } from 'react';
import { LayoutDashboard, Calendar, FileText, DollarSign, Mail, Settings, HelpCircle, Clock, Tags, Cast, Wallet, Folder, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Sidebar({ onNavigate }) {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Events', label: 'Events', icon: Calendar },
    { id: 'Pending Events', label: 'Pending Events', icon: Clock },
    { id: 'Categories', label: 'Categories', icon: Folder },
    { id: 'Go Live', label: 'Go Live', icon: Cast },
    { id: 'Contributions', label: 'Contributions', icon: Wallet },
  ];

  const otherItems = [
    { id: 'Settings', label: 'Settings', icon: Settings },
    { id: 'Help & Support', label: 'Help & Support', icon: HelpCircle },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    
    // Call the navigation handler from parent Dashboard component
    if (onNavigate) {
      onNavigate(item.path || '/', item.id);
    }
  };

  const getItemStyle = (itemId, isActive) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      color: isActive ? 'white' : 'var(--sidebar-foreground)',
      backgroundColor: isActive ? '#2C3E94' : 'transparent',
      margin: '4px 12px',
    };

    return baseStyle;
  };

  const getHoverStyle = (itemId, isActive) => {
    return {
      backgroundColor: isActive ? '#3d4ea3' : 'white',
      color: isActive ? 'white' : 'var(--sidebar-foreground)',
    };
  };

  const MenuItem = ({ item, isActive, section = 'main' }) => {
    const Icon = item.icon;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <a
        href="#"
        style={{
          ...getItemStyle(item.id, isActive),
          ...(isHovered ? getHoverStyle(item.id, isActive) : {}),
        }}
        onClick={(e) => {
          e.preventDefault();
          handleItemClick(item);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon className="h-5 w-5 mr-3" />
        {item.label}
      </a>
    );
  };

  return (
    <>
      {/* Toggle Button - visible when sidebar is closed */}
      {/* {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 20,
            backgroundColor: '#2C3E94',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Menu className="h-5 w-5" />
        </button>
      )} */}

      {/* Sidebar */}
      <div 
        className="flex flex-col h-screen fixed left-0 top-0 z-10 transition-all duration-300 ease-in-out" 
        style={{
          width: isOpen ? '224px' : '0px',
          backgroundColor: 'var(--sidebar)',
          borderRight: '1px solid var(--sidebar-border)',
          color: 'var(--sidebar-foreground)',
          overflow: 'hidden',
        }}
      >
      <div className="p-4 flex items-center justify-between" style={{
        borderBottom: '1px solid var(--sidebar-border)'
      }}>
        <div className="">
          <Logo />
        </div>
        {/* <button
          onClick={() => setIsOpen(false)}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--sidebar-foreground)',
            border: 'none',
            borderRadius: '4px',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X className="h-5 w-5" />
        </button> */}
      </div>
      
      <div className="py-4 flex-1 overflow-y-auto" style={{ paddingBottom: '24px' }}>
        <div className="px-4 py-2 text-xs font-medium" style={{
          color: 'var(--muted-foreground)'
        }}>
          MAIN MENU
        </div>
        <nav className="mt-2">
          {menuItems.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              isActive={activeItem === item.id}
              section="main"
            />
          ))}
        </nav>
        
        <div className="px-4 py-2 mt-2 text-xs font-medium" style={{
          color: 'var(--muted-foreground)'
        }}>
          OTHER
        </div>
        <nav className="mt-2">
          {otherItems.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              isActive={activeItem === item.id}
              section="other"
            />
          ))}
        </nav>
      </div>
    </div>
    </>
  );
}