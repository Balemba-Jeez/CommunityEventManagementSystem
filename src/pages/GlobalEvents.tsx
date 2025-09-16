// GlobalEventsPage.jsx (Community Events)

"use client"
import { DashboardLayout } from "../pages/layouts/DashboardLayout"
import { EventsGrid } from "@/components/events/EventsGrid"

export default function GlobalEvents() {
  return (
    <DashboardLayout>
      {(sidebarCollapsed) => (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Global Events</h1>
              <p className="text-muted-foreground mt-2">
                Connect with the worldwide community through global events
              </p>
            </div>
          </div>
          <EventsGrid 
            pageType="global"
            showStacks={true}
            stackCategories={["Community", "Networking", "Workshop"]}
          />
        </div>
      )}
    </DashboardLayout>
  )
}
