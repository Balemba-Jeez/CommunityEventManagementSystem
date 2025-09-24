"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import axios from "axios"
import { useAuth } from "./AuthContext"

export interface UploadFile {
  id: string
  file: File
  title: string
  description: string
  eventId: string
  progress: number
  status: "pending" | "uploading" | "completed" | "error" | "paused"
  size: number
  duration?: number
  abortController?: AbortController
  videoUrl?: string
  thumbnailUrl?: string
  uploadedAt?: string
  error?: string
}

interface UploadContextType {
  uploads: UploadFile[]
  addUploads: (files: File[], eventId: string) => Promise<void>
  startUpload: (id: string) => Promise<void>
  pauseUpload: (id: string) => void
  resumeUpload: (id: string) => Promise<void>
  retryUpload: (id: string) => Promise<void>
  cancelUpload: (id: string) => void
  deleteUpload: (id: string) => void
  updateUploadField: (id: string, field: keyof UploadFile, value: any) => void
  retryAllFailed: () => Promise<void>
  pauseAllUploads: () => void
  resumeAllUploads: () => Promise<void>
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [uploads, setUploads] = useState<UploadFile[]>([])
  const { user } = useAuth()

  const getVideoMetadata = (file: File): Promise<{ size: number; duration: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        resolve({
          size: file.size,
          duration: video.duration,
        })
      }

      video.onerror = () => reject("Failed to load video metadata")
      video.src = URL.createObjectURL(file)
    })
  }

  const generateThumbnail = (file: File, seekTo = 2) => {
    return new Promise<Blob | null>((resolve, reject) => {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        video.currentTime = seekTo
      }
      video.onseeked = () => {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          "image/jpeg",
          0.8,
        )
      }
      video.onerror = (err) => reject(err)
      video.src = URL.createObjectURL(file)
    })
  }

  const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/\s+/g, "_").replace(/[^\w.-]/g, "")
  }

  const uploadFileWithProgress = async (file: File, onProgress: (percent: number) => void, signal?: AbortSignal) => {
    const sanitizedFileName = sanitizeFileName(file.name)
    const filePath = `videos/${Date.now()}-${sanitizedFileName}`

    // Mock upload with progress simulation
    return new Promise<{ videoUrl: string; thumbnailUrl: string }>((resolve, reject) => {
      let progress = 0
      const interval = setInterval(() => {
        if (signal?.aborted) {
          clearInterval(interval)
          reject(new Error("Upload cancelled"))
          return
        }

        progress += Math.random() * 15
        if (progress > 100) progress = 100
        onProgress(Math.round(progress))

        if (progress >= 100) {
          clearInterval(interval)
          resolve({
            videoUrl: `/placeholder.svg?height=400&width=600&query=video-${file.name}`,
            thumbnailUrl: `/placeholder.svg?height=200&width=300&query=thumbnail-${file.name}`,
          })
        }
      }, 200)
    })
  }

  const addUploads = useCallback(async (files: File[], eventId: string) => {
    const newUploads: UploadFile[] = []

    for (const file of files) {
      try {
        const { size, duration } = await getVideoMetadata(file)

        const upload: UploadFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: "",
          eventId,
          progress: 0,
          status: "pending",
          size,
          duration,
        }

        newUploads.push(upload)
      } catch (err) {
        console.error("Metadata extraction failed:", err)
      }
    }

    setUploads((prev) => [...prev, ...newUploads])
  }, [])

  const updateUploadField = useCallback((id: string, field: keyof UploadFile, value: any) => {
    setUploads((prev) => prev.map((upload) => (upload.id === id ? { ...upload, [field]: value } : upload)))
  }, [])

  const startUpload = useCallback(
    async (id: string) => {
      const upload = uploads.find((u) => u.id === id)
      if (!upload) return

      const controller = new AbortController()
      updateUploadField(id, "status", "uploading")
      updateUploadField(id, "abortController", controller)
      updateUploadField(id, "progress", 0)

      try {
        const { videoUrl, thumbnailUrl } = await uploadFileWithProgress(
          upload.file,
          (progress) => updateUploadField(id, "progress", progress),
          controller.signal,
        )

        updateUploadField(id, "videoUrl", videoUrl)
        updateUploadField(id, "thumbnailUrl", thumbnailUrl)
        updateUploadField(id, "status", "completed")
        updateUploadField(id, "uploadedAt", new Date().toISOString())
        updateUploadField(id, "progress", 100)
      } catch (err) {
        if (axios.isCancel(err) || err.message === "Upload cancelled") {
          updateUploadField(id, "status", "pending")
        } else {
          updateUploadField(id, "status", "error")
          updateUploadField(id, "error", err.message)
        }
      }
    },
    [uploads, updateUploadField],
  )

  const pauseUpload = useCallback(
    (id: string) => {
      const upload = uploads.find((u) => u.id === id)
      if (upload?.abortController && upload.status === "uploading") {
        upload.abortController.abort()
        updateUploadField(id, "status", "paused")
      }
    },
    [uploads, updateUploadField],
  )

  const resumeUpload = useCallback(
    async (id: string) => {
      const upload = uploads.find((u) => u.id === id)
      if (upload && upload.status === "paused") {
        await startUpload(id)
      }
    },
    [uploads, startUpload],
  )

  const retryUpload = useCallback(
    async (id: string) => {
      const upload = uploads.find((u) => u.id === id)
      if (upload && upload.status === "error") {
        updateUploadField(id, "progress", 0)
        updateUploadField(id, "error", undefined)
        await startUpload(id)
      }
    },
    [uploads, startUpload, updateUploadField],
  )

  const cancelUpload = useCallback(
    (id: string) => {
      const upload = uploads.find((u) => u.id === id)
      if (upload?.abortController) {
        upload.abortController.abort()
      }
      updateUploadField(id, "status", "pending")
      updateUploadField(id, "progress", 0)
    },
    [uploads, updateUploadField],
  )

  const deleteUpload = useCallback(
    (id: string) => {
      const upload = uploads.find((u) => u.id === id)
      if (upload?.abortController) {
        upload.abortController.abort()
      }
      setUploads((prev) => prev.filter((u) => u.id !== id))
    },
    [uploads],
  )

  const retryAllFailed = useCallback(async () => {
    const failedUploads = uploads.filter((u) => u.status === "error")
    for (const upload of failedUploads) {
      await retryUpload(upload.id)
    }
  }, [uploads, retryUpload])

  const pauseAllUploads = useCallback(() => {
    const uploadingFiles = uploads.filter((u) => u.status === "uploading")
    uploadingFiles.forEach((upload) => pauseUpload(upload.id))
  }, [uploads, pauseUpload])

  const resumeAllUploads = useCallback(async () => {
    const pausedFiles = uploads.filter((u) => u.status === "paused")
    for (const upload of pausedFiles) {
      await resumeUpload(upload.id)
    }
  }, [uploads, resumeUpload])

  return (
    <UploadContext.Provider
      value={{
        uploads,
        addUploads,
        startUpload,
        pauseUpload,
        resumeUpload,
        retryUpload,
        cancelUpload,
        deleteUpload,
        updateUploadField,
        retryAllFailed,
        pauseAllUploads,
        resumeAllUploads,
      }}
    >
      {children}
    </UploadContext.Provider>
  )
}

export function useUpload() {
  const context = useContext(UploadContext)
  if (context === undefined) {
    throw new Error("useUpload must be used within an UploadProvider")
  }
  return context
}
