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

interface LiveStreamCarouselProps {
  streams: MediaItem[]
  bookmarkedItems: Set<string>
  notifiedItems: Set<string>
  onToggleBookmark: (id: string) => void
  onToggleNotification: (id: string) => void
}

export const LiveStreamCarousel = ({
  streams,
  bookmarkedItems,
  notifiedItems,
  onToggleBookmark,
  onToggleNotification,
}: LiveStreamCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(5)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % streams.length)
    setTimeRemaining(5)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + streams.length) % streams.length)
    setTimeRemaining(5)
  }

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

  useEffect(() => {
    if (isAutoPlaying && streams.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % streams.length)
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
  }, [isAutoPlaying, streams.length])

  if (streams.length === 0) return null

  return (
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
            disabled={streams.length <= 1}
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
              disabled={streams.length <= 1}
            >
              {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            {isAutoPlaying && streams.length > 1 && (
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
            {streams.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={streams.length <= 1}
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
          {streams.map((stream, index) => (
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
                      <Badge className="bg-red-500 text-white font-bold text-sm px-3 py-1 animate-pulse">🔴 LIVE</Badge>
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
                            onClick={() => onToggleNotification(stream.id)}
                            className={`text-white hover:bg-white/10 ${
                              notifiedItems.has(stream.id) ? "bg-white/20" : ""
                            }`}
                          >
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleBookmark(stream.id)}
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
        {streams.map((stream, index) => (
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
  )
}
