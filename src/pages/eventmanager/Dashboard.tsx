import React from 'react';
import { Sidebar } from '../../components/eventmanager/layout/Sidebar';
import { Header } from '../../components/eventmanager/layout/Header';
import { UserProfile } from '../../components/eventmanager/dashboard/UserProfile';
import { StatCards } from '../../components/eventmanager/dashboard/StatCards';
import { PayoutCharts } from '../../components/eventmanager/dashboard/PayoutCharts';
import { SalesTable } from '../../components/eventmanager/dashboard/SalesTable';
export  function Dashboard({
  isDarkMode,
  toggleDarkMode
}) {
  return <div className="flex h-screen " style={{
    backgroundColor: 'var(--background)'
  }}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-56">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1  p-6">
          <UserProfile />
          <StatCards />
          <PayoutCharts />
          <SalesTable />
        </main>
      </div>
    </div>;
}