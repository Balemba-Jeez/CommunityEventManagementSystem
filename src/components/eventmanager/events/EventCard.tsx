"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Share2, Trash2, Edit, Play, Square, Upload, X, Check, Clock } from "lucide-react"
import { Grid } from "lucide-react"
import { cn } from "@/lib/utils"

type EventStatus = "draft" | "pending" | "scheduled" | "active" | "completed" | "cancelled"

interface EventCardProps {
  id: string
  title: string
  description?: string
  date: string // e.g., "DEC 24"
  time?: string // e.g., "7:00 PM"
  location: string
  price?: string
  status: EventStatus
  startTime?: Date // Used to determine if scheduled event can start live
  imageUrl: string
  isSelected?: boolean
  onSelect?: (id: string) => void
  onShare?: (id: string) => void
  onAddToCalendar?: (id: string) => void
  onDelete?: (id: string) => void
  onUpdate?: (id: string) => void
  onPublish?: (id: string) => void
  onCancel?: (id: string) => void
  onStartLive?: (id: string) => void
  onStopLive?: (id: string) => void
  className?: string
}

export function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  price,
  status,
  startTime,
  imageUrl,
  isSelected = false,
  onSelect,
  onShare,
  onAddToCalendar,
  onDelete,
  onUpdate,
  onPublish,
  onCancel,
  onStartLive,
  onStopLive,
  className,
}: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const statusConfig: Record<
    EventStatus,
    { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
  > = {
    draft: { label: "Draft", variant: "secondary" },
    pending: { label: "Pending", variant: "secondary" },
    scheduled: { label: "Scheduled", variant: "default" },
    active: { label: "Live", variant: "destructive" },
    completed: { label: "Completed", variant: "outline" },
    cancelled: { label: "Cancelled", variant: "outline" },
  }

  const handleSelect = () => {
    onSelect?.(id)
  }

  const canStartLive = () => {
    if (status !== "scheduled" || !startTime) return false
    return new Date() >= startTime
  }

  const getPrimaryActions = () => {
    const actions = []

    if (status === "draft" || status === "pending") {
      if (onPublish) actions.push({ icon: Upload, label: "Publish", onClick: () => onPublish(id) })
      if (onUpdate) actions.push({ icon: Edit, label: "Update", onClick: () => onUpdate(id) })
    } else if (status === "scheduled") {
      if (canStartLive() && onStartLive) {
        actions.push({ icon: Play, label: "Start Live", onClick: () => onStartLive(id) })
      }
      if (onUpdate) actions.push({ icon: Edit, label: "Update", onClick: () => onUpdate(id) })
      if (onCancel) actions.push({ icon: X, label: "Cancel", onClick: () => onCancel(id) })
    } else if (status === "active") {
      if (onStopLive) actions.push({ icon: Square, label: "Stop Live", onClick: () => onStopLive(id) })
      if (onCancel) actions.push({ icon: X, label: "Cancel", onClick: () => onCancel(id) })
    } else if (status === "completed" || status === "cancelled") {
      if (onDelete) actions.push({ icon: Trash2, label: "Delete", onClick: () => onDelete(id) })
    }

    return actions
  }

  const showSecondaryActions = status !== "draft"

  const [month, day] = date.split(" ")

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn("relative w-full max-w-[340px]", className)}>
        {/* Image Container - Overlaid on top */}
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-lg mb-[-40px] z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay for hover state */}
          <div
            className={cn(
              "absolute inset-0 bg-black/30 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Status Badge - Top Left */}
          <div className="absolute left-2.5 top-2.5 z-10">
            <Badge variant={statusConfig[status].variant} className="text-xs font-semibold shadow-lg backdrop-blur-sm">
              {statusConfig[status].label}
            </Badge>
          </div>

          {/* Selection Circle - Top Right */}
          <div
            className={cn(
              "absolute right-2.5 top-2.5 z-10 transition-all duration-300",
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90",
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className={cn(
                    "h-8 w-8 rounded-full p-0 shadow-lg backdrop-blur-sm transition-all duration-200",
                    isSelected && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                  )}
                  onClick={handleSelect}
                >
                  {isSelected ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-current" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{isSelected ? "Deselect" : "Select"}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Secondary Actions - Bottom Left */}
          {showSecondaryActions && (
            <div
              className={cn(
                "absolute bottom-2.5 left-2.5 z-10 flex gap-1.5 transition-all duration-300",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 rounded-full p-0 shadow-lg backdrop-blur-sm hover:scale-110 transition-transform"
                    onClick={() => onShare?.(id)}
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>

              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 rounded-full p-0 shadow-lg backdrop-blur-sm hover:scale-110 transition-transform"
                    onClick={() => onAddToCalendar?.(id)}
                  >
                    <CalendarPlus className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Add to Calendar</p>
                </TooltipContent>
              </Tooltip> */}
            </div>
          )}

          {/* Primary Actions - Bottom Right */}
          <div
            className={cn(
              "absolute bottom-2.5 right-2.5 z-10 flex gap-1.5 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
          >
            {getPrimaryActions().map((action, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className={cn(
                      "h-8 w-8 rounded-full p-0 shadow-lg backdrop-blur-sm hover:scale-110 transition-transform",
                      action.icon === Trash2 && "hover:bg-destructive hover:text-destructive-foreground",
                      action.icon === X && "hover:bg-destructive hover:text-destructive-foreground",
                    )}
                    onClick={action.onClick}
                  >
                    <action.icon className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <Card
          className={cn(
            "relative overflow-hidden bg-card border-border transition-all duration-300 ease-out rounded-3xl",
            "hover:shadow-xl hover:shadow-black/10",
            "pt-12 pb-3",
          )}
        >
          {/* Event Information */}
          <div className="px-4">
            <div className="flex gap-3">
              {/* Date Display */}
              <div className="flex flex-col items-center justify-center min-w-[50px]">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{month}</div>
                <div className="text-2xl font-bold text-foreground leading-none mt-0.5">{day}</div>
              </div>

              {/* Divider */}
              <div className="w-px bg-border" />

              {/* Event Details */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Time Display */}
                {time && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="font-medium">{time}</span>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{location}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base leading-tight text-balance text-foreground">{title}</h3>

                {/* Description */}
                {description && (
                  <p className="text-xs text-muted-foreground leading-relaxed text-pretty line-clamp-2">
                    {description}
                  </p>
                )}

                {price && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                    <Grid className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="font-medium">zone 5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}
