// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import CreateAccount from "./pages/CreateAccount";
// import VerifyEmail from "./pages/VerifyEmail";
// import VerifyPhone from "./pages/VerifyPhone";
// import Login from "./pages/Login";
// import SelectRole from "./pages/SelectRole";
// import ApprovalWaiting from "./pages/ApprovalWaiting";
// import Dashboard from "./pages/Dashboard";
// import AllEvents from "./pages/AllEvents";
// import ZoneEvents from "./pages/ZoneEvents";
// import GlobalEvents from "./pages/GlobalEvents";
// import SavedEvents from "./pages/SavedEvents";
// import CreatePost from "./pages/CreatePosts";
// import LiveEvents from "./pages/LiveEvents";
// import RecentLive from "./pages/RecentLive";
// import UpcomingLive from "./pages/UpcomingLive";
// import EventPage from "./pages/EventPage";
// import LiveStreamPage from './components/LiveStreamPage'
// // import Notifications from "./pages/Notifications";
// // import Ads from "./pages/Ads";
// // import Settings from "./pages/Settings";
// // import Help from "./pages/Help";
// import NotFound from "./pages/NotFound";
// import { AuthProvider } from "./context/AuthContext";
// import { UploadProvider } from "./context/UploadContext";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//     <BrowserRouter>
//       <AuthProvider>
//          <UploadProvider>
//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<Index />} />
//             <Route path="/create-account" element={<CreateAccount />} />
//             <Route path="/verify-email" element={<VerifyEmail />} />
//             <Route path="/verify-phone" element={<VerifyPhone />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/select-role" element={<SelectRole />} />
//             <Route path="/approval-waiting" element={<ApprovalWaiting />} />
//             <Route path="/create-post" element={<CreatePost />} />
//             {/* Dashboard routes */}
//             <Route path="/dashboard" element={<Dashboard />} />
            
//             {/* Events routes */}
//             <Route path="/events/all" element={<AllEvents />} />
//             <Route path="/events/zone" element={<ZoneEvents />} />
//             <Route path="/events/global" element={<GlobalEvents />} />
//             <Route path="/events/saved" element={<SavedEvents />} />
            
//             {/* Live events routes */}
//              <Route path="/events/live/now" element={<LiveEvents />} />
//             <Route path="/events/live/recent" element={<RecentLive />} />
//             <Route path="/events/live/upcoming" element={<UpcomingLive />} />
//             <Route path="/events/:eventId" element={<EventPage />} />
//             <Route path="/events/live/now/:id" element={<LiveStreamPage />} />
            
//             {/* Utility routes */}
//             {/* <Route path="/notifications" element={<Notifications />} />
//             <Route path="/ads" element={<Ads />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/help" element={<Help />} /> */}
            
//             {/* Catch-all route - MUST BE LAST */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </UploadProvider>
//       </AuthProvider>
//     </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateAccount from "./pages/CreateAccount";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyPhone from "./pages/VerifyPhone";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole";
import ApprovalWaiting from "./pages/ApprovalWaiting";
import Dashboard from "./pages/Dashboard";
import AllEvents from "./pages/AllEvents";
import ZoneEvents from "./pages/ZoneEvents";
import GlobalEvents from "./pages/GlobalEvents";
import SavedEvents from "./pages/SavedEvents";
import CreatePost from "./pages/CreatePosts";
import LiveEvents from "./pages/LiveEvents";
import RecentLive from "./pages/RecentLive";
import UpcomingLive from "./pages/UpcomingLive";
import EventPage from "./pages/EventPage";
import LiveStreamPage from './components/LiveStreamPage';
// import Notifications from "./pages/Notifications";
// import Ads from "./pages/Ads";
// import Settings from "./pages/Settings";
// import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { UploadProvider } from "./context/UploadContext";
import { Dashboard as EventManagerDashboard }  from './pages/eventmanager/Dashboard';
import EventManagerLayout from './pages/layouts/EventManagerLayout';

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode detection and management from AI version
  useEffect(() => {
    // Check user preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setIsDarkMode(true);
    }
    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <UploadProvider>
              <Routes>
                {/* Public routes */}
                {/* Normal app routes (uses index.css) */}
                <Route path="/" element={<Index />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/verify-phone" element={<VerifyPhone />} />
                <Route path="/login" element={<Login />} />
                <Route path="/select-role" element={<SelectRole />} />
                <Route path="/approval-waiting" element={<ApprovalWaiting />} />
                <Route path="/create-post" element={<CreatePost />} />

                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Events routes */}
                <Route path="/events/all" element={<AllEvents />} />
                <Route path="/events/zone" element={<ZoneEvents />} />
                <Route path="/events/global" element={<GlobalEvents />} />
                <Route path="/events/saved" element={<SavedEvents />} />
                
                {/* Live events routes */}
                <Route path="/events/live/now" element={<LiveEvents />} />
                <Route path="/events/live/recent" element={<RecentLive />} />
                <Route path="/events/live/upcoming" element={<UpcomingLive />} />
                <Route path="/events/:eventId" element={<EventPage />} />
                <Route path="/events/live/now/:id" element={<LiveStreamPage />} />
                
                {/* Utility routes */}
                {/* <Route path="/notifications" element={<Notifications />} />
                <Route path="/ads" element={<Ads />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} /> */}


                {/* EventDashboard route (uses secondaryIndex.css) */}
                {/* Dashboard routes - pass dark mode props if needed */}
                <Route 
                  path="/event-manager/dashboard" 
                  element={
                  <EventManagerLayout>
                    <EventManagerDashboard 
                  isDarkMode={isDarkMode}
                  toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  
                  />
                  </EventManagerLayout>
                  } 
                />
                
                {/* Catch-all route - MUST BE LAST */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </UploadProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;