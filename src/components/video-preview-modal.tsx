"use client"

import { useState, useRef, useEffect } from "react"
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

interface Video {
  id: number
  title: string
  eventName: string
  uploadedBy: string
  uploadDate: string
  size: string
  duration: string
  thumbnail: string
  videoUrl?: string
}

interface VideoPreviewModalProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
}

export function VideoPreviewModal({ video, isOpen, onClose }: VideoPreviewModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Mock video URL - in real implementation, this would come from your storage
  const videoUrl = video ? `/placeholder-video.mp4` : ""

  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [isOpen])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0] / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  if (!video) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div className="relative w-full h-[70vh] bg-black" onMouseMove={handleMouseMove}>
          {/* Video Player */}
          <video ref={videoRef} className="w-full h-full object-contain" poster={video.thumbnail} onClick={togglePlay}>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="text-white">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-white/80">{video.eventName}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Center Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white"
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              {/* Progress Bar */}
              <Slider
                value={[duration ? (currentTime / duration) * 100 : 0]}
                onValueChange={handleSeek}
                max={100}
                step={0.1}
                className="w-full"
              />

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-20"
                    />
                  </div>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const video = videoRef.current
                      if (video) {
                        video.currentTime = 0
                        setCurrentTime(0)
                      }
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const video = videoRef.current
                      if (video) {
                        if (video.requestFullscreen) {
                          video.requestFullscreen()
                        }
                      }
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info Panel */}
          <div className="absolute bottom-4 right-4 bg-black/80 rounded-lg p-3 text-white text-xs space-y-1 max-w-xs">
            <div>
              <span className="text-white/60">Uploaded by:</span> {video.uploadedBy}
            </div>
            <div>
              <span className="text-white/60">Date:</span> {video.uploadDate}
            </div>
            <div>
              <span className="text-white/60">Size:</span> {video.size}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
