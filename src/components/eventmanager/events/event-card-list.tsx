"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Share2, Trash2, Edit, Play, Square, Upload, X, Check, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type EventStatus = "draft" | "pending" | "scheduled" | "active" | "completed" | "cancelled"

interface EventCardListProps {
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

export function EventCardList({
  id,
  title,
  description,
  date,
  time,
  location,
  zone,
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
}: EventCardListProps) {
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

  return (
    <TooltipProvider delayDuration={200}>
      <Card
        className={cn(
          "relative overflow-hidden bg-card border-border transition-all duration-300 ease-out rounded-lg",
          "hover:shadow-lg hover:shadow-black/10",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex">
          {/* Image Container - Left Side */}
          <div className="relative w-[240px] h-[120px] flex-shrink-0 overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Overlay for hover state */}
            <div
              className={cn(
                "absolute inset-0 bg-black/30 transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Status Badge - Top Left */}
            <div className="absolute left-2 top-2 z-10">
              <Badge
                variant={statusConfig[status].variant}
                className="text-xs font-semibold shadow-lg backdrop-blur-sm"
              >
                {statusConfig[status].label}
              </Badge>
            </div>

            {/* Selection Circle - Top Right */}
            <div
              className={cn(
                "absolute right-2 top-2 z-10 transition-all duration-300",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90",
              )}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className={cn(
                      "h-7 w-7 rounded-full p-0 shadow-lg backdrop-blur-sm transition-all duration-200",
                      isSelected && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                    )}
                    onClick={handleSelect}
                  >
                    {isSelected ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <div className="h-3 w-3 rounded-full border-2 border-current" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{isSelected ? "Deselect" : "Select"}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Action Buttons - Bottom */}
            <div
              className={cn(
                "absolute bottom-2 left-2 right-2 z-10 flex justify-between transition-all duration-300",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
            >
              {/* Secondary Actions */}
              {showSecondaryActions && (
                <div className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 rounded-full p-0 shadow-lg backdrop-blur-sm hover:scale-110 transition-transform"
                        onClick={() => onShare?.(id)}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Share</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}

              {/* Primary Actions */}
              <div className="flex gap-1 ml-auto">
                {getPrimaryActions().map((action, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="secondary"
                        className={cn(
                          "h-7 w-7 rounded-full p-0 shadow-lg backdrop-blur-sm hover:scale-110 transition-transform",
                          action.icon === Trash2 && "hover:bg-destructive hover:text-destructive-foreground",
                          action.icon === X && "hover:bg-destructive hover:text-destructive-foreground",
                        )}
                        onClick={action.onClick}
                      >
                        <action.icon className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{action.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </div>

          {/* Event Information - Right Side */}
          <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
            {/* Date and Time - Separated */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>{time}</span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-base leading-tight text-balance text-foreground mb-2">{title}</h3>

            {/* Location and Zone */}
            <div className="flex items-start gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
              <span className="font-medium">
                {location}
                {zone && <span className="ml-1">• {zone}</span>}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  )
}
