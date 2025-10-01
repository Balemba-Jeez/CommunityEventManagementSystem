// import React from 'react';
// import { Sidebar } from '../../components/eventmanager/layout/Sidebar';
// import { Header } from '../../components/eventmanager/layout/Header';
// import { UserProfile } from '../../components/eventmanager/dashboard/UserProfile';
// import { StatCards } from '../../components/eventmanager/dashboard/StatCards';
// import { PayoutCharts } from '../../components/eventmanager/dashboard/PayoutCharts';
// import { SalesTable } from '../../components/eventmanager/dashboard/SalesTable';
// export  function Dashboard({
//   isDarkMode,
//   toggleDarkMode
// }) {
//   return <div className="flex h-screen " style={{
//     backgroundColor: 'var(--background)'
//   }}>
//       <Sidebar />
//       <div className="flex-1 flex flex-col ml-56">
//         <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
//         <main className="flex-1  p-6">
//           <UserProfile />
//           <StatCards />
//           <PayoutCharts />
//           <SalesTable />
//         </main>
//       </div>
//     </div>;
// }

import React, { useState } from 'react';
import { Sidebar } from '../../components/eventmanager/layout/Sidebar';
import { Header } from '../../components/eventmanager/layout/Header';
import { UserProfile } from '../../components/eventmanager/dashboard/UserProfile';
import { StatCards } from '../../components/eventmanager/dashboard/StatCards';
import { PayoutCharts } from '../../components/eventmanager/dashboard/PayoutCharts';
import { SalesTable } from '../../components/eventmanager/dashboard/SalesTable';
import { EventsPage as AllEventPage } from './EventsPage';
import { PendingEventsPage as PendingEventPage } from './PendingEventsPage';
import { CategoryPage } from './CategoryPage';
import { GoLiveEventsPage } from './GoLiveEventPage';

// Placeholder components for other pages - replace these with your actual page components
const EventsPage = () => (
  <AllEventPage />
);

const PendingEventsPage = () => (
 <PendingEventPage />
);

const CategoriesPage = () => (
  <CategoryPage />
);

const GoLivePage = () => (
  <GoLiveEventsPage />
);

const ContributionsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Contributions</h1>
    <p>Contributions page content will go here...</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>Settings page content will go here...</p>
  </div>
);

const HelpSupportPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
    <p>Help & support page content will go here...</p>
  </div>
);

// Dashboard home content component
const DashboardHome = () => (
  <>
    <UserProfile />
    <StatCards />
    <PayoutCharts />
    <SalesTable />
  </>
);

export function Dashboard({ isDarkMode, toggleDarkMode }) {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  // Handle navigation from sidebar
  const handleNavigation = (path, itemId) => {
    setCurrentPage(itemId);
  };

  // Render the appropriate page content based on currentPage
  const renderPageContent = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardHome />;
      case 'Events':
        return <EventsPage />;
      case 'Pending Events':
        return <PendingEventsPage />;
      case 'Categories':
        return <CategoriesPage />;
      case 'Go Live':
        return <GoLivePage />;
      case 'Contributions':
        return <ContributionsPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Help & Support':
        return <HelpSupportPage />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen" style={{
      backgroundColor: 'var(--background)'
    }}>
      <Sidebar onNavigate={handleNavigation} />
      <div className="flex-1 flex flex-col ml-56">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 p-6">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
}