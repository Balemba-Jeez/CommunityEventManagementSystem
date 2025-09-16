// "use client"

// import { useState, useEffect } from "react"
// import { CardStack } from "@/components/ui/card-stack"
// import { Badge } from "@/components/ui/badge"
// import { CalendarDays, MapPin } from "lucide-react"
// import { cn } from "@/lib/utils"

// // This would typically come from your API
// const mockCategoryEvents = {
//   "Technology": [
//     {
//       id: 1,
//       title: "AI Workshop Series",
//       date: "2024-03-18",
//       time: "02:00 PM",
//       location: "Online",
//       category: "Technology",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Hands-on workshop covering machine learning fundamentals.",
//     },
//     {
//       id: 2,
//       title: "Tech Conference 2024",
//       date: "2024-03-15",
//       time: "09:00 AM",
//       location: "San Francisco, CA",
//       category: "Technology",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Join industry leaders for cutting-edge tech discussions.",
//     },
//     {
//       id: 3,
//       title: "DevOps Summit",
//       date: "2024-03-22",
//       time: "10:00 AM",
//       location: "Seattle, WA",
//       category: "Technology",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Modern deployment and infrastructure strategies.",
//     },
//   ],
//   "Design": [
//     {
//       id: 4,
//       title: "Design Thinking Summit",
//       date: "2024-03-20",
//       time: "10:00 AM",
//       location: "New York, NY",
//       category: "Design",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Explore innovative design methodologies.",
//     },
//     {
//       id: 5,
//       title: "UX/UI Masterclass",
//       date: "2024-03-22",
//       time: "01:00 PM",
//       location: "Los Angeles, CA",
//       category: "Design",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Advanced techniques for modern interface design.",
//     },
//   ],
//   "Marketing": [
//     {
//       id: 6,
//       title: "Marketing Analytics Deep Dive",
//       date: "2024-03-25",
//       time: "11:00 AM",
//       location: "Chicago, IL",
//       category: "Marketing",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Data-driven strategies for modern marketing.",
//     },
//     {
//       id: 7,
//       title: "Content Strategy Workshop",
//       date: "2024-03-28",
//       time: "03:00 PM",
//       location: "Austin, TX",
//       category: "Marketing",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Build compelling content that converts.",
//     },
//   ]
// }

// export function EventStack({ category = "Technology", className }) {
//   const [categoryEvents, setCategoryEvents] = useState([])

//   useEffect(() => {
//     // In a real app, you would fetch from your categories API here
//     // const fetchCategoryEvents = async () => {
//     //   const response = await fetch(`/api/categories/${category}/events`)
//     //   const events = await response.json()
//     //   setCategoryEvents(events)
//     // }
    
//     // For now, using mock data
//     const events = mockCategoryEvents[category] || []
//     const formattedEvents = events.map(event => ({
//       id: event.id,
//       name: event.title,
//       designation: `${event.date} at ${event.time} • ${event.location}`,
//       content: (
//         <div className="relative w-full h-40 rounded-xl overflow-hidden group">
//           <img 
//             src={event.image} 
//             alt={event.title}
//             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
//           <div className="absolute top-3 right-3">
//             <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
//               {event.category}
//             </Badge>
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
//             <p className="text-white text-sm line-clamp-2">
//               {event.description}
//             </p>
//           </div>
//         </div>
//       ),
//     }))
    
//     setCategoryEvents(formattedEvents)
//   }, [category])

//   // Generate concatenated title for the bottom (like YouTube mix playlists)
//   const concatenatedTitles = categoryEvents
//     .map(event => event.name)
//     .join(" • ")

//   if (categoryEvents.length === 0) return null

//   return (
//     <div className={cn("relative", className)}>
//       <div className="flex flex-col items-center">
//         {/* Card Stack */}
//         <div className="relative">
//           <CardStack 
//             items={categoryEvents} 
//             offset={8} 
//             scaleFactor={0.06} 
//           />
//         </div>
        
//         {/* Category Badge and Title */}
//         <div className="mt-4 text-center max-w-xs">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <Badge variant="outline" className="text-xs">
//               {category} Mix
//             </Badge>
//             <span className="text-xs text-muted-foreground">
//               {categoryEvents.length} events
//             </span>
//           </div>
          
//           {/* Concatenated titles like YouTube */}
//           <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
//             {concatenatedTitles}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { CardStack } from "@/components/ui/card-stack"
// import { Badge } from "@/components/ui/badge"
// import { CalendarDays, MapPin } from "lucide-react"
// import { cn } from "@/lib/utils"

// // This would typically come from your API
// const mockCategoryEvents = {
//   "Technology": [
//     {
//       id: 1,
//       title: "AI Workshop Series",
//       date: "2024-03-18",
//       time: "02:00 PM",
//       location: "Online",
//       category: "Technology",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Hands-on workshop covering machine learning fundamentals.",
//     },
//     {
//       id: 2,
//       title: "Tech Conference 2024",
//       date: "2024-03-15",
//       time: "09:00 AM",
//       location: "San Francisco, CA",
//       category: "Technology",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Join industry leaders for cutting-edge tech discussions.",
//     },
//     {
//       id: 3,
//       title: "DevOps Summit",
//       date: "2024-03-22",
//       time: "10:00 AM",
//       location: "Seattle, WA",
//       category: "Technology",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Modern deployment and infrastructure strategies.",
//     },
//   ],
//   "Design": [
//     {
//       id: 4,
//       title: "Design Thinking Summit",
//       date: "2024-03-20",
//       time: "10:00 AM",
//       location: "New York, NY",
//       category: "Design",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Explore innovative design methodologies.",
//     },
//     {
//       id: 5,
//       title: "UX/UI Masterclass",
//       date: "2024-03-22",
//       time: "01:00 PM",
//       location: "Los Angeles, CA",
//       category: "Design",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Advanced techniques for modern interface design.",
//     },
//   ],
//   "Marketing": [
//     {
//       id: 6,
//       title: "Marketing Analytics Deep Dive",
//       date: "2024-03-25",
//       time: "11:00 AM",
//       location: "Chicago, IL",
//       category: "Marketing",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Data-driven strategies for modern marketing.",
//     },
//     {
//       id: 7,
//       title: "Content Strategy Workshop",
//       date: "2024-03-28",
//       time: "03:00 PM",
//       location: "Austin, TX",
//       category: "Marketing",
//       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       description: "Build compelling content that converts.",
//     },
//   ]
// }

// export function EventStack({ 
//   category = "Technology", 
//   className,
//   pageType = "all",
//   zoneId = null,
//   apiEndpoint = "/api/categories"
// }) {
//   const [categoryEvents, setCategoryEvents] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchCategoryEvents = async () => {
//       setIsLoading(true)
//       try {
//         let endpoint = ""
        
//         // Determine API endpoint based on page type
//         switch (pageType) {
//           case "zone":
//             endpoint = `/api/zones/${zoneId}/categories/${category}/events`
//             break
//           case "global":
//             endpoint = `/api/categories/${category}/events?type=global`
//             break
//           case "all":
//           default:
//             endpoint = `/api/categories/${category}/events`
//             break
//         }

//         // const response = await fetch(endpoint)
//         // const events = await response.json()
        
//         // For now, using mock data with different categories per page type
//         let events = []
//         if (pageType === "zone") {
//           events = mockCategoryEvents[category]?.slice(0, 3) || [] // Fewer events for zone
//         } else if (pageType === "global") {
//           events = mockCategoryEvents[category] || []
//         } else {
//           events = mockCategoryEvents[category] || []
//         }
        
//         setIsLoading(false)
//         const formattedEvents = events.map(event => ({
//           id: event.id,
//           name: event.title,
//           designation: `${event.date} at ${event.time} • ${event.location}`,
//           content: (
//             <div className="relative w-full h-48 rounded-xl overflow-hidden group">
//               <img 
//                 src={event.image} 
//                 alt={event.title}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
//               <div className="absolute top-3 right-3">
//                 <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
//                   {pageType === "zone" ? "Zone" : pageType === "global" ? "Global" : event.category}
//                 </Badge>
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
//                 <p className="text-white text-sm line-clamp-2">
//                   {event.description}
//                 </p>
//               </div>
//             </div>
//           ),
//         }))
        
//         setCategoryEvents(formattedEvents)
//       } catch (error) {
//         console.error("Error fetching category events:", error)
//         setCategoryEvents([])
//         setIsLoading(false)
//       }
//     }
    
//     fetchCategoryEvents()
//   }, [category, pageType, zoneId])

//   // Generate concatenated title for the bottom (like YouTube mix playlists)
//   const concatenatedTitles = categoryEvents
//     .map(event => event.name)
//     .join(" • ")

//   if (isLoading) {
//     return (
//       <div className={cn("relative", className)}>
//         <div className="animate-pulse">
//           <div className="bg-muted rounded-lg h-48 mb-4" />
//           <div className="bg-muted rounded h-4 w-20 mx-auto mb-2" />
//           <div className="bg-muted rounded h-3 w-32 mx-auto" />
//         </div>
//       </div>
//     )
//   }

//   if (categoryEvents.length === 0) return null

//   // Customize stack label based on page type
//   const getStackLabel = () => {
//     switch (pageType) {
//       case "zone":
//         return `${category} Zone Mix`
//       case "global":
//         return `Global ${category} Mix`
//       default:
//         return `${category} Mix`
//     }
//   }

//   return (
//     <div className={cn("relative", className)}>
//       <div className="flex flex-col items-center">
//         {/* Card Stack */}
//         <div className="relative">
//           <CardStack 
//             items={categoryEvents} 
//             offset={8} 
//             scaleFactor={0.06} 
//           />
//         </div>
        
//         {/* Category Badge and Title */}
//         <div className="mt-4 text-center max-w-xs">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <Badge variant="outline" className="text-xs">
//               {getStackLabel()}
//             </Badge>
//             <span className="text-xs text-muted-foreground">
//               {categoryEvents.length} events
//             </span>
//           </div>
          
//           {/* Concatenated titles like YouTube */}
//           <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
//             {concatenatedTitles}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from "react"
import { CardStack } from "@/components/ui/card-stack"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Event, EventStackProps, PageType } from "@/types/events"

// This would typically come from your API
const mockCategoryEvents: Record<string, Event[]> = {
  "Technology": [
    {
      id: 1,
      title: "AI Workshop Series",
      date: "2024-03-18",
      time: "02:00 PM",
      location: "Online",
      category: "Technology",
      image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      description: "Hands-on workshop covering machine learning fundamentals.",
    },
    {
      id: 2,
      title: "Tech Conference 2024",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "San Francisco, CA",
      category: "Technology",
      image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      description: "Join industry leaders for cutting-edge tech discussions.",
    },
    {
      id: 3,
      title: "DevOps Summit",
      date: "2024-03-22",
      time: "10:00 AM",
      location: "Seattle, WA",
      category: "Technology",
      image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      description: "Modern deployment and infrastructure strategies.",
    },
  ],
  "Design": [
    {
      id: 4,
      title: "Design Thinking Summit",
      date: "2024-03-20",
      time: "10:00 AM",
      location: "New York, NY",
      category: "Design",
      image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      description: "Explore innovative design methodologies.",
    },
    {
      id: 5,
      title: "UX/UI Masterclass",
      date: "2024-03-22",
      time: "01:00 PM",
      location: "Los Angeles, CA",
      category: "Design",
      image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      description: "Advanced techniques for modern interface design.",
    },
  ],
  "Marketing": [
    {
      id: 6,
      title: "Marketing Analytics Deep Dive",
      date: "2024-03-25",
      time: "11:00 AM",
      location: "Chicago, IL",
      category: "Marketing",
      image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      description: "Data-driven strategies for modern marketing.",
    },
    {
      id: 7,
      title: "Content Strategy Workshop",
      date: "2024-03-28",
      time: "03:00 PM",
      location: "Austin, TX",
      category: "Marketing",
      image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      description: "Build compelling content that converts.",
    },
  ]
}

export const EventStack: React.FC<EventStackProps> = ({ 
  category = "Technology", 
  className,
  pageType = "all",
  zoneId = null,
  apiEndpoint = "/api/categories"
}) => {
  const [categoryEvents, setCategoryEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCategoryEvents = async () => {
      setIsLoading(true)
      try {
        let endpoint = ""
        
        // Determine API endpoint based on page type
        switch (pageType) {
          case "zone":
            endpoint = `/api/zones/${zoneId}/categories/${category}/events`
            break
          case "global":
            endpoint = `/api/categories/${category}/events?type=global`
            break
          case "all":
          default:
            endpoint = `/api/categories/${category}/events`
            break
        }

        // const response = await fetch(endpoint)
        // const events = await response.json()
        
        // For now, using mock data with different categories per page type
        let events: Event[] = []
        if (pageType === "zone") {
          events = mockCategoryEvents[category]?.slice(0, 3) || [] // Fewer events for zone
        } else if (pageType === "global") {
          events = mockCategoryEvents[category] || []
        } else {
          events = mockCategoryEvents[category] || []
        }
        
        setIsLoading(false)
        const formattedEvents = events.map(event => ({
          id: event.id,
          name: event.title,
          designation: `${event.date} at ${event.time} • ${event.location}`,
          content: (
            <div className="relative w-full h-48 rounded-xl overflow-hidden group">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                  {pageType === "zone" ? "Zone" : pageType === "global" ? "Global" : event.category}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
          ),
        }))
        
        setCategoryEvents(formattedEvents)
      } catch (error: any) {
        console.error("Error fetching category events:", error)
        setCategoryEvents([])
        setIsLoading(false)
      }
    }
    
    fetchCategoryEvents()
  }, [category, pageType, zoneId])

  // Generate concatenated title for the bottom (like YouTube mix playlists)
  const concatenatedTitles = categoryEvents
    .map(event => event.name)
    .join(" • ")

  if (isLoading) {
    return (
      <div className={cn("relative", className)}>
        <div className="animate-pulse">
          <div className="bg-muted rounded-lg h-48 mb-4" />
          <div className="bg-muted rounded h-4 w-20 mx-auto mb-2" />
          <div className="bg-muted rounded h-3 w-32 mx-auto" />
        </div>
      </div>
    )
  }

  if (categoryEvents.length === 0) return null

  // Customize stack label based on page type
  const getStackLabel = (): string => {
    switch (pageType) {
      case "zone":
        return `${category} Zone Mix`
      case "global":
        return `Global ${category} Mix`
      default:
        return `${category} Mix`
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-col items-center">
        {/* Card Stack */}
        <div className="relative">
          <CardStack 
            items={categoryEvents} 
            offset={8} 
            scaleFactor={0.06} 
          />
        </div>
        
        {/* Category Badge and Title */}
        <div className="mt-4 text-center max-w-xs">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {getStackLabel()}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {categoryEvents.length} events
            </span>
          </div>
          
          {/* Concatenated titles like YouTube */}
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {concatenatedTitles}
          </p>
        </div>
      </div>
    </div>
  )
}