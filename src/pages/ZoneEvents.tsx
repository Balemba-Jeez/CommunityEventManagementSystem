import React from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../pages/layouts/DashboardLayout";
import { EventsGrid } from "@/components/events/EventsGrid";
import { Event, PageType } from "@/types/events";
import { useAuth } from "@/context/AuthContext";

interface ZoneParams extends Record<string, string> {
  zoneId: string;
}

const ZoneEvents: React.FC = () => {
  const { zoneId } = useParams<ZoneParams>();
  const { user, loginUser } = useAuth();
  
  return (
    <DashboardLayout>
      {(sidebarCollapsed: boolean) => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Zone Events</h1>
              <p className="text-muted-foreground mt-2">
                Explore events happening in your local zone
              </p>
            </div>
          </div>
          <EventsGrid 
            pageType="zone"
            zoneId={user?.zone}
            showStacks={true}
            stackCategories={["Technology", "Community", "Business"]}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default ZoneEvents;