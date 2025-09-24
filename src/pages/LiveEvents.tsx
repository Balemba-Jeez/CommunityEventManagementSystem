import React from "react";
import { DashboardLayout } from "../pages/layouts/DashboardLayout";
import { StreamEventsGrid } from "@/components/events/StreamEventsGrid";
import { useAuth } from "@/context/AuthContext";

const LiveEvents: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      {(sidebarCollapsed: boolean) => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Live Events</h1>
              <p className="text-muted-foreground mt-2">
                Watch events happening right now
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-500">LIVE</span>
            </div>
          </div>
          <StreamEventsGrid 
            streamType="live"
            pageType="all"
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default LiveEvents;