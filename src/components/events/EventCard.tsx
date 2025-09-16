"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
}

interface EventCardProps {
  event: Event
  variant?: "featured" | "list"
  isActive?: boolean
}

export function EventCard({ event, variant = "list", isActive = false }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  if (variant === "featured") {
    return (
      <Card
        className={`w-full h-full overflow-hidden transition-all duration-300 ${
          isActive ? "ring-2 ring-primary shadow-xl" : "shadow-lg"
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
              {event.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-balance leading-tight">{event.title}</CardTitle>
          <CardDescription className="text-sm text-pretty">{event.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-pretty">{event.location}</span>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Join Event
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-40 overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-xs">
            {event.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-balance leading-tight">{event.title}</CardTitle>
        <CardDescription className="text-sm text-pretty line-clamp-2">{event.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>
              {formatDate(event.date)} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-pretty truncate">{event.location}</span>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent" size="sm">
          Learn More
        </Button>
      </CardContent>
    </Card>
  )
}
