"use client"

import { useState } from "react"
import { EventCard } from "./EventCard"
import { EventCardList } from "./event-card-list"
import { cn } from "@/lib/utils"

type LayoutType = "grid" | "list"

type EventStatus = "draft" | "pending" | "scheduled" | "active" | "completed" | "cancelled"

interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  location: string
  zone?: string
  price?: string
  status: EventStatus
  startTime?: Date
  imageUrl: string
}

interface EventLayoutProps {
  events: Event[]
  layout?: LayoutType
  onLayoutChange?: (layout: LayoutType) => void
  className?: string
}

export function EventLayout({ events, layout = "grid", onLayoutChange, className }: EventLayoutProps) {
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set())

  const handleSelect = (id: string) => {
    setSelectedEvents((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleShare = (id: string) => {
    console.log("[v0] Share event:", id)
  }

  const handleAddToCalendar = (id: string) => {
    console.log("[v0] Add to calendar:", id)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Delete event:", id)
  }

  const handleUpdate = (id: string) => {
    console.log("[v0] Update event:", id)
  }

  const handlePublish = (id: string) => {
    console.log("[v0] Publish event:", id)
  }

  const handleCancel = (id: string) => {
    console.log("[v0] Cancel event:", id)
  }

  const handleStartLive = (id: string) => {
    console.log("[v0] Start live event:", id)
  }

  const handleStopLive = (id: string) => {
    console.log("[v0] Stop live event:", id)
  }

  if (layout === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {events.map((event) => (
          <EventCardList
            key={event.id}
            {...event}
            isSelected={selectedEvents.has(event.id)}
            onSelect={handleSelect}
            onShare={handleShare}
            onAddToCalendar={handleAddToCalendar}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onPublish={handlePublish}
            onCancel={handleCancel}
            onStartLive={handleStartLive}
            onStopLive={handleStopLive}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          {...event}
          isSelected={selectedEvents.has(event.id)}
          onSelect={handleSelect}
          onShare={handleShare}
          onAddToCalendar={handleAddToCalendar}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onPublish={handlePublish}
          onCancel={handleCancel}
          onStartLive={handleStartLive}
          onStopLive={handleStopLive}
        />
      ))}
    </div>
  )
}
