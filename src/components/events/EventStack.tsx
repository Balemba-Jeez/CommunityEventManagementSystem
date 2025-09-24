

// import { useState, useEffect } from "react"
// import { CardStack } from "@/components/ui/card-stack"
// import { Badge } from "@/components/ui/badge"
// import { CalendarDays, MapPin } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Event, EventStackProps, PageType } from "@/types/events"
// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";


// // This would typically come from your API
// // const mockCategoryEvents: Record<string, Event[]> = {
// //   "Technology": [
// //     {
// //       id: 1,
// //       title: "AI Workshop Series",
// //       date: "2024-03-18",
// //       time: "02:00 PM",
// //       location: "Online",
// //       category: "Technology",
// //       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //       description: "Hands-on workshop covering machine learning fundamentals.",
// //     },
// //     {
// //       id: 2,
// //       title: "Tech Conference 2024",
// //       date: "2024-03-15",
// //       time: "09:00 AM",
// //       location: "San Francisco, CA",
// //       category: "Technology",
// //       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //       description: "Join industry leaders for cutting-edge tech discussions.",
// //     },
// //     {
// //       id: 3,
// //       title: "DevOps Summit",
// //       date: "2024-03-22",
// //       time: "10:00 AM",
// //       location: "Seattle, WA",
// //       category: "Technology",
// //       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //       description: "Modern deployment and infrastructure strategies.",
// //     },
// //   ],
// //   "Design": [
// //     {
// //       id: 4,
// //       title: "Design Thinking Summit",
// //       date: "2024-03-20",
// //       time: "10:00 AM",
// //       location: "New York, NY",
// //       category: "Design",
// //       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //       description: "Explore innovative design methodologies.",
// //     },
// //     {
// //       id: 5,
// //       title: "UX/UI Masterclass",
// //       date: "2024-03-22",
// //       time: "01:00 PM",
// //       location: "Los Angeles, CA",
// //       category: "Design",
// //       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //       description: "Advanced techniques for modern interface design.",
// //     },
// //   ],
// //   "Marketing": [
// //     {
// //       id: 6,
// //       title: "Marketing Analytics Deep Dive",
// //       date: "2024-03-25",
// //       time: "11:00 AM",
// //       location: "Chicago, IL",
// //       category: "Marketing",
// //       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //       description: "Data-driven strategies for modern marketing.",
// //     },
// //     {
// //       id: 7,
// //       title: "Content Strategy Workshop",
// //       date: "2024-03-28",
// //       time: "03:00 PM",
// //       location: "Austin, TX",
// //       category: "Marketing",
// //       image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //       description: "Build compelling content that converts.",
// //     },
// //   ]
// // }

// export const EventStack: React.FC<EventStackProps> = ({ 
//   category = "Cultural Festival", 
//   className,
//   pageType = "all",
//   zoneId = null,
//   apiEndpoint = "/api/categories"
// }) => {
//   const [categoryEvents, setCategoryEvents] = useState<any[]>([])
//   const [isLoading, setIsLoading] = useState<boolean>(true)
//   const { token, authLoading } = useAuth();


//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     })
//   }
  
// useEffect(() => {
//   if (authLoading) return; // Wait for auth to load

//   const fetchCategoryEvents = async () => {
//     setIsLoading(true)
//     try {
//       let endpoint = ""

//       switch (pageType) {
//         case "zone":
//           endpoint = `http://localhost:3000/api/events/member?category=${category}&zoneId=${zoneId}`
//           break
//         case "global":
//           endpoint = `http://localhost:3000/api/events/global?category=${category}`
//           break
//         case "all":
//         default:
//           endpoint = `http://localhost:3000/api/events?category=${category}`
//           break
//       }

//       const { data } = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })

//       const events = data.events || []

//       console.log('category', category)

//       console.log('stackEvents', data.events, events)

//       const formattedEvents = events.map(event => ({
//         id: event.id,
//         name: event.title,
//         designation: `${formatDate(event.start_time) + new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • ${event.location}`,
//         content: (
//           <div className="relative w-full h-[10rem] rounded-xl overflow-hidden group">
//             <img src={event.image_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
//             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"/>
//             <div className="absolute top-3 right-3">
//               <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
//                 {category}
//               </Badge>
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
//               <p className="text-white text-sm line-clamp-2">{event.description}</p>
//             </div>
//           </div>
//         ),
//       }))

//       setCategoryEvents(formattedEvents)
//     } catch (error) {
//       console.error("Error fetching category events:", error)
//       setCategoryEvents([])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (token) {
//     fetchCategoryEvents()
//   }
// }, [category, pageType, zoneId, token, authLoading])

  
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
//   const getStackLabel = (): string => {
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
//         <div className="mt-4 mr-[10.5rem] text-left max-w-xs">
//           <div className="flex items-center justify-start gap-2 mb-2">
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
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export const EventStack: React.FC<EventStackProps> = ({ 
  category = "Football", 
  className,
  pageType = "all",
  zoneId = null,
  apiEndpoint = "/api/categories"
}) => {
  const [categoryEvents, setCategoryEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { token, authLoading } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }
  
  useEffect(() => {
    if (authLoading) return; // Wait for auth to load
    if (!token) {
      setIsLoading(false)
      return
    }

    const fetchCategoryEvents = async () => {
      setIsLoading(true)
      try {
        // Use the unified endpoint for all cases
        const endpoint = `http://localhost:3000/api/events/member`
        
        // Build query parameters
        const queryParams: any = {
          category: category
        }

        // Add global flag for global events
        if (pageType === "global") {
          queryParams.global = "true"
        }

        console.log(`Fetching ${category} events for pageType: ${pageType}`, queryParams)

        const { data } = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: queryParams
        })

        const events = data.events || []

        console.log('category', category)
        console.log('stackEvents', events)

        // Limit events for stack display (3-4 events work well)
        const limitedEvents = events.slice(0, 4)

        const formattedEvents = limitedEvents.map((event: any) => ({
          id: event.id,
          name: event.title,
          designation: `${formatDate(event.start_time)} at ${new Date(event.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • ${event.location}`,
          content: (
            <div className="relative w-full h-[10rem] rounded-xl overflow-hidden group">
              <img 
                src={event.image_url || "/placeholder.svg"} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"/>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                  {pageType === "global" ? `${event.zone_name || 'Global'}` : category}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm line-clamp-2">{event.description}</p>
              </div>
            </div>
          ),
        }))

        setCategoryEvents(formattedEvents)
      } catch (error: any) {
        console.error(`Error fetching ${category} events:`, error)
        setCategoryEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryEvents()
  }, [category, pageType, zoneId, token, authLoading])

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

  if (categoryEvents.length === 0) {
    // Show placeholder when no events found
    return (
      <div className={cn("relative", className)}>
        <div className="flex flex-col items-center p-4 border-2 border-dashed border-muted rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              No {category.toLowerCase()} events
            </p>
            <Badge variant="outline" className="text-xs">
              {getStackLabel(pageType, category)}
            </Badge>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative  mt-4", className)}>
      <div className="flex flex-col items-center ">
        {/* Card Stack */}
        <div className="relative">
          <CardStack 
            items={categoryEvents} 
            offset={8} 
            scaleFactor={0.06} 
          />
        </div>
        
        {/* Category Badge and Title */}
        <div className="mt-4 mr-[10.5rem] text-left max-w-xs">
          <div className="flex items-center justify-start gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {getStackLabel(pageType, category)}
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

// Helper function to get stack label
function getStackLabel(pageType: PageType, category: string): string {
  switch (pageType) {
    case "zone":
      return `${category} Zone Mix`
    case "global":
      return `Global ${category} Mix`
    default:
      return `${category} Mix`
  }
}