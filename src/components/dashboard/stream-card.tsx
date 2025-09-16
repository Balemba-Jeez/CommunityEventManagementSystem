import { Play, Bell } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface StreamCardProps {
  stream: {
    id: string
    title: string
    thumbnail: string
    streamerName?: string
    viewCount: string
    category?: string
    isVerified?: boolean
    duration?: string
    streamedTime?: string
    waitingCount?: string
    scheduledTime?: string
  }
  type: "live" | "recent" | "upcoming"
  isBookmarked?: boolean
  isNotified?: boolean
  onBookmark?: (id: string) => void
  onNotify?: (id: string) => void
}

export const StreamCard = ({
  stream,
  type,
  isBookmarked = false,
  isNotified = false,
  onBookmark,
  onNotify,
}: StreamCardProps) => {
  const getBadgeContent = () => {
    switch (type) {
      case "live":
        return <Badge className="bg-red-500 text-white font-bold text-xs px-2 py-1">🔴 LIVE</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500 text-white font-bold text-xs px-2 py-1">UPCOMING</Badge>
      default:
        return null
    }
  }

  const getActionButton = () => {
    switch (type) {
      case "live":
        return (
          <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
            <Play className="h-4 w-4 mr-1" fill="white" />
            Watch
          </Button>
        )
      case "upcoming":
        return (
          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-black">
            <Bell className="h-4 w-4 mr-1" />
            Notify Me
          </Button>
        )
      default:
        return (
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Play className="h-4 w-4 mr-1" fill="currentColor" />
            Watch
          </Button>
        )
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={stream.thumbnail || "/placeholder.svg"}
          alt={stream.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        <div className="absolute top-2 left-2">{getBadgeContent()}</div>

        {stream.duration && type === "recent" && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {stream.duration}
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          {getActionButton()}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 text-foreground">{stream.title}</h3>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{stream.streamerName}</span>
          {stream.isVerified && (
            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="space-x-2">
            {type === "live" && <span className="font-medium text-red-500">{stream.viewCount}</span>}
            {type === "recent" && (
              <>
                <span>{stream.viewCount}</span>
                <span>•</span>
                <span>{stream.streamedTime}</span>
              </>
            )}
            {type === "upcoming" && (
              <>
                <span className="text-blue-500 font-medium">{stream.waitingCount}</span>
                <span>•</span>
                <span>{stream.scheduledTime}</span>
              </>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {stream.category}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
