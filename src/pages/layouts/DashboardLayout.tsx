import { useState, ReactNode } from 'react';
import { Header } from '../../components/dashboard/Header';
import { Sidebar } from '../../components/dashboard/Sidebar';
import { BackToTop } from '../../components/dashboard/BackToTop';

interface DashboardLayoutProps {
  children: (sidebarCollapsed: boolean) => ReactNode;
  className?: string;
}

export const DashboardLayout = ({ children, className = '' }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Header
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
     
      <div className="flex">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
       
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } ${className}`}>
          {children(sidebarCollapsed)}
        </main>
      </div>
      
      <BackToTop />
    </div>
  );
};