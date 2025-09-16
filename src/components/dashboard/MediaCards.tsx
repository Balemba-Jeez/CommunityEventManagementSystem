"use client"

import { useState } from "react"
import { MoreHorizontal, Camera, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveStreamCarousel } from "./live-stream-carousel"
import { StreamCard } from "./stream-card"
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

interface Stream {
  id: string
  title: string
  streamerName: string
  thumbnail: string
  viewCount?: string
  waitingCount?: string
  duration?: string
  scheduledTime?: string
  streamedTime?: string
  isVerified?: boolean
  category: string
}

interface MediaCardsProps {
  selectedZone: string
  selectedEvent: string
  collapsed: boolean;
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
]

const initialLiveStreams = [
  {
    id: "live1",
    title: "LA CASA DE ALOFOKE DIA 29",
    streamerName: "Alofokeradioshow",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "63K watching",
    isVerified: true,
    category: "Entertainment",
  },
  {
    id: "live2",
    title: "House UAP hearing LIVE with Ross Coulthart | NewsNation",
    streamerName: "NewsNation",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "11K watching",
    isVerified: true,
    category: "News",
  },
  {
    id: "live3",
    title: "Jeff Teague REACTS to Melo & Dwight Howard in Basketball Hall of Fame, Zaire...",
    streamerName: "Club 520 Podcast",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "5.5K watching",
    isVerified: true,
    category: "Sports",
  },
]


const initialRecentStreams = [
  {
    id: "recent1",
    title: "Apple Event — September 9",
    streamerName: "Apple",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
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
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "331K views",
    streamedTime: "Streamed 3 hours ago",
    isVerified: true,
    category: "Sports",
  },
  {
    id: "recent3",
    title: "TACO TUESDAY ADMIN ABUSE + Taco Lucky Blocks!",
    streamerName: "CaylusBlox",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "684K views",
    duration: "2:58:41",
    streamedTime: "Streamed 26 minutes ago",
    isVerified: true,
    category: "Gaming",
  },
]


const initialUpcomingStreams = [
  {
    id: "upcoming1",
    title: "AO VIVO IRL: ENTREGAS IFOOD BALNEÁRIO CAMBORIÚ COM MÚSICAS...",
    streamerName: "PITER MUNIZ BRASIL",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "1 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "IRL",
  },
  {
    id: "upcoming2",
    title: "LIVE: PREVISÕES SOBRE O PÓS-JULGAMENTO DE BOLSONARO: ANISTI...",
    streamerName: "Pedro Baldansa",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "26 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    category: "Politics",
  },
  {
    id: "upcoming3",
    title: "Điện Biến Mới Nhất Sáng 10/9 Sau Cảnh Cống Noi Thầy An Trú",
    streamerName: "Hà Văn Vang",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "2 waiting",
    scheduledTime: "Scheduled for 9/10/25, 12:00 AM",
    isVerified: true,
    category: "News",
  },
]

// Additional content that gets loaded
const additionalLiveStreams = [
  {
    id: "live4",
    title: "Evening Gaming Session - RPG Adventure",
    streamerName: "GameMaster Pro",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "8.2K watching",
    isVerified: false,
    category: "Gaming",
  },
  {
    id: "live5",
    title: "Cooking Workshop - Italian Cuisine",
    streamerName: "Chef Marco",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "3.1K watching",
    isVerified: true,
    category: "Cooking",
  },
  {
    id: "live6",
    title: "Music Production Livestream",
    streamerName: "BeatMaker Studios",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Live%20events%20ui%20design-kC5lMyylfvYWmga8RyrnTqMfGOddSn.png",
    viewCount: "12K watching",
    isVerified: true,
    category: "Music",
  },
]

const additionalRecentStreams = [
  {
    id: "recent4",
    title: "Tech Conference 2024 - AI Innovation Panel",
    streamerName: "TechWorld",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "156K views",
    duration: "2:15:30",
    streamedTime: "Streamed 1 day ago",
    isVerified: true,
    category: "Technology",
  },
  {
    id: "recent5",
    title: "Fitness Challenge - 30 Day Transformation",
    streamerName: "FitLife Coach",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "89K views",
    duration: "1:45:20",
    streamedTime: "Streamed 2 days ago",
    isVerified: false,
    category: "Fitness",
  },
  {
    id: "recent6",
    title: "Art Tutorial - Digital Painting Masterclass",
    streamerName: "Digital Artist Pro",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Recent%20Live%20streams%20ui%20design-zU3UsBubwUVPiPjCQzcvjcNMbG4vgR.png",
    viewCount: "42K views",
    duration: "3:22:15",
    streamedTime: "Streamed 5 hours ago",
    isVerified: true,
    category: "Art",
  },
]

const additionalUpcomingStreams = [
  {
    id: "upcoming4",
    title: "Morning Meditation and Mindfulness Session",
    streamerName: "Zen Master",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "45 waiting",
    scheduledTime: "Scheduled for 9/11/25, 6:00 AM",
    category: "Wellness",
  },
  {
    id: "upcoming5",
    title: "Weekly Tech News Roundup",
    streamerName: "Tech Insider",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "128 waiting",
    scheduledTime: "Scheduled for 9/11/25, 3:00 PM",
    isVerified: true,
    category: "Technology",
  },
  {
    id: "upcoming6",
    title: "Community Q&A - Ask Anything Session",
    streamerName: "Community Hub",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upcoming%20Live%20streams%28events%29%20ui%20design-MeOl6uHhKrJSNkkAb7kC3kVPO9RE6Y.png",
    waitingCount: "67 waiting",
    scheduledTime: "Scheduled for 9/11/25, 8:00 PM",
    category: "Community",
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
]

export const MediaCards = ({ selectedZone, selectedEvent, collapsed }: MediaCardsProps) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isBookmarked).map((item) => item.id)),
  )
  const [notifiedItems, setNotifiedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter((item) => item.isNotified).map((item) => item.id)),
  )

  // State for managing streams
  const [liveStreams, setLiveStreams] = useState<Stream[]>(initialLiveStreams)
  const [recentStreams, setRecentStreams] = useState<Stream[]>(initialRecentStreams)
  const [upcomingStreams, setUpcomingStreams] = useState<Stream[]>(initialUpcomingStreams)
  const [isLoadingContent, setIsLoadingContent] = useState(false)
  const [hasMoreContent, setHasMoreContent] = useState(true)
  const [additionalContent, setAdditionalContent] = useState({
    live: [] as typeof additionalLiveStreams,
    recent: [] as typeof additionalRecentStreams,
    upcoming: [] as typeof additionalUpcomingStreams,
  })
  const [hasLoadedMore, setHasLoadedMore] = useState(false)

  const loadMoreContent = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate loading more streams - you can replace this with actual API calls
    const newLiveStreams = additionalLiveStreams.filter(
      stream => !liveStreams.some(existing => existing.id === stream.id)
    )
    const newRecentStreams = additionalRecentStreams.filter(
      stream => !recentStreams.some(existing => existing.id === stream.id)
    )
    const newUpcomingStreams = additionalUpcomingStreams.filter(
      stream => !upcomingStreams.some(existing => existing.id === stream.id)
    )

    // Check if there's more content to load
    const hasMore = newLiveStreams.length > 0 || newRecentStreams.length > 0 || newUpcomingStreams.length > 0

    return {
      liveStreams: newLiveStreams,
      recentStreams: newRecentStreams,
      upcomingStreams: newUpcomingStreams,
      hasMore
    }
  }

  // const handleLoadMoreContent = async () => {
  //   setIsLoadingContent(true)
  //   try {
  //     const { liveStreams: newLive, recentStreams: newRecent, upcomingStreams: newUpcoming, hasMore } = await loadMoreContent()
      
  //     // Add new streams to existing ones
  //     if (newLive.length > 0) {
  //       setLiveStreams(prev => [...prev, ...newLive])
  //     }
  //     if (newRecent.length > 0) {
  //       setRecentStreams(prev => [...prev, ...newRecent])
  //     }
  //     if (newUpcoming.length > 0) {
  //       setUpcomingStreams(prev => [...prev, ...newUpcoming])
  //     }

  //     setHasMoreContent(hasMore)
      
  //     console.log("[v0] Loading more content...")
  //     console.log(`Added ${newLive.length} live streams, ${newRecent.length} recent streams, ${newUpcoming.length} upcoming streams`)
      
  //   } catch (error) {
  //     console.error("Failed to load more content:", error)
  //   } finally {
  //     setIsLoadingContent(false)
  //   }
  // }

    const handleLoadMoreContent = async () => {
    setIsLoadingContent(true)
    try {
      await loadMoreContent()
      setAdditionalContent({
        live: additionalLiveStreams,
        recent: additionalRecentStreams,
        upcoming: additionalUpcomingStreams,
      })
      setHasLoadedMore(true)
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
    <div className="space-y-8 ">
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

        <div className={`space-y-4 ${collapsed ? 'max-w-[1157px]' : 'max-w-[965px]'} `}>
          <ShortsCarousel shorts={shortsData} />
        </div>
      </div>

      {/* Additional content loaded after clicking Load More */}
      {hasLoadedMore && (
        <>
          {additionalContent.live.length > 0 && (
            <div className="space-y-4">
              <SectionHeader
                title="Live Streams"
                description="Ongoing live streams"
                icon={<div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {additionalContent.live.map((stream) => (
                  <StreamCard key={stream.id} stream={stream} type="live" />
                ))}
              </div>
            </div>
          )}

          {additionalContent.recent.length > 0 && (
            <div className="space-y-4">
              <SectionHeader title="Recent Streams" description="Recently concluded streams" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {additionalContent.recent.map((stream) => (
                  <StreamCard key={stream.id} stream={stream} type="recent" />
                ))}
              </div>
            </div>
          )}

          {additionalContent.upcoming.length > 0 && (
            <div className="space-y-4">
              <SectionHeader title="Upcoming Streams" description="Scheduled streams" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {additionalContent.upcoming.map((stream) => (
                  <StreamCard key={stream.id} stream={stream} type="upcoming" />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          className="hover:bg-[#DBEAFE] hover:border hover:border-[#DBEAFE] hover:text-black bg-transparent min-w-[160px]"
          onClick={handleLoadMoreContent}
          disabled={isLoadingContent || hasLoadedMore}
        >
          {isLoadingContent ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : hasLoadedMore ? (
            "All Content Loaded"
          ) : (
            "Load More Content"
          )}
        </Button>
      </div>
    </div>
  )
}