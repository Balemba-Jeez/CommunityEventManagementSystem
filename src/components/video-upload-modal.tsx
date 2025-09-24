

// "use client"

// import type React from "react"
// import { useState, useCallback, useEffect } from "react"
// import { X, Upload, Video, AlertCircle, CheckCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Progress } from "@/components/ui/progress"
// import { Card, CardContent } from "@/components/ui/card"
// import supabase from "../lib/superbaseClient"
// import axios from "axios"
// import { useAuth } from "@/context/AuthContext";

// interface Event {
//   id: number
//   name: string
//   date: string
// }

// interface VideoUploadModalProps {
//   isOpen: boolean
//   onClose: () => void
//   events: Event[]
// }

// interface UploadFile {
//   file: File
//   id: string
//   progress: number
//   status: "pending" | "uploading" | "completed" | "error"
//   title: string
//   description: string
//   eventId: string
//   size?: number
//   duration?: number
//   abortController?: AbortController;
// }

// export function VideoUploadModal({ isOpen, onClose, events }: VideoUploadModalProps) {
//   const [dragActive, setDragActive] = useState(false)
//   const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
//   const [selectedEventId, setSelectedEventId] = useState<string>("")
//   const { user } = useAuth();

//   useEffect(() => {
//     setUploadFiles(prev =>
//       prev.map(file =>
//         file.status === "pending" ? { ...file, eventId: selectedEventId } : file
//       )
//     )
//   }, [selectedEventId])

//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true)
//     } else if (e.type === "dragleave") {
//       setDragActive(false)
//     }
//   }, [])

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setDragActive(false)
//     const files = Array.from(e.dataTransfer.files).filter((file) =>
//       file.type.startsWith("video/")
//     )
//     if (files.length > 0) {
//       addFiles(files)
//     }
//   }, [])

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
//     addFiles(files)
//   }

// const getVideoMetadata = (file: File): Promise<{ size: number; duration: number }> => {
//   return new Promise((resolve, reject) => {
//     const video = document.createElement("video");
//     video.preload = "metadata";

//     video.onloadedmetadata = () => {
//       window.URL.revokeObjectURL(video.src);
//       resolve({
//         size: file.size, // bytes
//         duration: video.duration, // seconds
//       });
//     };

//     video.onerror = () => reject("Failed to load video metadata");
//     video.src = URL.createObjectURL(file);
//   });
// };

// const addFiles = (files: File[]) => {
//   files.forEach(async (file) => {
//     try {
//       const { size, duration } = await getVideoMetadata(file);

//       const newFile: UploadFile = {
//         file,
//         id: Math.random().toString(36).substr(2, 9),
//         progress: 0,
//         status: "pending",
//         title: file.name.replace(/\.[^/.]+$/, ""),
//         description: "",
//         eventId: selectedEventId,
//         size,
//         duration,
//       };

//       setUploadFiles((prev) => [...prev, newFile]);
//     } catch (err) {
//       console.error("Metadata extraction failed:", err);
//     }
//   });
// };


//   const updateFileField = (id: string, field: keyof UploadFile, value: any) => {
//     setUploadFiles((prev) =>
//       prev.map((file) => (file.id === id ? { ...file, [field]: value } : file))
//     )
//   }

//   const removeFile = (id: string) => {
//     const file = uploadFiles.find(f => f.id === id);
//     if (file?.abortController) {
//       file.abortController.abort(); // cancel Axios request
//     }
//     setUploadFiles((prev) => prev.filter((file) => file.id !== id));
//   };

//   const generateThumbnail = (file: File, seekTo = 2) => {
//     return new Promise<Blob | null>((resolve, reject) => {
//       const video = document.createElement("video");
//       video.preload = "metadata";
//       video.onloadedmetadata = () => {
//         video.currentTime = seekTo;
//       };
//       video.onseeked = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         canvas.toBlob((blob) => {
//           resolve(blob);
//         }, "image/jpeg", 0.8);
//       };
//       video.onerror = (err) => reject(err);
//       video.src = URL.createObjectURL(file);
//     });
//   };

//   const sanitizeFileName = (fileName: string) => {
//     return fileName
//       .replace(/\s+/g, "_")
//       .replace(/[^\w.-]/g, "");
//   };


// const uploadFileWithProgress = async (
//   file: File,
//   onProgress: (percent: number) => void,
//   signal?: AbortSignal
// ) => {
//   const sanitizedFileName = sanitizeFileName(file.name);
//   const filePath = `videos/${Date.now()}-${sanitizedFileName}`;

//   // 1. Ask Supabase for a signed upload URL
//   const { data: signedUrlData, error: signedUrlError } = await supabase.storage
//     .from("video-posts")
//     .createSignedUploadUrl(filePath);

//   if (signedUrlError || !signedUrlData) throw signedUrlError;

//   // 2. Use Axios PUT with progress tracking
//   await axios.put(signedUrlData.signedUrl, file, {
//     headers: { "Content-Type": file.type },
//     onUploadProgress: (progressEvent) => {
//       const percentCompleted = Math.round(
//         (progressEvent.loaded * 100) / (progressEvent.total || file.size)
//       );
//       onProgress(percentCompleted);
//     },
//     signal,
//   });

//   // 3. Get the public URL for the uploaded video
//   const { data: videoData } = supabase.storage
//     .from("video-posts")
//     .getPublicUrl(filePath);
//   const videoUrl = videoData.publicUrl;

//   // 4. Generate and upload a thumbnail
//   const thumbnailBlob = await generateThumbnail(file);
//   let thumbnailUrl = null;
//   if (thumbnailBlob) {
//     const thumbPath = `thumbnails/${Date.now()}-${sanitizedFileName}.jpg`;

//     const { error: thumbError } = await supabase.storage
//       .from("video-posts")
//       .upload(thumbPath, thumbnailBlob, { contentType: "image/jpeg" });

//     if (thumbError) throw thumbError;

//     const { data: thumbData } = supabase.storage
//       .from("video-posts")
//       .getPublicUrl(thumbPath);
//     thumbnailUrl = thumbData.publicUrl;
//   }

//   return { videoUrl, thumbnailUrl };
// };



//   const uploadToSupabase = async (fileId: string) => {
//     const uploadFile = uploadFiles.find((f) => f.id === fileId);
//     if (!uploadFile) return;
//     const controller = new AbortController();
//     updateFileField(fileId, "status", "uploading");
//     updateFileField(fileId, "abortController", controller);

//     let clipId;

//     // try {
//     //   const { videoUrl, thumbnailUrl } = await uploadFileWithProgress(uploadFile.file, (progress) => {
//     //     updateFileField(fileId, "progress", progress);
//     //   }, controller.signal);

//     //   updateFileField(fileId, "progress", 100);
      

//     //   await axios.post("http://localhost:3000/api/clips", {
//     //     title: uploadFile.title,
//     //     description: uploadFile.description,
//     //     content: videoUrl,
//     //     thumbnail: thumbnailUrl,
//     //     event_id: uploadFile.eventId,
//     //     user_id: 1,
//     //   });

//     //   updateFileField(fileId, "status", "completed");
//     // } catch (err) {
//     //   if (axios.isCancel(err)) {
//     //     console.log("Upload canceled by user");
//     //     updateFileField(fileId, "status", "pending");
//     //   } else {
//     //     console.error("Upload failed", err);
//     //     updateFileField(fileId, "status", "error");
//     //   }
//     // }
//     try {
//     // 1️⃣ POST clip with status 'processing'
//     const postResponse = await axios.post("http://localhost:3000/api/clips", {
//       title: uploadFile.title,
//       description: uploadFile.description,
//       content: "",           // Empty for now; we’ll update after upload
//       thumbnail: null,      // Empty for now
//       event_id: uploadFile.eventId,
//       user_id: user.id,
//       status: "processing",  // This is new: initial status
//       size: uploadFile.size,
//       duration: uploadFile.duration,
//     });

//     clipId = postResponse.data.id;

//     // 2️⃣ Upload the file to Supabase
//     const { videoUrl, thumbnailUrl } = await uploadFileWithProgress(
//       uploadFile.file,
//       (progress) => updateFileField(fileId, "progress", progress),
//       controller.signal
//     );

//     // 3️⃣ PATCH clip to completed with URLs
//     await axios.patch(`http://localhost:3000/api/clips/${clipId}`, {
//       status: "completed",
//       content: videoUrl,
//       thumbnail: thumbnailUrl,
//     });

//     updateFileField(fileId, "progress", 100);
//     updateFileField(fileId, "status", "completed");
//   } catch (err) {
//     if (axios.isCancel(err)) {
//       console.log("Upload canceled by user");
//       if (clipId) {
//         await axios.patch(`http://localhost:3000/api/clips/${clipId}`, {
//           status: "error",
//         });
//       }
//       updateFileField(fileId, "status", "pending");
//     } else {
//       console.error("Upload failed", err);
//       if (clipId) {
//         await axios.patch(`http://localhost:3000/api/clips/${clipId}`, {
//           status: "error",
//         });
//       }
//       updateFileField(fileId, "status", "error");
//     }
//   }

//   };

//   const startUpload = async () => {
//     const pendingFiles = uploadFiles.filter((file) => file.status === "pending")
//     const uploadPromises = pendingFiles.map((file) => uploadToSupabase(file.id))
//     await Promise.all(uploadPromises)
//   }

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes"
//     const k = 1024
//     const sizes = ["Bytes", "KB", "MB", "GB"]
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
//   }

//   const getStatusIcon = (status: UploadFile["status"]) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="h-4 w-4 text-green-600" />
//       case "error":
//         return <AlertCircle className="h-4 w-4 text-red-600" />
//       case "uploading":
//         return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
//       default:
//         return <Video className="h-4 w-4 text-muted-foreground" />
//     }
//   }

//   const allCompleted = uploadFiles.length > 0 && uploadFiles.every((file) => file.status === "completed")
//   const hasUploading = uploadFiles.some((file) => file.status === "uploading")

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Upload className="h-5 w-5 text-primary" /> Upload Videos
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Event Selection */}
//           <div className="space-y-2">
//             <Label htmlFor="event-select">Select Event</Label>
//             <Select value={selectedEventId} onValueChange={setSelectedEventId}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Choose an event for your videos" />
//               </SelectTrigger>
//               <SelectContent>
//                 {events.map((event) => (
//                   <SelectItem key={event.id} value={event.id.toString()}>
//                     {event.name} - {event.date}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Upload Area */}
//           <div
//             className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//               dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
//             }`}
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           >
//             <div className="flex flex-col items-center gap-4">
//               <div className="p-4 rounded-full bg-primary/10">
//                 <Upload className="h-8 w-8 text-primary" />
//               </div>
//               <div>
//                 <p className="text-lg font-medium text-foreground">
//                   Drop your video files here, or{" "}
//                   <label className="text-primary hover:text-primary/80 cursor-pointer underline">
//                     click to browse
//                     <input type="file" multiple accept="video/*" onChange={handleFileSelect} className="hidden" />
//                   </label>
//                 </p>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Supported files: MP4, MOV, AVI, WebM • Maximum size: 200MB
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* File List */}
//           {uploadFiles.length > 0 && (
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">Files to Upload ({uploadFiles.length})</h3>
//                 <div className="flex gap-2">
//                   <Button variant="outline" size="sm" onClick={() => setUploadFiles([])} disabled={hasUploading}>
//                     Clear All
//                   </Button>
//                   <Button
//                     onClick={startUpload}
//                     disabled={hasUploading || allCompleted || !selectedEventId}
//                     className="bg-primary hover:bg-primary/90"
//                   >
//                     {hasUploading ? "Uploading..." : allCompleted ? "All Uploaded" : "Start Upload"}
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {uploadFiles.map((uploadFile) => (
//                   <Card key={uploadFile.id} className="p-4">
//                     <CardContent className="p-0">
//                       <div className="flex items-start gap-4">
//                         <div className="flex-shrink-0 mt-1">{getStatusIcon(uploadFile.status)}</div>
//                         <div className="flex-1 space-y-3">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <p className="font-medium text-sm">{uploadFile.file.name}</p>
//                               <p className="text-xs text-muted-foreground">{formatFileSize(uploadFile.file.size)}</p>
//                             </div>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => removeFile(uploadFile.id)}
//                               disabled={uploadFile.status === "uploading"}
//                             >
//                               <X className="h-4 w-4" />
//                             </Button>
//                           </div>

//                           {uploadFile.status === "uploading" && (
//                             <div className="space-y-2">
//                               <Progress value={uploadFile.progress} className="h-2" />
//                               <p className="text-xs text-muted-foreground">
//                                 Uploading... {uploadFile.progress}%
//                               </p>
//                             </div>
//                           )}

//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                             <div className="space-y-1">
//                               <Label htmlFor={`title-${uploadFile.id}`} className="text-xs">
//                                 Video Title
//                               </Label>
//                               <Input
//                                 id={`title-${uploadFile.id}`}
//                                 value={uploadFile.title}
//                                 onChange={(e) => updateFileField(uploadFile.id, "title", e.target.value)}
//                                 placeholder="Enter video title"
//                                 disabled={uploadFile.status === "uploading"}
//                                 className="text-sm"
//                               />
//                             </div>
//                             <div className="space-y-1">
//                               <Label htmlFor={`description-${uploadFile.id}`} className="text-xs">
//                                 Description
//                               </Label>
//                               <Textarea
//                                 id={`description-${uploadFile.id}`}
//                                 value={uploadFile.description}
//                                 onChange={(e) => updateFileField(uploadFile.id, "description", e.target.value)}
//                                 placeholder="Brief description"
//                                 disabled={uploadFile.status === "uploading"}
//                                 className="text-sm min-h-[60px]"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             {/* <Button variant="outline" onClick={onClose} disabled={hasUploading}>
//               {allCompleted ? "Close" : "Cancel"}
//             </Button> */}
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   // Abort all ongoing uploads
//                   uploadFiles.forEach(file => file.abortController?.abort());

//                   // Optionally reset uploads
//                   setUploadFiles([]);

//                   // Close modal
//                   onClose();
//                 }}
//               >
//                 {allCompleted ? "Close" : "Cancel"}
//             </Button>

//             {allCompleted && (
//               <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
//                 Done
//               </Button>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { X, Upload, Video, AlertCircle, CheckCircle, RotateCcw, Play, Pause, StopCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import supabase from "../lib/superbaseClient"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

interface Event {
  id: number
  name: string
  datetime: string
  date: string
}

interface VideoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  events: Event[]
}

interface UploadFile {
  file: File
  id: string
  progress: number
  status: "pending" | "uploading" | "completed" | "error" | "paused"
  title: string
  description: string
  eventId: string
  size?: number
  duration?: number
  abortController?: AbortController
  selected?: boolean // Added for multi-file selection
}

export function VideoUploadModal({ isOpen, onClose, events }: VideoUploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [selectedEventId, setSelectedEventId] = useState<string>("")
  const [selectAll, setSelectAll] = useState(false) // Added for select all functionality
  const { user } = useAuth()

  useEffect(() => {
    setUploadFiles((prev) =>
      prev.map((file) => (file.status === "pending" ? { ...file, eventId: selectedEventId } : file)),
    )
  }, [selectedEventId])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("video/"))
    if (files.length > 0) {
      addFiles(files)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    addFiles(files)
  }

  const getVideoMetadata = (file: File): Promise<{ size: number; duration: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        resolve({
          size: file.size, // bytes
          duration: video.duration, // seconds
        })
      }

      video.onerror = () => reject("Failed to load video metadata")
      video.src = URL.createObjectURL(file)
    })
  }

  const addFiles = (files: File[]) => {
    files.forEach(async (file) => {
      try {
        const { size, duration } = await getVideoMetadata(file)

        const newFile: UploadFile = {
          file,
          id: Math.random().toString(36).substr(2, 9),
          progress: 0,
          status: "pending",
          title: file.name.replace(/\.[^/.]+$/, ""),
          description: "",
          eventId: selectedEventId,
          size,
          duration,
        }

        setUploadFiles((prev) => [...prev, newFile])
      } catch (err) {
        console.error("Metadata extraction failed:", err)
      }
    })
  }

  const updateFileField = (id: string, field: keyof UploadFile, value: any) => {
    setUploadFiles((prev) => prev.map((file) => (file.id === id ? { ...file, [field]: value } : file)))
  }

  const removeFile = (id: string) => {
    const file = uploadFiles.find((f) => f.id === id)
    if (file?.abortController) {
      file.abortController.abort() // cancel Axios request
    }
    setUploadFiles((prev) => prev.filter((file) => file.id !== id))
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
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
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

    // 1. Ask Supabase for a signed upload URL
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("video-posts")
      .createSignedUploadUrl(filePath)

    if (signedUrlError || !signedUrlData) throw signedUrlError

    // 2. Use Axios PUT with progress tracking
    await axios.put(signedUrlData.signedUrl, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || file.size))
        onProgress(percentCompleted)
      },
      signal,
    })

    // 3. Get the public URL for the uploaded video
    const { data: videoData } = supabase.storage.from("video-posts").getPublicUrl(filePath)
    const videoUrl = videoData.publicUrl

    // 4. Generate and upload a thumbnail
    const thumbnailBlob = await generateThumbnail(file)
    let thumbnailUrl = null
    if (thumbnailBlob) {
      const thumbPath = `thumbnails/${Date.now()}-${sanitizedFileName}.jpg`

      const { error: thumbError } = await supabase.storage
        .from("video-posts")
        .upload(thumbPath, thumbnailBlob, { contentType: "image/jpeg" })

      if (thumbError) throw thumbError

      const { data: thumbData } = supabase.storage.from("video-posts").getPublicUrl(thumbPath)
      thumbnailUrl = thumbData.publicUrl
    }

    return { videoUrl, thumbnailUrl }
  }

  const uploadToSupabase = async (fileId: string) => {
    const uploadFile = uploadFiles.find((f) => f.id === fileId)
    if (!uploadFile) return
    const controller = new AbortController()
    updateFileField(fileId, "status", "uploading")
    updateFileField(fileId, "abortController", controller)

    let clipId

    try {
      // 1️⃣ POST clip with status 'processing'
      const mockResponse = {
        data: { id: Math.random().toString(36).substr(2, 9) },
      }
      clipId = mockResponse.data.id

      // 2️⃣ Upload the file to Supabase (mock)
      const { videoUrl, thumbnailUrl } = await uploadFileWithProgress(
        uploadFile.file,
        (progress) => updateFileField(fileId, "progress", progress),
        controller.signal,
      )

      // 3️⃣ Mock PATCH clip to completed with URLs
      console.log(`[v0] Mock API: Updated clip ${clipId} with URLs`, { videoUrl, thumbnailUrl })

      updateFileField(fileId, "progress", 100)
      updateFileField(fileId, "status", "completed")
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Upload canceled by user")
        updateFileField(fileId, "status", "pending")
      } else {
        console.error("Upload failed", err)
        updateFileField(fileId, "status", "error")
      }
    }
  }

  const startUpload = async () => {
    const pendingFiles = uploadFiles.filter((file) => file.status === "pending")
    const uploadPromises = pendingFiles.map((file) => uploadToSupabase(file.id))
    await Promise.all(uploadPromises)
  }

  const getSelectedFiles = () => uploadFiles.filter((file) => file.selected)
  const getFailedFiles = () => uploadFiles.filter((file) => file.status === "error")
  const getUploadingFiles = () => uploadFiles.filter((file) => file.status === "uploading")
  const getPausedFiles = () => uploadFiles.filter((file) => file.status === "paused")

  const toggleFileSelection = (id: string) => {
    setUploadFiles((prev) => prev.map((file) => (file.id === id ? { ...file, selected: !file.selected } : file)))
  }

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setUploadFiles((prev) => prev.map((file) => ({ ...file, selected: newSelectAll })))
  }

  const retryFile = async (fileId: string) => {
    const file = uploadFiles.find((f) => f.id === fileId)
    if (!file || file.status !== "error") return

    updateFileField(fileId, "status", "pending")
    updateFileField(fileId, "progress", 0)
    await uploadToSupabase(fileId)
  }

  const retryAllFailed = async () => {
    const failedFiles = getFailedFiles()
    for (const file of failedFiles) {
      updateFileField(file.id, "status", "pending")
      updateFileField(file.id, "progress", 0)
    }

    const uploadPromises = failedFiles.map((file) => uploadToSupabase(file.id))
    await Promise.all(uploadPromises)
  }

  const pauseFile = (fileId: string) => {
    const file = uploadFiles.find((f) => f.id === fileId)
    if (file?.abortController && file.status === "uploading") {
      file.abortController.abort()
      updateFileField(fileId, "status", "paused")
    }
  }

  const resumeFile = async (fileId: string) => {
    const file = uploadFiles.find((f) => f.id === fileId)
    if (file && file.status === "paused") {
      updateFileField(fileId, "status", "pending")
      await uploadToSupabase(fileId)
    }
  }

  const pauseAllUploads = () => {
    const uploadingFiles = getUploadingFiles()
    uploadingFiles.forEach((file) => pauseFile(file.id))
  }

  const resumeAllUploads = async () => {
    const pausedFiles = getPausedFiles()
    const uploadPromises = pausedFiles.map((file) => {
      updateFileField(file.id, "status", "pending")
      return uploadToSupabase(file.id)
    })
    await Promise.all(uploadPromises)
  }

  const removeSelectedFiles = () => {
    const selectedFiles = getSelectedFiles()
    selectedFiles.forEach((file) => {
      if (file.abortController) {
        file.abortController.abort()
      }
    })
    setUploadFiles((prev) => prev.filter((file) => !file.selected))
    setSelectAll(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "uploading":
        return <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      case "paused": // Added paused status icon
        return <Pause className="h-4 w-4 text-yellow-600" />
      default:
        return <Video className="h-4 w-4 text-muted-foreground" />
    }
  }

  const allCompleted = uploadFiles.length > 0 && uploadFiles.every((file) => file.status === "completed")
  const hasUploading = uploadFiles.some((file) => file.status === "uploading")
  const hasErrors = uploadFiles.some((file) => file.status === "error") // Added error detection
  const hasPaused = uploadFiles.some((file) => file.status === "paused") // Added paused detection
  const hasSelected = uploadFiles.some((file) => file.selected) // Added selection detection

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" /> Upload Videos
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
                    {event.name} - {event.datetime}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
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
                    <input type="file" multiple accept="video/*" onChange={handleFileSelect} className="hidden" />
                  </label>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supported files: MP4, MOV, AVI, WebM • Maximum size: 200MB
                </p>
              </div>
            </div>
          </div>

          {/* File List */}
          {uploadFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-medium">Files to Upload ({uploadFiles.length})</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-muted-foreground">Select All</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {hasSelected && (
                    <Button variant="outline" size="sm" onClick={removeSelectedFiles}>
                      Remove Selected
                    </Button>
                  )}
                  {hasErrors && (
                    <Button variant="outline" size="sm" onClick={retryAllFailed}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Retry All Failed
                    </Button>
                  )}
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
                  <Button variant="outline" size="sm" onClick={() => setUploadFiles([])} disabled={hasUploading}>
                    Clear All
                  </Button>
                  <Button
                    onClick={startUpload}
                    disabled={hasUploading || allCompleted || !selectedEventId}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {hasUploading ? "Uploading..." : allCompleted ? "All Uploaded" : "Start Upload"}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {uploadFiles.map((uploadFile) => (
                  <Card key={uploadFile.id} className="p-4">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={uploadFile.selected || false}
                          onChange={() => toggleFileSelection(uploadFile.id)}
                          className="mt-1 rounded border-gray-300"
                        />
                        <div className="flex-shrink-0 mt-1">{getStatusIcon(uploadFile.status)}</div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{uploadFile.file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(uploadFile.file.size)}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {uploadFile.status === "error" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => retryFile(uploadFile.id)}
                                  title="Retry upload"
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              )}
                              {uploadFile.status === "uploading" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => pauseFile(uploadFile.id)}
                                  title="Pause upload"
                                >
                                  <Pause className="h-4 w-4" />
                                </Button>
                              )}
                              {uploadFile.status === "paused" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => resumeFile(uploadFile.id)}
                                  title="Resume upload"
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              )}
                              {(uploadFile.status === "uploading" || uploadFile.status === "paused") && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(uploadFile.id)}
                                  title="Cancel upload"
                                >
                                  <StopCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(uploadFile.id)}
                                disabled={uploadFile.status === "uploading"}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {(uploadFile.status === "uploading" || uploadFile.status === "paused") && (
                            <div className="space-y-2">
                              <Progress value={uploadFile.progress} className="h-2" />
                              <p className="text-xs text-muted-foreground">
                                {uploadFile.status === "paused" ? "Paused" : "Uploading"} - {uploadFile.progress}%
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <Label htmlFor={`title-${uploadFile.id}`} className="text-xs">
                                Video Title
                              </Label>
                              <Input
                                id={`title-${uploadFile.id}`}
                                value={uploadFile.title}
                                onChange={(e) => updateFileField(uploadFile.id, "title", e.target.value)}
                                placeholder="Enter video title"
                                disabled={uploadFile.status === "uploading"}
                                className="text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor={`description-${uploadFile.id}`} className="text-xs">
                                Description
                              </Label>
                              <Textarea
                                id={`description-${uploadFile.id}`}
                                value={uploadFile.description}
                                onChange={(e) => updateFileField(uploadFile.id, "description", e.target.value)}
                                placeholder="Brief description"
                                disabled={uploadFile.status === "uploading"}
                                className="text-sm min-h-[60px]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                // Abort all ongoing uploads
                uploadFiles.forEach((file) => file.abortController?.abort())

                // Optionally reset uploads
                setUploadFiles([])

                // Close modal
                onClose()
              }}
            >
              {allCompleted ? "Close" : "Cancel"}
            </Button>

            {allCompleted && (
              <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
                Done
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
