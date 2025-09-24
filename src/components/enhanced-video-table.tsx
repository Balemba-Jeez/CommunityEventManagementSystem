"use client"
import {
  Play,
  MoreVertical,
  Pause,
  RotateCcw,
  StopCircle,
  Trash2,
  Download,
  Share,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { useUpload } from "@/context/UploadContext"

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

interface EnhancedVideoTableProps {
  videos: Video[]
  onVideoClick?: (video: Video) => void
}

export function EnhancedVideoTable({ videos, onVideoClick }: EnhancedVideoTableProps) {
  const {
    uploads,
    pauseUpload,
    resumeUpload,
    retryUpload,
    cancelUpload,
    deleteUpload,
    retryAllFailed,
    pauseAllUploads,
    resumeAllUploads,
  } = useUpload()



  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusBadge = (status: string, uploadData?: any) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ready
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            {uploadData?.status === "uploading"
              ? "Uploading"
              : uploadData?.status === "paused"
                ? "Paused"
                : "Processing"}
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return null
    }
  }

  const getUploadActions = (uploadData: any) => {
    const actions = []

    if (uploadData.status === "uploading") {
      actions.push(
        <Button key="pause" variant="ghost" size="sm" onClick={() => pauseUpload(uploadData.id)} title="Pause upload">
          <Pause className="h-4 w-4" />
        </Button>,
      )
      actions.push(
        <Button
          key="cancel"
          variant="ghost"
          size="sm"
          onClick={() => cancelUpload(uploadData.id)}
          title="Cancel upload"
        >
          <StopCircle className="h-4 w-4" />
        </Button>,
      )
    }

    if (uploadData.status === "paused") {
      actions.push(
        <Button
          key="resume"
          variant="ghost"
          size="sm"
          onClick={() => resumeUpload(uploadData.id)}
          title="Resume upload"
        >
          <Play className="h-4 w-4" />
        </Button>,
      )
    }

    if (uploadData.status === "error") {
      actions.push(
        <Button key="retry" variant="ghost" size="sm" onClick={() => retryUpload(uploadData.id)} title="Retry upload">
          <RotateCcw className="h-4 w-4" />
        </Button>,
      )
    }

    actions.push(
      <Button key="delete" variant="ghost" size="sm" onClick={() => deleteUpload(uploadData.id)} title="Delete upload">
        <Trash2 className="h-4 w-4" />
      </Button>,
    )

    return actions
  }

  const allItems = [
    ...uploads.map((upload) => ({
      id: `upload-${upload.id}`,
      title: upload.title,
      eventId: Number.parseInt(upload.eventId),
      eventName: "Event Name", // Would come from event lookup
      uploadCreateDate: upload.uploadedAt ? new Date(upload.uploadedAt).toLocaleDateString() : "Uploading...",
      uploadModifyDate: upload.uploadedAt ? new Date(upload.uploadedAt).toLocaleDateString() : "Uploading...",
      size: formatFileSize(upload.size),
      duration: upload.duration ? formatDuration(upload.duration) : "--",
      thumbnail: upload.thumbnailUrl || "/video-production-setup.png",
      status: upload.status === "completed" ? "completed" : upload.status === "error" ? "error" : "processing",
      type: "video",
      isUpload: true,
      uploadData: upload,
    })),
    ...videos.map((video) => ({
      ...video,
      id: `video-${video.id}`,
      isUpload: false,
    })),
  ]



  const hasUploading = uploads.some((u) => u.status === "uploading")
  const hasPaused = uploads.some((u) => u.status === "paused")
  const hasErrors = uploads.some((u) => u.status === "error")

  if (allItems.length === 0) {
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
    <div className="space-y-4">
      {(hasUploading || hasPaused || hasErrors) && (
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">Upload Controls:</span>
          {hasUploading && (
            <Button variant="outline" size="sm" onClick={pauseAllUploads}>
              <Pause className="h-4 w-4 mr-1" />
              Pause All
            </Button>
          )}
          {hasPaused && (
            <Button variant="outline" size="sm" onClick={resumeAllUploads}>
              <Play className="h-4 w-4 mr-1" />
              Resume All
            </Button>
          )}
          {hasErrors && (
            <Button variant="outline" size="sm" onClick={retryAllFailed}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Retry All Failed
            </Button>
          )}
        </div>
      )}

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
            {allItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() =>
                        item.type === "video" &&
                        item.status === "completed" &&
                        !item.isUpload &&
                        onVideoClick?.(item as Video)
                      }
                    >
                      <img
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.type === "video" && item.status === "completed" && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`font-medium text-sm ${
                          item.type === "video" && item.status === "completed" && !item.isUpload
                            ? "cursor-pointer hover:text-primary transition-colors"
                            : ""
                        }`}
                        onClick={() =>
                          item.type === "video" &&
                          item.status === "completed" &&
                          !item.isUpload &&
                          onVideoClick?.(item as Video)
                        }
                      >
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status, item.uploadData)}
                        {item.duration && <span className="text-xs text-muted-foreground">{item.duration}</span>}
                      </div>
                      {item.isUpload &&
                        item.uploadData &&
                        (item.uploadData.status === "uploading" || item.uploadData.status === "paused") && (
                          <div className="mt-1 w-32">
                            <Progress value={item.uploadData.progress} className="h-1" />
                            <span className="text-xs text-muted-foreground">{item.uploadData.progress}%</span>
                          </div>
                        )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{item.size}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{item.uploadCreateDate}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{item.uploadModifyDate}</span>
                </TableCell>
                <TableCell>
                  {item.isUpload && item.uploadData ? (
                    <div className="flex items-center gap-1">{getUploadActions(item.uploadData)}</div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#9fa5f9]">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {item.type === "video" && item.status === "completed" && (
                          <DropdownMenuItem onClick={() => onVideoClick?.(item as Video)}>
                            <Play className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
