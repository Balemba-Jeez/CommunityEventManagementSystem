"use client"


import { useState, useEffect } from "react"
import axios from "axios"
import { Search, Bell, Upload, Plus, Calendar, Filter, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VideoUploadModal } from "@/components/video-upload-modal"
import { VideoTable } from "@/components/video-table"
import { VideoPreviewModal } from "@/components/video-preview-modal"
import { DashboardLayout } from "../pages/layouts/DashboardLayout";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { EnhancedVideoTable } from "@/components/enhanced-video-table"
import { SimpleUploadModal } from "@/components/simple-upload-modal"

// Mock data for demonstration
// const mockEvents = [
//   { id: 1, name: "Wedding Ceremony", date: "2024-03-15" },
//   { id: 2, name: "Corporate Event", date: "2024-03-20" },
//   { id: 3, name: "Birthday Party", date: "2024-03-25" },
// ]

// const mockVideos = [
//   {
//     id: 1,
//     title: "Wedding Highlights",
//     eventId: 1,
//     eventName: "Wedding Ceremony",
//     uploadedBy: "Sarah Johnson",
//     uploadDate: "2024-03-16",
//     size: "45.2 MB",
//     duration: "3:24",
//     thumbnail: "/wedding-video-thumbnail.png",
//     status: "completed",
//     type: "video",
//   },
//   {
//     id: 2,
//     title: "Corporate Presentation",
//     eventId: 2,
//     eventName: "Corporate Event",
//     uploadedBy: "Mike Chen",
//     uploadDate: "2024-03-21",
//     size: "128.5 MB",
//     duration: "12:45",
//     thumbnail: "/corporate-presentation-thumbnail.jpg",
//     status: "completed",
//     type: "video",
//   },
//   {
//     id: 3,
//     title: "Birthday Celebration",
//     eventId: 3,
//     eventName: "Birthday Party",
//     uploadedBy: "Emma Davis",
//     uploadDate: "2024-03-26",
//     size: "67.8 MB",
//     duration: "5:12",
//     thumbnail: "/birthday-party-thumbnail.jpg",
//     status: "processing",
//     type: "video",
//   },
// ]

const fileCategories = [
  { name: "Documents", count: 42, color: "bg-blue-500", textColor: "text-blue-700" },
  { name: "Image", count: 75, color: "bg-purple-500", textColor: "text-purple-700" },
  { name: "Video", count: 32, color: "bg-purple-300", textColor: "text-purple-600" },
  { name: "Audio", count: 20, color: "bg-orange-400", textColor: "text-orange-700" },
  { name: "ZIP", count: 14, color: "bg-red-500", textColor: "text-red-700" },
]

export default function CreatePost() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const [videos, setVideos] = useState<any[]>([])

  const { token } = useAuth();

  console.log('token recieved from context', token)


    useEffect(() => {
      const fetchEvents = async () => {

        console.log('checking if all conditions are set to fetch events');

        if (!token) return; // skip until token is available

        console.log('fetching events');

        try {
            const res = await axios.get("http://localhost:3000/api/events/member?light=true", {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            setEvents(res.data.events)
            console.log(res.data.events);
        } catch (err) {
            console.error("Failed to fetch events", err)
            }
        }

        fetchEvents()
    }, [token])

    useEffect(() => {
  const fetchClips = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clips", {
        headers: {
          Authorization: `Bearer ${token}` // if your /api/clips requires auth
        }
      })
      setVideos(res.data) // <-- API returns the mapped format
    } catch (err) {
      console.error("Failed to fetch clips", err)
    }
  }

  if (token) fetchClips()
}, [token])



//   const filteredVideos = mockVideos.filter((video) => {
//     const matchesSearch =
//       video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       video.eventName.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesEvent = selectedEvent ? video.eventId === selectedEvent : true
//     return matchesSearch && matchesEvent
//   })

const filteredVideos = videos.filter((video) => {
  const matchesSearch =
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  const matchesEvent = selectedEvent ? video.eventId === selectedEvent : true
  return matchesSearch && matchesEvent
})


  const handleVideoClick = (video: (typeof videos)[0]) => {
    setSelectedVideo(video)
    setIsPreviewModalOpen(true)
  }



  return (

    <DashboardLayout>
        {(sidebarCollapsed: boolean) => (
        <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-0 border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-foreground">Create Post</h1>
                <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                <Upload className="h-4 w-4 mr-2" />
                Upload file
                </Button>
                {/* <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
                </Button> */}
            </div>
            </div>
        </header>

        <div className="flex mb-6 mx-6 gap-6">
            {/* Sidebar */}
            <aside className="w-80 border-[1px] border-border rounded-md bg-sidebar/50 backdrop-blur-sm min-h-[calc(100vh-73px)]">
            <div className="p-6">
                <div className="mb-6">
                <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">All files</h2>
                <p className="text-sm text-muted-foreground">All of your Posts are displayed here</p>
                </div>

                {/* Event Filter */}
                <div className="mb-6">
                <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Filter by Event</h3>
                <div className="space-y-2">
                    <Button
                    variant={selectedEvent === null ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => setSelectedEvent(null)}
                    >
                    All Events
                    </Button>
                    {/* {mockEvents.map((event) => (
                    <Button
                        key={event.id}
                        variant={selectedEvent === event.id ? "secondary" : "ghost"}
                        className="w-full justify-start text-sm hover:bg-[#9fa5f9]"
                        onClick={() => setSelectedEvent(event.id)}
                    >
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.name}
                    </Button>
                    ))} */}
                    {events.map((event) => (
                        <Button
                            key={event.id}
                            variant={selectedEvent === event.id ? "secondary" : "ghost"}
                            className="w-full justify-start text-sm hover:bg-[#9fa5f9]"
                            onClick={() => setSelectedEvent(event.id)}
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            {event.name}
                        </Button>
                    ))}

                </div>
                </div>

                {/* File Categories */}
                <div className="mt-6">
                <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Recently modified</h3>
                <div className="space-y-2">
                    {fileCategories.map((category) => (
                    <div
                        key={category.name}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-sidebar-accent/50"
                    >
                        <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${category.color}`} />
                        <span className={`text-sm ${category.textColor}`}>{category.name}</span>
                        </div>
                        <div className="text-right">
                        <div className="text-xs text-muted-foreground">{category.count} Files</div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6  border-[1px] border-border rounded-md">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">All files</h2>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"className="hover:bg-[#9fa5f9]">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#9fa5f9]">
                    <List className="h-4 w-4 mr-2" />
                    List
                    </Button>
                </div>
                </div>

                <div className="flex items-center gap-1 mb-6">
                {fileCategories.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                    <div className={`h-8 w-16 rounded ${category.color}`} />
                    </div>
                ))}
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                {fileCategories.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${category.color}`} />
                    <span>{category.name}</span>
                    </div>
                ))}
                </div>
            </div>

            <EnhancedVideoTable videos={filteredVideos} onVideoClick={handleVideoClick} />
            </main>
        </div>

        <SimpleUploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} events={events} />
        <VideoPreviewModal
            video={selectedVideo}
            isOpen={isPreviewModalOpen}
            onClose={() => {
            setIsPreviewModalOpen(false)
            setSelectedVideo(null)
            }}
        />
        </div>
        )}
    </DashboardLayout>
    )
}
