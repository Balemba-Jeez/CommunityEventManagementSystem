// SavedEventsPage.jsx
"use client"
// import { useAuth } from "@/hooks/useAuth" // Assuming you have auth
import { DashboardLayout } from "../pages/layouts/DashboardLayout"
import { EventsGrid } from "@/components/events/EventsGrid"

export default function SavedEventsPage() {
//   const { user } = useAuth()
  
  return (
    <DashboardLayout>
      {(sidebarCollapsed) => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Saved Events</h1>
              <p className="text-muted-foreground mt-2">
                Your bookmarked events for quick access
              </p>
            </div>
          </div>
          <EventsGrid 
            pageType="saved"
            // userId={user?.id}
            showStacks={false} // No stacks for saved events
          />
        </div>
      )}
    </DashboardLayout>
  )
}