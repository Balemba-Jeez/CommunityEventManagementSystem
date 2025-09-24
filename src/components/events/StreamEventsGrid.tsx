import { useState, useEffect } from "react"
import { StreamCard } from "../dashboard/stream-card"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import axios from "axios"

export type StreamType = "live" | "recent" | "upcoming"

interface StreamEvent {
  id: string
  title: string
  description?: string
  location: string
  start_time: string
  end_time?: string
  image_url?: string
  status: string
  live_status: "idle" | "ready" | "active" | "ended" | "error"
  live_stream_url?: string
  live_playback_url?: string
  organizer_id: number
  category_name?: string
  zone_name?: string
  organizer_name?: string
}

interface StreamEventsGridProps {
  streamType: StreamType
  className?: string
  pageType?: "zone" | "global" | "all"
}

export const StreamEventsGrid: React.FC<StreamEventsGridProps> = ({
  streamType,
  className = "",
  pageType = "all"
}) => {
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const { token, authLoading } = useAuth()

  // Transform event to StreamCard format
  const transformEventToStream = (event: StreamEvent) => {
    const now = new Date()
    const startTime = new Date(event.start_time)
    const endTime = event.end_time ? new Date(event.end_time) : null

    // Calculate relative times
    const getRelativeTime = (date: Date) => {
      const diff = Math.abs(now.getTime() - date.getTime())
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(hours / 24)
      
      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
      return 'Just now'
    }

    const getUpcomingTime = (date: Date) => {
      const diff = date.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(hours / 24)
      
      if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
      if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`
      return 'Starting soon'
    }

    const getDuration = () => {
      if (!endTime) return undefined
      const diff = endTime.getTime() - startTime.getTime()
      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(minutes / 60)
      
      if (hours > 0) return `${hours}:${(minutes % 60).toString().padStart(2, '0')}`
      return `${minutes}:00`
    }

    return {
      id: event.id,
      title: event.title,
      thumbnail: event.image_url || "/placeholder.svg",
      streamerName: event.organizer_name || `Organizer ${event.organizer_id}`,
      viewCount: streamType === "live" ? `${Math.floor(Math.random() * 1000)} watching` : `${Math.floor(Math.random() * 10000)} views`,
      category: event.category_name || "Event",
      isVerified: true, // You can add organizer verification logic
      duration: streamType === "recent" ? getDuration() : undefined,
      streamedTime: streamType === "recent" ? getRelativeTime(startTime) : undefined,
      waitingCount: streamType === "upcoming" ? `${Math.floor(Math.random() * 500)} waiting` : undefined,
      scheduledTime: streamType === "upcoming" ? getUpcomingTime(startTime) : undefined,
    }
  }

  // Fetch stream events based on type
  useEffect(() => {
    if (authLoading) return
    if (!token) return

    const fetchStreamEvents = async () => {
      setIsLoading(true)
      setFetchError(null)

      try {
        const endpoint = `http://localhost:3000/api/events/member`
        
        // Build query parameters based on stream type
        const queryParams: any = {}
        
        // Add global flag if needed
        if (pageType === "global") {
          queryParams.global = "true"
        }

        // Filter by live_status based on stream type
        switch (streamType) {
          case "live":
            queryParams.live_status = "active"
            break
          case "recent":
            queryParams.live_status = "ended"
            break
          case "upcoming":
            queryParams.live_status = "ready"
            break
        }

        console.log(`Fetching ${streamType} stream events:`, queryParams)

        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: queryParams
        })

        console.log(`${streamType} stream events response:`, response.data)
        
        const events = response.data.events || []
        
        // Filter events that have streaming capabilities (have live_stream_url or live_playback_url)
        const streamingEvents = events.filter((event: StreamEvent) => 
          event.live_stream_url || event.live_playback_url || event.live_status !== 'idle'
        )

        setStreamEvents(streamingEvents)
      } catch (err: any) {
        setFetchError(err.response?.data?.message || err.message)
        console.error(`Error fetching ${streamType} stream events:`, err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStreamEvents()
  }, [streamType, pageType, token, authLoading])

  // Loading state
  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-muted animate-pulse rounded-lg h-64" />
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (fetchError) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Failed to load stream events</p>
        </div>
      </div>
    )
  }

  // Empty state
  if (streamEvents.length === 0) {
    const emptyMessages = {
      live: "No live streams at the moment.",
      recent: "No recent streams available.",
      upcoming: "No upcoming streams scheduled."
    }

    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {emptyMessages[streamType]}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {streamEvents.map((event) => (
          <StreamCard
            key={event.id}
            stream={transformEventToStream(event)}
            type={streamType}
            onBookmark={(id) => console.log('Bookmark:', id)}
            onNotify={(id) => console.log('Notify:', id)}
          />
        ))}
      </div>
    </div>
  )
}