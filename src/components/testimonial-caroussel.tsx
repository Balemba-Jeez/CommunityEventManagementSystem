"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  companyImage: string
  companyName: string
  quote: string
  authorName: string
  authorRole: string
  authorLocation: string
  authorImage?: string
}

interface TestimonialCarouselProps {
  apiEndpoint?: string
  staticData?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    companyImage: "/generic-company-logo.png",
    companyName: "Wireflow",
    quote: "120 members actively participate in events.",
    authorName: "Mary Johnson",
    authorRole: "Zone Event coordinator",
    authorLocation: "Douala",
  },
  {
    id: "2",
    companyImage: "/generic-company-logo.png",
    companyName: "Rireflow",
    quote: "95 members actively participate in events.",
    authorName: "Marie Tabi",
    authorRole: "Zone Event coordinator",
    authorLocation: "Yaounde",
  },
  {
    id: "3",
    companyImage: "/generic-company-logo.png",
    companyName: "Wireflow",
    quote: "80 members actively participate in events.",
    authorName: "Samuel Mbu",
    authorRole: "Zone Event coordinator",
    authorLocation: "Limbe",
  },
  {
    id: "4",
    companyImage: "/generic-company-logo.png",
    companyName: "TechCorp",
    quote: "150 members actively participate in events.",
    authorName: "John Doe",
    authorRole: "Zone Event coordinator",
    authorLocation: "Buea",
  },
  {
    id: "5",
    companyImage: "/generic-company-logo.png",
    companyName: "InnovateLab",
    quote: "110 members actively participate in events.",
    authorName: "Jane Smith",
    authorRole: "Zone Event coordinator",
    authorLocation: "Bamenda",
  },
  {
    id: "6",
    companyImage: "/generic-company-logo.png",
    companyName: "FutureTech",
    quote: "130 members actively participate in events.",
    authorName: "David Brown",
    authorRole: "Zone Event coordinator",
    authorLocation: "Garoua",
  },
]

export function TestimonialCarousel({ apiEndpoint, staticData }: TestimonialCarouselProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticData || defaultTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(!!apiEndpoint)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Fetch testimonials from API if endpoint is provided
  useEffect(() => {
    if (!apiEndpoint) {
      setIsLoading(false)
      return
    }

    const fetchTestimonials = async () => {
      try {
        const response = await fetch(apiEndpoint)
        if (!response.ok) throw new Error("Failed to fetch testimonials")

        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        // Fallback to static data on error
        setTestimonials(staticData || defaultTestimonials)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [apiEndpoint, staticData])

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const getTransformValue = () => {
    const percentage = (currentIndex * 100) / itemsPerPage
    return percentage
  }

  if (isLoading) {
    return (
      <section className="bg-[#11183b] py-28 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-white text-lg">Loading testimonials...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#11183b] py-28 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-[52px] leading-[120%] tracking-[0.52px] font-semibold text-white mb-6">
            Voices from Every Zone
          </h2>
          <p className="text-lg leading-[160%] text-white">
            Stories, experiences, and insights from Apostolic Pastors' Children across all zones.
          </p>
        </div>

        {/* Testimonial Cards Carousel */}
        <div className="mb-8 overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${getTransformValue()}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="border-2 border-white rounded-[32px] bg-[#11183b] p-8 flex flex-col gap-8 flex-shrink-0"
                style={{
                  width: `calc((100% - ${(itemsPerPage - 1) * 2}rem) / ${itemsPerPage})`,
                }}
              >
                <div className="flex flex-col gap-12">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.companyImage || "/placeholder.svg"}
                      alt={testimonial.companyName}
                      className="w-12 h-12 object-contain"
                    />
                    <h3 className="text-xl font-semibold text-white">{testimonial.companyName}</h3>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p className="text-lg leading-[160%] text-white">{testimonial.quote}</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-400 flex-shrink-0">
                        {testimonial.authorImage && (
                          <img
                            src={testimonial.authorImage || "/placeholder.svg"}
                            alt={testimonial.authorName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-base leading-[160%] font-semibold text-white">{testimonial.authorName}</p>
                        <p className="text-base leading-[160%] text-white">
                          {testimonial.authorRole}, {testimonial.authorLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
                  View more
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "w-2 h-2 rounded-full bg-white transition-opacity",
                  currentIndex === index ? "opacity-100" : "opacity-20",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              className="border-2 border-white rounded p-3 bg-[#11183b] hover:bg-white/10 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="border-2 border-white rounded p-3 bg-[#11183b] hover:bg-white/10 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
