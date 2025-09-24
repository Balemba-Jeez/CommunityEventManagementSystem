"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useUpload } from "@/context/UploadContext"

interface Event {
  id: number
  name: string
  date: string
}

interface SimpleUploadModalProps {
  isOpen: boolean
  onClose: () => void
  events: Event[]
}

export function SimpleUploadModal({ isOpen, onClose, events }: SimpleUploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string>("")
  const { addUploads, startUpload, uploads } = useUpload()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("video/"))
      if (files.length > 0 && selectedEventId) {
        handleFilesAdded(files)
      }
    },
    [selectedEventId],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0 && selectedEventId) {
      handleFilesAdded(files)
    }
  }

  const handleFilesAdded = async (files: File[]) => {
    if (!selectedEventId) return

    // Add files to upload context
    await addUploads(files, selectedEventId)

    // Start uploads immediately
    const newUploads = uploads.slice(-files.length)
    for (const upload of newUploads) {
      startUpload(upload.id)
    }

    // Close modal - uploads continue in background
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Videos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Selection */}
          <div className="space-y-2">
            <Label htmlFor="event-select">Select Event</Label>
            <Select value={selectedEventId} onValueChange={setSelectedEventId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an event for your videos" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.name} - {event.date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">
                  Drop your video files here, or{" "}
                  <label className="text-primary hover:text-primary/80 cursor-pointer underline">
                    click to browse
                    <input
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={!selectedEventId}
                    />
                  </label>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supported files: MP4, MOV, AVI, WebM • Maximum size: 200MB
                </p>
                {!selectedEventId && <p className="text-sm text-red-500 mt-2">Please select an event first</p>}
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Files will start uploading immediately and continue in the background.</p>
            <p>You can close this modal and manage uploads from the main table.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
