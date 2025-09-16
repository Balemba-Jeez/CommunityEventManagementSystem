// import { useState, useEffect } from 'react';
// import { Header } from '../components/dashboard/Header';
// import { Sidebar } from '../components/dashboard/Sidebar';
// // import { StoriesRing } from '../components/dashboard/StoriesRing';
// import { HorizontalCarousel } from '../components/dashboard/HorizontalCarousel';
// import { MediaCards } from '../components/dashboard/MediaCards';
// import { EventPills } from '../components/dashboard/EventPills';
// import { BackToTop } from '../components/dashboard/BackToTop';
// import { SkeletonLoader } from '../components/dashboard/SkeletonLoader';
// import { StoriesSection } from '@/components/dashboard/StoriesSection';

// const Dashboard = () => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [selectedZone, setSelectedZone] = useState('all');
//   const [selectedEvent, setSelectedEvent] = useState('all');
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 3600);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleZoneChange = (zone: string) => {
//     setSelectedZone(zone);
//   };

//   const handleEventChange = (event: string) => {
//     setSelectedEvent(event);
//   };

//   return (
//     <div className="min-h-screen">
//       <Header 
//         onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
//         sidebarCollapsed={sidebarCollapsed}
//       />
      
//       <div className="flex">
//         <Sidebar 
//           collapsed={sidebarCollapsed}
//           onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
//         />
        
//         <main className={`flex-1 transition-all duration-300 ${
//           sidebarCollapsed ? 'ml-16' : 'ml-64'
//         }`}>
//           <div className="p-6 space-y-8">
//             {/* Stories Ring */}
//             <section className="animate-fade-in-up">
//               {isLoading ? (
//                 <SkeletonLoader type="stories" />
//               ) : (
//                 <StoriesSection />
//               )}
//             </section>

//             {/* Event Selection Pills */}
//             {/* <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
//               <EventPills
//                 selectedZone={selectedZone}
//                 selectedEvent={selectedEvent}
//                 onZoneChange={handleZoneChange}
//                 onEventChange={handleEventChange}
//               />
//             </section> */}

//             {/* Horizontal Carousel
//             <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
//                 <HorizontalCarousel />
//             </section> */}

//             {/* Media Cards Grid */}
//             <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>

//                 <MediaCards
//                   selectedZone={selectedZone}
//                   selectedEvent={selectedEvent}
//                   collapsed={sidebarCollapsed}
//                 />
            
//             </section>
//           </div>
//         </main>
//       </div>

//       <BackToTop />
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from 'react';
import { DashboardLayout } from './layouts/DashboardLayout';
import { HorizontalCarousel } from '../components/dashboard/HorizontalCarousel';
import { MediaCards } from '../components/dashboard/MediaCards';
import { EventPills } from '../components/dashboard/EventPills';
import { SkeletonLoader } from '../components/dashboard/SkeletonLoader';
import { StoriesSection } from '@/components/dashboard/StoriesSection';

const Dashboard = () => {
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3600);
    return () => clearTimeout(timer);
  }, []);

  const handleZoneChange = (zone: string) => {
    setSelectedZone(zone);
  };

  const handleEventChange = (event: string) => {
    setSelectedEvent(event);
  };

  return (
    <DashboardLayout>
    {(sidebarCollapsed: boolean) => (  // ✅ Add explicit type
      <div className="p-6 space-y-8">
        {/* Stories Ring */}
        <section className="animate-fade-in-up">
          {isLoading ? (
            <SkeletonLoader type="stories" />
          ) : (
            <StoriesSection />
          )}
        </section>

        {/* Event Selection Pills */}
        {/* <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <EventPills
            selectedZone={selectedZone}
            selectedEvent={selectedEvent}
            onZoneChange={handleZoneChange}
            onEventChange={handleEventChange}
          />
        </section> */}

        {/* Horizontal Carousel
        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <HorizontalCarousel />
        </section> */}

        {/* Media Cards Grid */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <MediaCards
            selectedZone={selectedZone}
            selectedEvent={selectedEvent}
            collapsed={sidebarCollapsed}  // ✅ Now works!
          />
        </section>
      </div>
    )}
    </DashboardLayout>
  );
};

export default Dashboard;