"use client"

import { Play, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Video {
  id: number
  title: string
  eventId: number
  eventName: string
  uploadCreateDate: string
  uploadModifyDate: string
  size: string
  duration: string
  thumbnail: string
  status: "completed" | "processing" | "error"
  type: string
}

interface VideoTableProps {
  videos: Video[]
  onVideoClick?: (video: Video) => void
}

export function VideoTable({ videos, onVideoClick }: VideoTableProps) {
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
        <h3 className="text-lg font-medium text-foreground mb-2">No files found</h3>
        <p className="text-muted-foreground">Upload your first file to get started</p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>File Size</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Date modified</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id} className="hover:bg-muted/50">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div
                    className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => video.type === "video" && video.status === "completed" && onVideoClick?.(video)}
                  >
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {video.type === "video" && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`font-medium text-sm ${
                        video.type === "video" && video.status === "completed"
                          ? "cursor-pointer hover:text-primary transition-colors"
                          : ""
                      }`}
                      onClick={() => video.type === "video" && video.status === "completed" && onVideoClick?.(video)}
                    >
                      {video.title}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(video.status)}
                      {video.duration && <span className="text-xs text-muted-foreground">{video.duration}</span>}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{video.size}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{video.uploadCreateDate}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{video.uploadModifyDate}</span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#9fa5f9]">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {video.type === "video" && video.status === "completed" && (
                      <DropdownMenuItem onClick={() => onVideoClick?.(video)}>
                        <Play className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
