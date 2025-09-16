// "use client"

// import { DashboardLayout } from "../pages/layouts/DashboardLayout"
// import { EventsGrid } from "@/components/events/EventsGrid"

// export default function AllEventsPage() {
//   return (
//     <DashboardLayout>
//       {(sidebarCollapsed) => (
//         <div className="p-6 space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-balance">All Events</h1>
//               <p className="text-muted-foreground mt-2">Discover and manage upcoming events across all categories</p>
//             </div>
//           </div>

//           <EventsGrid />
//         </div>
//       )}
//     </DashboardLayout>
//   )
// }

import React from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../pages/layouts/DashboardLayout";
import { EventsGrid } from "@/components/events/EventsGrid";
import { Event, PageType } from "@/types/events";

// AllEventsPage.tsx
const AllEventsPage: React.FC = () => {
  return (
    <DashboardLayout>
      {(sidebarCollapsed: boolean) => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">All Events</h1>
              <p className="text-muted-foreground mt-2">
                Discover and manage upcoming events across all categories
              </p>
            </div>
          </div>
          <EventsGrid 
            pageType="all"
            showStacks={true}
            stackCategories={["Technology", "Design", "Marketing"]}
          />
        </div>
      )}
    </DashboardLayout>
  );
};

export default AllEventsPage;