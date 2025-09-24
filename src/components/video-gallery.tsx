"use client"

import { Play, Calendar, User, Clock, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Video {
  id: number
  title: string
  eventId: number
  eventName: string
  uploadedBy: string
  uploadDate: string
  size: string
  duration: string
  thumbnail: string
  status: "completed" | "processing" | "error"
}

interface VideoGalleryProps {
  videos: Video[]
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const getStatusBadge = (status: Video["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
            Ready
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
            Processing
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="text-xs">
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-4 rounded-full bg-muted inline-block mb-4">
          <Play className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No videos found</h3>
        <p className="text-muted-foreground">Upload your first video to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="group hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-0">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                <Button
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white text-black"
                >
                  <Play className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2">{getStatusBadge(video.status)}</div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm text-foreground line-clamp-2 flex-1">{video.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{video.eventName}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{video.uploadedBy}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{video.uploadDate}</span>
                  </div>
                  <span>{video.size}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
