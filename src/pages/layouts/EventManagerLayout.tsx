// layouts/EventManagerLayout.tsx
import React from "react"
import "../../secondaryIndex.css" // dashboard-specific styles

export default function EventManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="event-manager-layout">
      {children}
    </div>
  )
}
