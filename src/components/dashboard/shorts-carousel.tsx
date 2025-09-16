"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ShortCard } from "./short-card"
import { Loader2 } from "lucide-react"

interface Short {
  id: string
  title: string
  thumbnail: string
  viewCount: string
  category: string
}

interface ShortsCarouselProps {
  shorts: Short[]
  onLoadMore?: () => Promise<Short[]>
//   width: string
}

export const ShortsCarousel = ({ shorts: initialShorts, onLoadMore }: ShortsCarouselProps) => {
  const [shorts, setShorts] = useState<Short[]>(initialShorts)
//   const [isLoading, setIsLoading] = useState(false)
//   const [hasMore, setHasMore] = useState(true)

//   const handleLoadMore = async () => {
//     if (!onLoadMore || isLoading) return

//     setIsLoading(true)
//     try {
//       const newShorts = await onLoadMore()
//       if (newShorts.length === 0) {
//         setHasMore(false)
//       } else {
//         setShorts((prev) => [...prev, ...newShorts])
//       }
//     } catch (error) {
//       console.error("Failed to load more shorts:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
          loop: false,
          dragFree: true
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-4">
          {shorts.map((short) => (
            <CarouselItem key={short.id} className="pl-2 md:pl-4 basis-[180px] md:basis-[200px]">
              <ShortCard short={short} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#F4F6F7] border border-gray-200  text-gray-600 hover:text-[text-gray-600] shadow-md" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#F4F6F7] border border-gray-200  text-gray-600 hover:text-[text-gray-600] shadow-md" />
      </Carousel>
    </div>
  )
}
