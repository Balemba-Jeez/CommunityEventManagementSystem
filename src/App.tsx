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
// import LiveEvents from "./pages/LiveEvents";
// import RecentLive from "./pages/RecentLive";
// import UpcomingLive from "./pages/UpcomingLive";
// import Notifications from "./pages/Notifications";
// import Ads from "./pages/Ads";
// import Settings from "./pages/Settings";
// import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-phone" element={<VerifyPhone />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Events routes */}
          <Route path="/events/all" element={<AllEvents />} />
           <Route path="/events/zone" element={<ZoneEvents />} />
          <Route path="/events/global" element={<GlobalEvents />} />
          <Route path="/events/saved" element={<SavedEvents />} />
          
          {/* Live events routes */}
          {/* <Route path="/events/live/now" element={<LiveEvents />} />
          <Route path="/events/live/recent" element={<RecentLive />} />
          <Route path="/events/live/upcoming" element={<UpcomingLive />} /> */}
          
          {/* Utility routes */}
          {/* <Route path="/notifications" element={<Notifications />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} /> */}
          
          {/* Catch-all route - MUST BE LAST */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;