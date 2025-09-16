// // StoriesRing Legacy code
// import { Play } from 'lucide-react';

// interface Story {
//   id: string;
//   title: string;
//   author: string;
//   thumbnail: string;
//   videoUrl?: string;
//   duration: string;
//   isLive?: boolean;
//   viewCount?: string;
// }

// interface StoryRingProps {
//   story: Story;
//   onClick: () => void;
// }

// export const StoryRing: React.FC<StoryRingProps> = ({ story, onClick }) => {
//   return (
//     <div
//       className="flex-shrink-0 cursor-pointer group"
//       onClick={onClick}
//     >
//       <div className="story-ring p-[3px] rounded-full bg-gradient-to-r from-[#2C3E94] via-blue-500 to-purple-500">
//         {/* Inner border - white/light colored */}
//         <div className="p-[3px] rounded-full bg-white">
//           <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-accent to-background">
//             {story.videoUrl ? (
//               <video
//                 src={story.videoUrl}
//                 className="w-full h-full object-cover transition-transform group-hover:scale-110"
//                 muted
//                 loop
//                 playsInline
//                 onError={(e) => {
//                   e.currentTarget.style.display = 'none';
//                 }}
//               />
//             ) : (
//               <img
//                 src={story.thumbnail}
//                 alt={story.title}
//                 className="w-full h-full object-cover transition-transform group-hover:scale-110"
//                 onError={(e) => {
//                   e.currentTarget.src = '/api/placeholder/96/96';
//                 }}
//               />
//             )}
          
//             {/* Live Badge */}
//             {story.isLive && (
//               <div className="absolute top-1 right-1 z-10">
//                 <span className="live-badge text-xs">LIVE</span>
//               </div>
//             )}
          
//             {/* Play Icon Overlay */}
//             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
//               <Play className="h-6 w-6 text-white" fill="white" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function DialogCloseButton() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Share</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Share link</DialogTitle>
//           <DialogDescription>
//             Anyone who has this link will be able to view this.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex items-center gap-2">
//           <div className="grid flex-1 gap-2">
//             <Label htmlFor="link" className="sr-only">
//               Link
//             </Label>
//             <Input
//               id="link"
//               defaultValue="https://ui.shadcn.com/docs/installation"
//               readOnly
//             />
//           </div>
//         </div>
//         <DialogFooter className="sm:justify-start">
//           <DialogClose asChild>
//             <Button type="button" variant="secondary">
//               Close
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Users, Clock, Bookmark, Bell, MoreHorizontal, ChevronLeft, ChevronRight, Pause } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MediaItem {
  id: string
  title: string
  thumbnail: string
  type: "live" | "upcoming" | "recorded"
  zone: string
  viewCount?: string
  viewerNumber?: number
  duration?: string
  scheduledTime?: string
  streamedTime?: string
  isBookmarked?: boolean
  isNotified?: boolean
  streamerName?: string
  category?: string
  isVerified?: boolean
  waitingCount?: string
}

interface MediaCardsProps {
  selectedZone: string
  selectedEvent: string
}

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Zone 3 Championship Finals - Live Commentary and Analysis",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 3",
    viewCount: "245K",
    viewerNumber: 245000,
    isBookmarked: false,
    isNotified: true,
    streamerName: "Championship Stream",
    category: "Sports",
  },
  {
    id: "2",
    title: "Global Tournament Qualifiers - Day 2 Highlights",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Global",
    viewCount: "189K",
    viewerNumber: 189000,
    duration: "2:34:15",
    streamedTime: "3 hours ago",
    isBookmarked: true,
    isNotified: false,
    streamerName: "Global Sports TV",
    category: "Tournament",
  },
  {
    id: "3",
    title: "Community Showcase - Weekly Featured Players",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Community",
    viewCount: "156K",
    viewerNumber: 156000,
    scheduledTime: "Tomorrow, 2:00 PM",
    isBookmarked: false,
    isNotified: true,
    streamerName: "Community Hub",
    category: "Community",
  },
  {
    id: "4",
    title: "Zone 5 Regional Championship - Semi Finals",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 5",
    viewCount: "134K",
    viewerNumber: 134000,
    isBookmarked: true,
    isNotified: true,
    streamerName: "Zone 5 Official",
    category: "Championship",
  },
  {
    id: "5",
    title: "International Friendship Cup - Opening Ceremony",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Global",
    viewCount: "98K",
    viewerNumber: 98000,
    duration: "1:45:30",
    streamedTime: "1 day ago",
    isBookmarked: false,
    isNotified: false,
    streamerName: "International Cup",
    category: "Opening",
  },
  {
    id: "6",
    title: "Zone 2 vs Zone 4 - Championship Playoffs",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 2",
    viewCount: "87K",
    viewerNumber: 87000,
    scheduledTime: "Today, 7:00 PM",
    isBookmarked: true,
    isNotified: true,
    streamerName: "Playoff Central",
    category: "Playoffs",
  },
]

const liveStreams = [
  {
    id: "live1",
    title: "LA CASA DE ALOFOKE DIA 29",
    streamerName: "Alofokeradioshow",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "63K watching",
    isVerified: true,
    category: "Entertainment",
  },
  {
    id: "live2",
    title: "House UAP hearing LIVE with Ross Coulthart | NewsNation",
    streamerName: "NewsNation",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "11K watching",
    isVerified: true,
    category: "News",
  },
  {
    id: "live3",
    title: "Jeff Teague REACTS to Melo & Dwight Howard in Basketball Hall of Fame, Zaire...",
    streamerName: "Club 520 Podcast",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "5.5K watching",
    isVerified: true,
    category: "Sports",
  },
]

const recentStreams = [
  {
    id: "recent1",
    title: "Apple Event — September 9",
    streamerName: "Apple",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "23M views",
    duration: "1:11:53",
    streamedTime: "Streamed 4 hours ago",
    isVerified: true,
    category: "Technology",
  },
  {
    id: "recent2",
    title: "The Pat McAfee Show Live | Tuesday September 9th 2025",
    streamerName: "The Pat McAfee Show",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "331K views",
    streamedTime: "Streamed 3 hours ago",
    isVerified: true,
    category: "Sports",
  },
  {
    id: "recent3",
    title: "TACO TUESDAY ADMIN ABUSE + Taco Lucky Blocks!",
    streamerName: "CaylusBlox",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "684K views",
    duration: "2:58:41",
    streamedTime: "Streamed 26 minutes ago",
    isVerified: true,
    category: "Gaming",
  },
]

const upcomingStreams = [
  {
    id: "upcoming1",
    title: "AO VIVO IRL: ENTREGAS IFOOD BALNEÁRIO CAMBORIÚ COM MÚSICAS...",
    streamerName: "PITER MUNIZ BRASIL",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "1 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "IRL",
  },
  {
    id: "upcoming2",
    title: "LIVE: PREVISÕES SOBRE O PÓS-JULGAMENTO DE BOLSONARO: ANISTI...",
    streamerName: "Pedro Baldansa",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "26 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "Politics",
  },
  {
    id: "upcoming3",
    title: "Điện Biến Mới Nhất Sáng 10/9 Sau Cảnh Cống Noi Thầy An Trú",
    streamerName: "Hà Văn Vang",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "2 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    isVerified: true,
    category: "News",
  },
]

const shortsData = [
  {
    id: "short1",
    title: "When Hit-Girl drives all those shards of glass ...",
    thumbnail: "/action-movie-scene-with-glass-shards.jpg",
    viewCount: "2.1M views",
    category: "Entertainment",
  },
  {
    id: "short2",
    title: "ILLEGAL video from Endgame 🤯 #marvel ...",
    thumbnail: "/marvel-endgame-behind-the-scenes.jpg",
    viewCount: "10M views",
    category: "Movies",
  },
  {
    id: "short3",
    title: "Why Apple removed the charging brick?",
    thumbnail: "/apple-iphone-charging-brick-explanation.jpg",
    viewCount: "1.4M views",
    category: "Technology",
  },
  {
    id: "short4",
    title: "DRG - Sebene",
    thumbnail: "/music-performance-colorful-stage-lights.jpg",
    viewCount: "363 views",
    category: "Music",
  },
  {
    id: "short5",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "/engineering-students-comparison-meme.jpg",
    viewCount: "223K views",
    category: "Education",
  },
]

export const MediaCards = ({ selectedZone, selectedEvent }: MediaCardsProps) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isBookmarked).map((item) => item.id)),
  )
  const [notifiedItems, setNotifiedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isNotified).map((item) => item.id)),
  )
  const [currentSlide, setCurrentSlide] = useState(0)

  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(5)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  const [likedShorts, setLikedShorts] = useState<Set<string>>(new Set())
  const [sharedShorts, setSharedShorts] = useState<Set<string>>(new Set())

  const toggleBookmark = (id: string) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleNotification = (id: string) => {
    setNotifiedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleLikeShort = (id: string) => {
    setLikedShorts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const shareShort = (id: string) => {
    setSharedShorts((prev) => new Set(prev).add(id))
    console.log(`Sharing short: ${id}`)
  }

  const topLiveStreams = mockMediaItems
    .filter((item) => item.type === "live")
    .filter((item) => selectedZone === "all" || item.zone === selectedZone)
    .sort((a, b) => (b.viewerNumber || 0) - (a.viewerNumber || 0))
    .slice(0, 3)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % topLiveStreams.length)
    setTimeRemaining(5)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + topLiveStreams.length) % topLiveStreams.length)
    setTimeRemaining(5)
  }

  useEffect(() => {
    if (isAutoPlaying && topLiveStreams.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % topLiveStreams.length)
        setTimeRemaining(5)
      }, 5000)

      countdownRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return 5
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [isAutoPlaying, topLiveStreams.length])

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    if (!isAutoPlaying) {
      setTimeRemaining(5)
    }
  }

  const selectStream = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeRemaining(5)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              Live Streams
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Most watched live events right now</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              disabled={topLiveStreams.length <= 1}
              className="hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAutoPlay}
                className="hover:bg-accent"
                disabled={topLiveStreams.length <= 1}
              >
                {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              {isAutoPlaying && topLiveStreams.length > 1 && (
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-3 w-3" />
                  <span className="font-mono font-medium">{timeRemaining}s</span>
                  <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-linear"
                      style={{ width: `${((5 - timeRemaining) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-1">
              {topLiveStreams.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              disabled={topLiveStreams.length <= 1}
              className="hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {topLiveStreams.map((stream, index) => (
              <div key={stream.id} className="w-full flex-shrink-0">
                <Card className="overflow-hidden bg-gradient-to-br from-card to-card/80 border-2 border-red-500/20">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={stream.thumbnail || "/placeholder.svg"}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg"
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40">
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <Badge className="bg-red-500 text-white font-bold text-sm px-3 py-1 animate-pulse">
                          🔴 LIVE
                        </Badge>
                        <Badge variant="secondary" className="text-sm font-medium">
                          {stream.zone}
                        </Badge>
                        {index === currentSlide && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">NOW PLAYING</Badge>
                        )}
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 bg-black/70 text-white px-3 py-1 rounded-full">
                          <Users className="h-4 w-4" />
                          <span className="font-semibold">{stream.viewCount}</span>
                          <span className="text-sm">watching</span>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white shadow-2xl scale-110">
                          <Play className="h-6 w-6 mr-2" fill="white" />
                          Watch Live
                        </Button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 bg-gradient-to-t from-black/90 to-black/60">
                        <div className="space-y-2">
                          <h3 className="text-white text-xl font-bold leading-tight bg-black/40 p-2 rounded">
                            {stream.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-white/80">
                            <span className="font-medium">{stream.streamerName}</span>
                            <span>•</span>
                            <span>{stream.category}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-white border-white/30 bg-black/40">
                              <span className="text-white">#</span>
                              <span className="text-white">{index + 1}</span>
                              <span className="text-white"> Trending</span>
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-white/10 text-white hover:bg-white/20 border-white/20"
                            >
                              <Play className="h-4 w-4 mr-2 text-white" />
                              <span className="text-white">Join Stream</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 bg-black/20">
                              <Users className="h-4 w-4 mr-2 text-white" />
                              <span className="text-white">Chat</span>
                            </Button>
                          </div>

                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleNotification(stream.id)}
                              className={`text-white hover:bg-white/10 ${
                                notifiedItems.has(stream.id) ? "bg-white/20" : ""
                              }`}
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleBookmark(stream.id)}
                              className={`text-white hover:bg-white/10 ${
                                bookmarkedItems.has(stream.id) ? "bg-white/20" : ""
                              }`}
                            >
                              <Bookmark
                                className="h-4 w-4"
                                fill={bookmarkedItems.has(stream.id) ? "currentColor" : "none"}
                              />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          {topLiveStreams.map((stream, index) => (
            <button
              key={stream.id}
              onClick={() => selectStream(index)}
              className={`relative overflow-hidden rounded-lg transition-all ${
                index === currentSlide ? "ring-2 ring-primary scale-105" : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={stream.thumbnail || "/placeholder.svg"}
                alt={stream.title}
                className="w-24 h-14 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg"
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute bottom-1 left-1 right-1">
                <div className="text-white text-xs font-medium truncate">{stream.zone}</div>
              </div>
              {index === currentSlide && isAutoPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - timeRemaining) / 5) * 100}%` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2 text-foreground">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              Live Streams
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Currently active live streams</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveStreams.map((stream) => (
            <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={stream.thumbnail || "/placeholder.svg"}
                  alt={stream.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-500 text-white font-bold text-xs px-2 py-1">🔴 LIVE</Badge>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    <Play className="h-4 w-4 mr-1" fill="white" />
                    Watch
                  </Button>
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
                  <span className="font-medium text-red-500">{stream.viewCount}</span>
                  <Badge variant="outline" className="text-xs">
                    {stream.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Recent Live Streams</h2>
            <p className="text-muted-foreground text-sm mt-1">Recently concluded live streams</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentStreams.map((stream) => (
            <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={stream.thumbnail || "/placeholder.svg"}
                  alt={stream.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {stream.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {stream.duration}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Play className="h-4 w-4 mr-1" fill="currentColor" />
                    Watch
                  </Button>
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
                    <span>{stream.viewCount}</span>
                    <span>•</span>
                    <span>{stream.streamedTime}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {stream.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Upcoming Live Streams</h2>
            <p className="text-muted-foreground text-sm mt-1">Scheduled live streams you can look forward to</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingStreams.map((stream) => (
            <Card key={stream.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={stream.thumbnail || "/placeholder.svg"}
                  alt={stream.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-blue-500 text-white font-bold text-xs px-2 py-1">UPCOMING</Badge>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white text-black">
                    <Bell className="h-4 w-4 mr-1" />
                    Notify Me
                  </Button>
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
                    <span className="text-blue-500 font-medium">{stream.waitingCount}</span>
                    <span>•</span>
                    <span>{stream.scheduledTime}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {stream.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Shorts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
              <Play className="h-3 w-3 text-white" fill="white" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground">Shorts</h2>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-accent">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-4">
          {shortsData.map((short) => (
            <div key={short.id} className="flex-shrink-0 cursor-pointer group">
              <div className="w-[180px] space-y-3">
                <div className="aspect-[9/16] relative bg-black rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  <img
                    src={short.thumbnail || "/placeholder.svg"}
                    alt={short.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2 px-1">
                  <h4 className="text-foreground text-sm font-medium line-clamp-2 leading-tight">{short.title}</h4>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs font-medium">{short.viewCount}</span>
                    <Badge variant="secondary" className="text-xs bg-muted hover:bg-muted/80">
                      {short.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="hover:bg-accent bg-transparent">
          Load More Content
        </Button>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { MoreHorizontal, Camera, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveStreamCarousel } from "./live-stream-carousel"
import { StreamCard } from "./stream-card"
import { ShortCard } from "./short-card"
import { SectionHeader } from "./section-header"

interface MediaItem {
  id: string
  title: string
  thumbnail: string
  type: "live" | "upcoming" | "recorded"
  zone: string
  viewCount?: string
  viewerNumber?: number
  duration?: string
  scheduledTime?: string
  streamedTime?: string
  isBookmarked?: boolean
  isNotified?: boolean
  streamerName?: string
  category?: string
  isVerified?: boolean
  waitingCount?: string
}

interface MediaCardsProps {
  selectedZone: string
  selectedEvent: string
}

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Zone 3 Championship Finals - Live Commentary and Analysis",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 3",
    viewCount: "245K",
    viewerNumber: 245000,
    isBookmarked: false,
    isNotified: true,
    streamerName: "Championship Stream",
    category: "Sports",
  },
  {
    id: "2",
    title: "Global Tournament Qualifiers - Day 2 Highlights",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Global",
    viewCount: "189K",
    viewerNumber: 189000,
    duration: "2:34:15",
    streamedTime: "3 hours ago",
    isBookmarked: true,
    isNotified: false,
    streamerName: "Global Sports TV",
    category: "Tournament",
  },
  {
    id: "3",
    title: "Community Showcase - Weekly Featured Players",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Community",
    viewCount: "156K",
    viewerNumber: 156000,
    scheduledTime: "Tomorrow, 2:00 PM",
    isBookmarked: false,
    isNotified: true,
    streamerName: "Community Hub",
    category: "Community",
  },
  {
    id: "4",
    title: "Zone 5 Regional Championship - Semi Finals",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 5",
    viewCount: "134K",
    viewerNumber: 134000,
    isBookmarked: true,
    isNotified: true,
    streamerName: "Zone 5 Official",
    category: "Championship",
  },
  {
    id: "5",
    title: "International Friendship Cup - Opening Ceremony",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Global",
    viewCount: "98K",
    viewerNumber: 98000,
    duration: "1:45:30",
    streamedTime: "1 day ago",
    isBookmarked: false,
    isNotified: false,
    streamerName: "International Cup",
    category: "Opening",
  },
  {
    id: "6",
    title: "Zone 2 vs Zone 4 - Championship Playoffs",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 2",
    viewCount: "87K",
    viewerNumber: 87000,
    scheduledTime: "Today, 7:00 PM",
    isBookmarked: true,
    isNotified: true,
    streamerName: "Playoff Central",
    category: "Playoffs",
  },
]

const liveStreams = [
  {
    id: "live1",
    title: "LA CASA DE ALOFOKE DIA 29",
    streamerName: "Alofokeradioshow",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "63K watching",
    isVerified: true,
    category: "Entertainment",
  },
  {
    id: "live2",
    title: "House UAP hearing LIVE with Ross Coulthart | NewsNation",
    streamerName: "NewsNation",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "11K watching",
    isVerified: true,
    category: "News",
  },
  {
    id: "live3",
    title: "Jeff Teague REACTS to Melo & Dwight Howard in Basketball Hall of Fame, Zaire...",
    streamerName: "Club 520 Podcast",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "5.5K watching",
    isVerified: true,
    category: "Sports",
  },
]

const recentStreams = [
  {
    id: "recent1",
    title: "Apple Event — September 9",
    streamerName: "Apple",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "23M views",
    duration: "1:11:53",
    streamedTime: "Streamed 4 hours ago",
    isVerified: true,
    category: "Technology",
  },
  {
    id: "recent2",
    title: "The Pat McAfee Show Live | Tuesday September 9th 2025",
    streamerName: "The Pat McAfee Show",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "331K views",
    streamedTime: "Streamed 3 hours ago",
    isVerified: true,
    category: "Sports",
  },
  {
    id: "recent3",
    title: "TACO TUESDAY ADMIN ABUSE + Taco Lucky Blocks!",
    streamerName: "CaylusBlox",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "684K views",
    duration: "2:58:41",
    streamedTime: "Streamed 26 minutes ago",
    isVerified: true,
    category: "Gaming",
  },
]

const upcomingStreams = [
  {
    id: "upcoming1",
    title: "AO VIVO IRL: ENTREGAS IFOOD BALNEÁRIO CAMBORIÚ COM MÚSICAS...",
    streamerName: "PITER MUNIZ BRASIL",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "1 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "IRL",
  },
  {
    id: "upcoming2",
    title: "LIVE: PREVISÕES SOBRE O PÓS-JULGAMENTO DE BOLSONARO: ANISTI...",
    streamerName: "Pedro Baldansa",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "26 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "Politics",
  },
  {
    id: "upcoming3",
    title: "Điện Biến Mới Nhất Sáng 10/9 Sau Cảnh Cống Noi Thầy An Trú",
    streamerName: "Hà Văn Vang",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "2 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    isVerified: true,
    category: "News",
  },
]

const shortsData = [
  {
    id: "short1",
    title: "When Hit-Girl drives all those shards of glass ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "2.1M views",
    category: "Entertainment",
  },
  {
    id: "short2",
    title: "ILLEGAL video from Endgame 🤯 #marvel ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "10M views",
    category: "Movies",
  },
  {
    id: "short3",
    title: "Why Apple removed the charging brick?",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "1.4M views",
    category: "Technology",
  },
  {
    id: "short4",
    title: "DRG - Sebene",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "363 views",
    category: "Music",
  },
  {
    id: "short5",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "223K views",
    category: "Education",
  },
]

export const MediaCards = ({ selectedZone, selectedEvent }: MediaCardsProps) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isBookmarked).map((item) => item.id)),
  )
  const [notifiedItems, setNotifiedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isNotified).map((item) => item.id)),
  )

  const toggleBookmark = (id: string) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleNotification = (id: string) => {
    setNotifiedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const topLiveStreams = mockMediaItems
    .filter((item) => item.type === "live")
    .filter((item) => selectedZone === "all" || item.zone === selectedZone)
    .sort((a, b) => (b.viewerNumber || 0) - (a.viewerNumber || 0))
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <LiveStreamCarousel
        streams={topLiveStreams}
        bookmarkedItems={bookmarkedItems}
        notifiedItems={notifiedItems}
        onToggleBookmark={toggleBookmark}
        onToggleNotification={toggleNotification}
      />

      <div className="space-y-4">
        <SectionHeader
          title="Live Streams"
          description="Currently active live streams"
          icon={<div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} type="live" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Recent Live Streams" description="Recently concluded live streams" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} type="recent" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Upcoming Live Streams" description="Scheduled live streams you can look forward to" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} type="upcoming" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader
          title="Live Moments"
          icon={
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Camera className="h-5 w-5 text-[#2C3E94]" />
              <Sparkles className="h-2 w-2 text-[#2C3E94] absolute -top-0.5 -right-0.5" />
            </div>
          }
          actions={
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        />

        <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-4">
          {shortsData.map((short) => (
            <ShortCard key={short.id} short={short} />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="hover:bg-accent bg-transparent">
          Load More Content
        </Button>
      </div>
    </div>
  )
}


// Media cards:
"use client"

import { useState } from "react"
import { MoreHorizontal, Camera, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveStreamCarousel } from "./live-stream-carousel"
import { StreamCard } from "./stream-card"
// import { ShortCard } from "./short-card"
import { ShortsCarousel } from "./shorts-carousel"
import { SectionHeader } from "./section-header"

interface MediaItem {
  id: string
  title: string
  thumbnail: string
  type: "live" | "upcoming" | "recorded"
  zone: string
  viewCount?: string
  viewerNumber?: number
  duration?: string
  scheduledTime?: string
  streamedTime?: string
  isBookmarked?: boolean
  isNotified?: boolean
  streamerName?: string
  category?: string
  isVerified?: boolean
  waitingCount?: string
}

interface MediaCardsProps {
  selectedZone: string
  selectedEvent: string
}

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Zone 3 Championship Finals - Live Commentary and Analysis",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 3",
    viewCount: "245K",
    viewerNumber: 245000,
    isBookmarked: false,
    isNotified: true,
    streamerName: "Championship Stream",
    category: "Sports",
  },
  {
    id: "2",
    title: "Global Tournament Qualifiers - Day 2 Highlights",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Global",
    viewCount: "189K",
    viewerNumber: 189000,
    duration: "2:34:15",
    streamedTime: "3 hours ago",
    isBookmarked: true,
    isNotified: false,
    streamerName: "Global Sports TV",
    category: "Tournament",
  },
  {
    id: "3",
    title: "Community Showcase - Weekly Featured Players",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Community",
    viewCount: "156K",
    viewerNumber: 156000,
    scheduledTime: "Tomorrow, 2:00 PM",
    isBookmarked: false,
    isNotified: true,
    streamerName: "Community Hub",
    category: "Community",
  },
  {
    id: "4",
    title: "Zone 5 Regional Championship - Semi Finals",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 5",
    viewCount: "134K",
    viewerNumber: 134000,
    isBookmarked: true,
    isNotified: true,
    streamerName: "Zone 5 Official",
    category: "Championship",
  },
  {
    id: "5",
    title: "International Friendship Cup - Opening Ceremony",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Global",
    viewCount: "98K",
    viewerNumber: 98000,
    duration: "1:45:30",
    streamedTime: "1 day ago",
    isBookmarked: false,
    isNotified: false,
    streamerName: "International Cup",
    category: "Opening",
  },
  {
    id: "6",
    title: "Zone 2 vs Zone 4 - Championship Playoffs",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    type: "live",
    zone: "Zone 2",
    viewCount: "87K",
    viewerNumber: 87000,
    scheduledTime: "Today, 7:00 PM",
    isBookmarked: true,
    isNotified: true,
    streamerName: "Playoff Central",
    category: "Playoffs",
  },
]

const liveStreams = [
  {
    id: "live1",
    title: "LA CASA DE ALOFOKE DIA 29",
    streamerName: "Alofokeradioshow",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "63K watching",
    isVerified: true,
    category: "Entertainment",
  },
  {
    id: "live2",
    title: "House UAP hearing LIVE with Ross Coulthart | NewsNation",
    streamerName: "NewsNation",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "11K watching",
    isVerified: true,
    category: "News",
  },
  {
    id: "live3",
    title: "Jeff Teague REACTS to Melo & Dwight Howard in Basketball Hall of Fame, Zaire...",
    streamerName: "Club 520 Podcast",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "5.5K watching",
    isVerified: true,
    category: "Sports",
  },
]

const recentStreams = [
  {
    id: "recent1",
    title: "Apple Event — September 9",
    streamerName: "Apple",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "23M views",
    duration: "1:11:53",
    streamedTime: "Streamed 4 hours ago",
    isVerified: true,
    category: "Technology",
  },
  {
    id: "recent2",
    title: "The Pat McAfee Show Live | Tuesday September 9th 2025",
    streamerName: "The Pat McAfee Show",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "331K views",
    streamedTime: "Streamed 3 hours ago",
    isVerified: true,
    category: "Sports",
  },
  {
    id: "recent3",
    title: "TACO TUESDAY ADMIN ABUSE + Taco Lucky Blocks!",
    streamerName: "CaylusBlox",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "684K views",
    duration: "2:58:41",
    streamedTime: "Streamed 26 minutes ago",
    isVerified: true,
    category: "Gaming",
  },
]

const upcomingStreams = [
  {
    id: "upcoming1",
    title: "AO VIVO IRL: ENTREGAS IFOOD BALNEÁRIO CAMBORIÚ COM MÚSICAS...",
    streamerName: "PITER MUNIZ BRASIL",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "1 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "IRL",
  },
  {
    id: "upcoming2",
    title: "LIVE: PREVISÕES SOBRE O PÓS-JULGAMENTO DE BOLSONARO: ANISTI...",
    streamerName: "Pedro Baldansa",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "26 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "Politics",
  },
  {
    id: "upcoming3",
    title: "Điện Biến Mới Nhất Sáng 10/9 Sau Cảnh Cống Noi Thầy An Trú",
    streamerName: "Hà Văn Vang",
    thumbnail:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "2 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    isVerified: true,
    category: "News",
  },
]

const shortsData = [
  {
    id: "short1",
    title: "When Hit-Girl drives all those shards of glass ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "2.1M views",
    category: "Entertainment",
  },
  {
    id: "short2",
    title: "ILLEGAL video from Endgame 🤯 #marvel ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "10M views",
    category: "Movies",
  },
  {
    id: "short3",
    title: "Why Apple removed the charging brick?",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "1.4M views",
    category: "Technology",
  },
  {
    id: "short4",
    title: "DRG - Sebene",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "363 views",
    category: "Music",
  },
  {
    id: "short5",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "223K views",
    category: "Education",
  },
    {
    id: "short6",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "223K views",
    category: "Education",
  },
    {
    id: "short7",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "223K views",
    category: "Education",
  },
    {
    id: "short8",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "223K views",
    category: "Education",
  },
    {
    id: "short9",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "223K views",
    category: "Education",
  },
    {
    id: "short10",
    title: "Mechanical Engineer vs Civil Engineer ...",
    thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
    viewCount: "223K views",
    category: "Education",
  },
]

export const MediaCards = ({ selectedZone, selectedEvent }: MediaCardsProps) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isBookmarked).map((item) => item.id)),
  )
  const [notifiedItems, setNotifiedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isNotified).map((item) => item.id)),
  )

  const [isLoadingContent, setIsLoadingContent] = useState(false)

    const loadMoreContent = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Loading more content...")

    return true
  }

  const handleLoadMoreContent = async () => {
    setIsLoadingContent(true)
    try {
      await loadMoreContent()
    } catch (error) {
      console.error("Failed to load more content:", error)
    } finally {
      setIsLoadingContent(false)
    }
  }

  const toggleBookmark = (id: string) => {
    setBookmarkedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleNotification = (id: string) => {
    setNotifiedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const topLiveStreams = mockMediaItems
    .filter((item) => item.type === "live")
    .filter((item) => selectedZone === "all" || item.zone === selectedZone)
    .sort((a, b) => (b.viewerNumber || 0) - (a.viewerNumber || 0))
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <LiveStreamCarousel
        streams={topLiveStreams}
        bookmarkedItems={bookmarkedItems}
        notifiedItems={notifiedItems}
        onToggleBookmark={toggleBookmark}
        onToggleNotification={toggleNotification}
      />

      <div className="space-y-4">
        <SectionHeader
          title="Live Streams"
          description="Currently active live streams"
          icon={<div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} type="live" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Recent Live Streams" description="Recently concluded live streams" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} type="recent" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader title="Upcoming Live Streams" description="Scheduled live streams you can look forward to" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} type="upcoming" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader
          title="Live Moments"
          icon={
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Camera className="h-5 w-5 text-[#2C3E94]" />
              <Sparkles className="h-2 w-2 text-[#2C3E94] absolute -top-0.5 -right-0.5" />
            </div>
          }
          actions={
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        />

        <div className="space-y-4">
          {/* {shortsData.map((short) => (
            <ShortCard key={short.id} short={short} />
          ))} */}
          <ShortsCarousel shorts={shortsData} />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className="hover:bg-accent bg-transparent min-w-[160px]"
          onClick={handleLoadMoreContent}
          disabled={isLoadingContent}
        >
          {isLoadingContent ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Load More Content"
          )}
        </Button>
      </div>
    </div>
  )
}
