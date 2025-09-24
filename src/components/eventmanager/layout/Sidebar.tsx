import React from 'react';
import { LayoutDashboard, Calendar, FileText, DollarSign, Mail, Settings, HelpCircle, Clock, Tags, Cast, Wallet, Folder } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
export function Sidebar() {
  return <div className="w-56 flex flex-col h-screen fixed left-0 top-0 z-10 pb-6" style={{
    backgroundColor: 'var(--sidebar)',
    borderRight: '1px solid var(--sidebar-border)',
    color: 'var(--sidebar-foreground)'
  }}>
      <div className="p-4" style={{
      borderBottom: '1px solid var(--sidebar-border)'
    }}>
        <div className="">
          <Logo />
        </div>
      </div>
      <div className="py-4 flex-1">
        <div className="px-4 py-2 text-xs font-medium" style={{
        color: 'var(--muted-foreground)'
      }}>
          MAIN MENU
        </div>
        <nav className="mt-2">
          <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full" style={{
          backgroundColor: 'var(--sidebar-primary)',
          color: 'var(--sidebar-primary-foreground)'
        }}>
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
          color: 'var(--sidebar-foreground)'
        }}>
            <Calendar className="h-5 w-5 mr-3" />
            Events
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
          color: 'var(--sidebar-foreground)'
        }}>
            <Clock className="h-5 w-5 mr-3" />
            Pending Events
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
          color: 'var(--sidebar-foreground)'
        }}>
            <Folder className="h-5 w-5 mr-3" />
            Categories
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
          color: 'var(--sidebar-foreground)'
        }}>
            <Cast className="h-5 w-5 mr-3" />
            Go Live
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
          color: 'var(--sidebar-foreground)'
        }}>
            <Wallet className="h-5 w-5 mr-3" />
            Contributions
          </a>
        </nav>
        <div className="px-4 py-2 mt-2 text-xs font-medium" style={{
        color: 'var(--muted-foreground)'
      }}>
          OTHER
        </div>
        <nav className="mt-2">
          <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
          color: 'var(--sidebar-foreground)'
        }}>
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </a>
          <a href="#" className="flex items-center px-4 py-3 pb-6 text-sm font-medium rounded-r-full hover:bg-opacity-80" style={{
          color: 'var(--sidebar-foreground)'
        }}>
            <HelpCircle className="h-5 w-5 mr-3" />
            Help & Support
          </a>
        </nav>
      </div>
      {/* <div className="p-4" style={{
      borderTop: '1px solid var(--sidebar-border)'
    }}>
        <div className="p-4 rounded-lg" style={{
        backgroundColor: 'var(--muted)'
      }}>
          <div className="font-medium text-sm">Upgrade to a better plan.</div>
          <div className="text-xs mt-1" style={{
          color: 'var(--muted-foreground)'
        }}>
            Unlock additional features, enhanced capabilities
          </div>
          <button className="mt-4 w-full py-2 px-4 rounded-md flex items-center justify-center text-xs font-medium" style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)'
        }}>
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            See plans
          </button>
        </div>
      </div> */}
    </div>;
}