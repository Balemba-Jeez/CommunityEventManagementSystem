import React from "react";
import { DashboardLayout } from "../pages/layouts/DashboardLayout";
import { StreamEventsGrid } from "@/components/events/StreamEventsGrid";
import { useAuth } from "@/context/AuthContext";

const UpcomingEvents: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      {(sidebarCollapsed: boolean) => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Upcoming Live Events</h1>
              <p className="text-muted-foreground mt-2">
                Set reminders for events you don't want to miss
              </p>
            </div>
          </div>
          <StreamEventsGrid 
            streamType="upcoming"
            pageType="all"
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default UpcomingEvents;