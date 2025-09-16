// // "use client"

// // import { useState } from "react"
// // import { EventCard } from "./EventCard"
// // // import { CardStack } from "./EventStack"
// // import { cn } from "@/lib/utils";
// // import { EventStack } from "./EventStack";

// // // Mock event data
// // const events = [
// //   {
// //     id: 1,
// //     title: "Tech Conference 2024",
// //     date: "2024-03-15",
// //     time: "09:00 AM",
// //     location: "San Francisco, CA",
// //     category: "Technology",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Join industry leaders for cutting-edge tech discussions and networking.",
// //     attendees: 250,
// //   },
  
// //   {
// //     id: 2,
// //     title: "AI Workshop Series",
// //     date: "2024-03-18",
// //     time: "02:00 PM",
// //     location: "Online",
// //     category: "Technology",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Hands-on workshop covering machine learning fundamentals.",
// //     attendees: 150,
// //   },
// //   {
// //     id: 3,
// //     title: "Design Thinking Summit",
// //     date: "2024-03-20",
// //     time: "10:00 AM",
// //     location: "New York, NY",
// //     category: "Design",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Explore innovative design methodologies and user experience.",
// //     attendees: 180,
// //   },
// //   {
// //     id: 4,
// //     title: "UX/UI Masterclass",
// //     date: "2024-03-22",
// //     time: "01:00 PM",
// //     location: "Los Angeles, CA",
// //     category: "Design",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Advanced techniques for modern interface design.",
// //     attendees: 120,
// //   },
// //   {
// //     id: 5,
// //     title: "Marketing Analytics Deep Dive",
// //     date: "2024-03-25",
// //     time: "11:00 AM",
// //     location: "Chicago, IL",
// //     category: "Marketing",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Data-driven strategies for modern marketing campaigns.",
// //     attendees: 200,
// //   },
// //   {
// //     id: 6,
// //     title: "Content Strategy Workshop",
// //     date: "2024-03-28",
// //     time: "03:00 PM",
// //     location: "Austin, TX",
// //     category: "Marketing",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Build compelling content that converts and engages.",
// //     attendees: 90,
// //   },
// //     {
// //     id: 7,
// //     title: "Tech Conference 2024",
// //     date: "2024-03-15",
// //     time: "09:00 AM",
// //     location: "San Francisco, CA",
// //     category: "Technology",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Join industry leaders for cutting-edge tech discussions and networking.",
// //     attendees: 250,
// //   },

// //     {
// //     id: 8,
// //     title: "Tech Conference 2024",
// //     date: "2024-03-15",
// //     time: "09:00 AM",
// //     location: "San Francisco, CA",
// //     category: "Technology",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Join industry leaders for cutting-edge tech discussions and networking.",
// //     attendees: 250,
// //   },
// //     {
// //     id: 9,
// //     title: "Tech Conference 2024",
// //     date: "2024-03-15",
// //     time: "09:00 AM",
// //     location: "San Francisco, CA",
// //     category: "Technology",
// //     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
// //     description: "Join industry leaders for cutting-edge tech discussions and networking.",
// //     attendees: 250,
// //   },
// // ]

// // // export const Highlight = ({
// // //   children,
// // //   className,
// // // }: {
// // //   children: React.ReactNode;
// // //   className?: string;
// // // }) => {
// // //   return (
// // //     <span
// // //       className={cn(
// // //         "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
// // //         className
// // //       )}
// // //     >
// // //       {children}
// // //     </span>
// // //   );
// // // };

// // // const CARDS = [
// // //   {
// // //     id: 0,
// // //     name: "Manu Arora",
// // //     designation: "Senior Software Engineer",
// // //     content: (
// // //       <p>
// // //         These cards are amazing, <Highlight>I want to use them</Highlight> in my
// // //         project. Framer motion is a godsend ngl tbh fam 🙏
// // //       </p>
// // //     ),
// // //   },
// // //   {
// // //     id: 1,
// // //     name: "Elon Musk",
// // //     designation: "Senior Shitposter",
// // //     content: (
// // //       <p>
// // //         I dont like this Twitter thing,{" "}
// // //         <Highlight>deleting it right away</Highlight> because yolo. Instead, I
// // //         would like to call it <Highlight>X.com</Highlight> so that it can easily
// // //         be confused with adult sites.
// // //       </p>
// // //     ),
// // //   },
// // //   {
// // //     id: 2,
// // //     name: "Tyler Durden",
// // //     designation: "Manager Project Mayhem",
// // //     content: (
// // //       <p>
// // //         The first rule of
// // //         <Highlight>Fight Club</Highlight> is that you do not talk about fight
// // //         club. The second rule of
// // //         <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
// // //         club.
// // //       </p>
// // //     ),
// // //   },
// // // ];

// // export function EventsGrid() {

// //   return (
// //     <div className="space-y-6">

// //         {/* Grid view - all events in a grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {events.map((event) => (
// //             <EventCard key={event.id} event={event} />
// //           ))}
// //         </div>
// //         <EventStack />

// //     </div>
// //   )
// // }

// "use client"

// import { useState, useMemo } from "react"
// import { EventCard } from "./EventCard"
// import { EventStack } from "./EventStack"
// import { cn } from "@/lib/utils"

// // Mock event data
// const events = [
//   {
//     id: 1,
//     title: "Tech Conference 2024",
//     date: "2024-03-15",
//     time: "09:00 AM",
//     location: "San Francisco, CA",
//     category: "Technology",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Join industry leaders for cutting-edge tech discussions and networking.",
//     attendees: 250,
//   },
//   {
//     id: 2,
//     title: "AI Workshop Series",
//     date: "2024-03-18",
//     time: "02:00 PM",
//     location: "Online",
//     category: "Technology",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Hands-on workshop covering machine learning fundamentals.",
//     attendees: 150,
//   },
//   {
//     id: 3,
//     title: "Design Thinking Summit",
//     date: "2024-03-20",
//     time: "10:00 AM",
//     location: "New York, NY",
//     category: "Design",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Explore innovative design methodologies and user experience.",
//     attendees: 180,
//   },
//   {
//     id: 4,
//     title: "UX/UI Masterclass",
//     date: "2024-03-22",
//     time: "01:00 PM",
//     location: "Los Angeles, CA",
//     category: "Design",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Advanced techniques for modern interface design.",
//     attendees: 120,
//   },
//   {
//     id: 5,
//     title: "Marketing Analytics Deep Dive",
//     date: "2024-03-25",
//     time: "11:00 AM",
//     location: "Chicago, IL",
//     category: "Marketing",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Data-driven strategies for modern marketing campaigns.",
//     attendees: 200,
//   },
//   {
//     id: 6,
//     title: "Content Strategy Workshop",
//     date: "2024-03-28",
//     time: "03:00 PM",
//     location: "Austin, TX",
//     category: "Marketing",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Build compelling content that converts and engages.",
//     attendees: 90,
//   },
//   {
//     id: 7,
//     title: "DevOps Summit",
//     date: "2024-04-01",
//     time: "09:00 AM",
//     location: "Seattle, WA",
//     category: "Technology",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Modern deployment and infrastructure strategies.",
//     attendees: 300,
//   },
//   {
//     id: 8,
//     title: "Creative Workshop",
//     date: "2024-04-05",
//     time: "02:00 PM",
//     location: "Portland, OR",
//     category: "Design",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Unleash your creativity with hands-on design exercises.",
//     attendees: 75,
//   },
//   {
//     id: 9,
//     title: "Digital Marketing Trends",
//     date: "2024-04-10",
//     time: "11:00 AM",
//     location: "Denver, CO",
//     category: "Marketing",
//     image: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//     description: "Stay ahead with the latest marketing trends and strategies.",
//     attendees: 160,
//   },
// ]

// // Available categories for event stacks
// const availableCategories = ["Technology", "Design", "Marketing"]

// export function EventsGrid() {
//   // Generate random positions for event stacks
//   const gridItemsWithStacks = useMemo(() => {
//     const items = []
//     let eventIndex = 0
    
//     // Calculate total grid positions (assuming we want about 12-15 items total)
//     const totalPositions = Math.max(12, events.length + availableCategories.length)
    
//     // Generate random positions for event stacks (ensure they're spread out)
//     const stackPositions = new Set()
//     const numStacks = Math.min(availableCategories.length, 3) // Max 3 stacks
//     const minDistanceBetweenStacks = 4 // Minimum 4 positions between stacks
    
//     // First stack position (not in first 3 positions)
//     let attempts = 0
//     while (stackPositions.size < numStacks && attempts < 50) {
//       const randomPos = stackPositions.size === 0 
//         ? Math.floor(Math.random() * (totalPositions - 6)) + 3 // First stack starts from position 3
//         : Math.floor(Math.random() * totalPositions)
      
//       // Check if position is far enough from existing stacks
//       let validPosition = true
//       for (const existingPos of stackPositions) {
//         if (Math.abs(randomPos - existingPos) < minDistanceBetweenStacks) {
//           validPosition = false
//           break
//         }
//       }
      
//       if (validPosition && randomPos < totalPositions - 2) { // Ensure not in last 2 positions
//         stackPositions.add(randomPos)
//       }
//       attempts++
//     }
    
//     const stackPositionsArray = Array.from(stackPositions).sort((a, b) => a - b)
//     let stackIndex = 0
    
//     // Fill the grid
//     for (let i = 0; i < totalPositions; i++) {
//       if (stackPositionsArray.includes(i) && stackIndex < availableCategories.length) {
//         // Add event stack
//         items.push({
//           type: 'stack',
//           key: `stack-${availableCategories[stackIndex]}`,
//           category: availableCategories[stackIndex],
//         })
//         stackIndex++
//       } else if (eventIndex < events.length) {
//         // Add regular event card
//         items.push({
//           type: 'event',
//           key: `event-${events[eventIndex].id}`,
//           event: events[eventIndex],
//         })
//         eventIndex++
//       }
//     }
    
//     return items
//   }, []) // Empty dependency array to maintain stable positions

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {gridItemsWithStacks.map((item) => {
//           if (item.type === 'stack') {
//             return (
//               <div key={item.key} className="flex justify-center">
//                 <EventStack 
//                   category={item.category}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             )
//           } else {
//             return (
//               <EventCard key={item.key} event={item.event} />
//             )
//           }
//         })}
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useMemo, useEffect } from "react"
// import { EventCard } from "./EventCard"
// import { EventStack } from "./EventStack"
// import { cn } from "@/lib/utils"

// export function EventsGrid({ 
//   pageType = "all", // "all", "zone", "global", "saved"
//   userId = null,
//   zoneId = null,
//   showStacks = true,
//   stackCategories = ["Technology", "Design", "Marketing"],
//   className = "",
//   events = null, // Allow passing events directly
//   loading = false,
//   error = null
// }) {
//   const [allEvents, setAllEvents] = useState(events || [])
//   const [isLoading, setIsLoading] = useState(loading)
//   const [fetchError, setFetchError] = useState(error)

//   // Fetch events based on page type
//   useEffect(() => {
//     if (events) {
//       setAllEvents(events)
//       return
//     }

//     const fetchEvents = async () => {
//       setIsLoading(true)
//       setFetchError(null)
      
//       try {
//         let endpoint = ""
//         let queryParams = new URLSearchParams()

//         switch (pageType) {
//           case "zone":
//             endpoint = `/api/zones/${zoneId}/events`
//             break
//           case "global":
//             endpoint = "/api/events/global" // or "/api/community/events"
//             break
//           case "saved":
//             endpoint = `/api/users/${userId}/saved-events`
//             break
//           case "all":
//           default:
//             endpoint = "/api/events"
//             break
//         }

//         const response = await fetch(`${endpoint}?${queryParams}`)
//         if (!response.ok) {
//           throw new Error(`Failed to fetch events: ${response.statusText}`)
//         }
        
//         const fetchedEvents = await response.json()
//         setAllEvents(fetchedEvents.events || fetchedEvents) // Handle different API response formats
//       } catch (err) {
//         setFetchError(err.message)
//         console.error("Error fetching events:", err)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchEvents()
//   }, [pageType, userId, zoneId, events])

//   // Configure stacks based on page type
//   const getStackConfig = () => {
//     switch (pageType) {
//       case "zone":
//         return {
//           show: showStacks,
//           categories: stackCategories,
//           maxStacks: 2, // Fewer stacks for zone-specific events
//           apiEndpoint: `/api/zones/${zoneId}/categories`
//         }
//       case "global":
//         return {
//           show: showStacks,
//           categories: ["Community", "Networking", "Workshop"],
//           maxStacks: 3,
//           apiEndpoint: "/api/categories/global"
//         }
//       case "saved":
//         return {
//           show: false, // No stacks for saved events - just show saved events
//           categories: [],
//           maxStacks: 0
//         }
//       case "all":
//       default:
//         return {
//           show: showStacks,
//           categories: stackCategories,
//           maxStacks: 3,
//           apiEndpoint: "/api/categories"
//         }
//     }
//   }

//   const stackConfig = getStackConfig()

//   // Generate grid layout with appropriate spacing for stacks
//   const gridItemsWithStacks = useMemo(() => {
//     if (allEvents.length === 0) return []
    
//     const items = []
//     let eventIndex = 0
    
//     // Calculate total positions
//     const basePositions = Math.max(12, allEvents.length + (stackConfig.show ? stackConfig.maxStacks : 0))
//     const totalPositions = Math.min(basePositions, allEvents.length + stackConfig.maxStacks + 3)
    
//     if (!stackConfig.show || stackConfig.maxStacks === 0) {
//       // No stacks - just return events
//       return allEvents.map(event => ({
//         type: 'event',
//         key: `event-${event.id}`,
//         event: event,
//       }))
//     }

//     // Generate stack positions with proper spacing
//     const stackPositions = new Set()
//     const minDistanceBetweenStacks = pageType === "zone" ? 5 : 4
    
//     let attempts = 0
//     while (stackPositions.size < stackConfig.maxStacks && attempts < 50) {
//       const randomPos = stackPositions.size === 0 
//         ? Math.floor(Math.random() * (totalPositions - 8)) + 3
//         : Math.floor(Math.random() * totalPositions)
      
//       let validPosition = true
//       for (const existingPos of stackPositions) {
//         if (Math.abs(randomPos - existingPos) < minDistanceBetweenStacks) {
//           validPosition = false
//           break
//         }
//       }
      
//       if (validPosition && randomPos < totalPositions - 2) {
//         stackPositions.add(randomPos)
//       }
//       attempts++
//     }
    
//     const stackPositionsArray = Array.from(stackPositions).sort((a, b) => a - b)
//     let stackIndex = 0
    
//     // Fill the grid
//     for (let i = 0; i < totalPositions; i++) {
//       if (stackPositionsArray.includes(i) && stackIndex < stackConfig.categories.length) {
//         items.push({
//           type: 'stack',
//           key: `stack-${stackConfig.categories[stackIndex]}-${pageType}`,
//           category: stackConfig.categories[stackIndex],
//         })
//         stackIndex++
//       } else if (eventIndex < allEvents.length) {
//         items.push({
//           type: 'event',
//           key: `event-${allEvents[eventIndex].id}`,
//           event: allEvents[eventIndex],
//         })
//         eventIndex++
//       }
//     }
    
//     return items
//   }, [allEvents, stackConfig, pageType])

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className={cn("space-y-6", className)}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="bg-muted animate-pulse rounded-lg h-64" />
//           ))}
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   if (fetchError) {
//     return (
//       <div className={cn("space-y-6", className)}>
//         <div className="text-center py-12">
//           <p className="text-muted-foreground mb-4">Failed to load events</p>
//           <p className="text-sm text-red-500">{fetchError}</p>
//         </div>
//       </div>
//     )
//   }

//   // Empty state
//   if (allEvents.length === 0) {
//     const emptyMessages = {
//       all: "No events found. Check back later for upcoming events.",
//       zone: "No events in this zone yet. Be the first to create one!",
//       global: "No community events available at the moment.",
//       saved: "You haven't saved any events yet. Browse events and save your favorites!"
//     }

//     return (
//       <div className={cn("space-y-6", className)}>
//         <div className="text-center py-12">
//           <p className="text-muted-foreground">
//             {emptyMessages[pageType]}
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className={cn("space-y-6", className)}>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {gridItemsWithStacks.map((item) => {
//           if (item.type === 'stack') {
//             return (
//               <div key={item.key} className="flex justify-center">
//                 <EventStack 
//                   category={item.category}
//                   pageType={pageType}
//                   zoneId={zoneId}
//                   apiEndpoint={stackConfig.apiEndpoint}
//                   className="transform hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             )
//           } else {
//             return (
//               <EventCard 
//                 key={item.key} 
//                 event={item.event}
//                 pageType={pageType}
//                 showSaveButton={pageType !== "saved"}
//               />
//             )
//           }
//         })}
//       </div>
//     </div>
//   )
// }

import { useState, useMemo, useEffect } from "react"
import { EventCard } from "./EventCard"
import { EventStack } from "./EventStack"
import { cn } from "@/lib/utils"
import { Event, EventsGridProps, StackConfig, GridItem, PageType } from "@/types/events"

export const EventsGrid: React.FC<EventsGridProps> = ({ 
  pageType = "all", // "all", "zone", "global", "saved"
  userId = null,
  zoneId = null,
  showStacks = true,
  stackCategories = ["Technology", "Design", "Marketing"],
  className = "",
  events = null, // Allow passing events directly
  loading = false,
  error = null
}) => {
  const [allEvents, setAllEvents] = useState<Event[]>(events || [])
  const [isLoading, setIsLoading] = useState<boolean>(loading)
  const [fetchError, setFetchError] = useState<string | null>(error)

  // Fetch events based on page type
  useEffect(() => {
    if (events) {
      setAllEvents(events)
      return
    }

    const fetchEvents = async () => {
      setIsLoading(true)
      setFetchError(null)
      
      try {
        let endpoint = ""
        let queryParams = new URLSearchParams()

        switch (pageType) {
          case "zone":
            endpoint = `/api/zones/${zoneId}/events`
            break
          case "global":
            endpoint = "/api/events/global" // or "/api/community/events"
            break
          case "saved":
            endpoint = `/api/users/${userId}/saved-events`
            break
          case "all":
          default:
            endpoint = "/api/events"
            break
        }

        const response = await fetch(`${endpoint}?${queryParams}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`)
        }
        
        const fetchedEvents = await response.json()
        setAllEvents(fetchedEvents.events || fetchedEvents) // Handle different API response formats
      } catch (err: any) {
        setFetchError(err.message)
        console.error("Error fetching events:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [pageType, userId, zoneId, events])

  // Configure stacks based on page type
  const getStackConfig = (): StackConfig => {
    switch (pageType) {
      case "zone":
        return {
          show: showStacks,
          categories: stackCategories,
          maxStacks: 2, // Fewer stacks for zone-specific events
          apiEndpoint: `/api/zones/${zoneId}/categories`
        }
      case "global":
        return {
          show: showStacks,
          categories: ["Community", "Networking", "Workshop"],
          maxStacks: 3,
          apiEndpoint: "/api/categories/global"
        }
      case "saved":
        return {
          show: false, // No stacks for saved events - just show saved events
          categories: [],
          maxStacks: 0
        }
      case "all":
      default:
        return {
          show: showStacks,
          categories: stackCategories,
          maxStacks: 3,
          apiEndpoint: "/api/categories"
        }
    }
  }

  const stackConfig = getStackConfig()

  // Generate grid layout with appropriate spacing for stacks
  const gridItemsWithStacks = useMemo((): GridItem[] => {
    if (allEvents.length === 0) return []
    
    const items = []
    let eventIndex = 0
    
    // Calculate total positions
    const basePositions = Math.max(12, allEvents.length + (stackConfig.show ? stackConfig.maxStacks : 0))
    const totalPositions = Math.min(basePositions, allEvents.length + stackConfig.maxStacks + 3)
    
    if (!stackConfig.show || stackConfig.maxStacks === 0) {
      // No stacks - just return events
      return allEvents.map(event => ({
        type: 'event',
        key: `event-${event.id}`,
        event: event,
      }))
    }

    // Generate stack positions with proper spacing
    const stackPositions = new Set()
    const minDistanceBetweenStacks = pageType === "zone" ? 5 : 4
    
    let attempts = 0
    while (stackPositions.size < stackConfig.maxStacks && attempts < 50) {
      const randomPos = stackPositions.size === 0 
        ? Math.floor(Math.random() * (totalPositions - 8)) + 3
        : Math.floor(Math.random() * totalPositions)
      
      let validPosition = true
      for (const existingPos of stackPositions) {
        if (Math.abs(randomPos - existingPos) < minDistanceBetweenStacks) {
          validPosition = false
          break
        }
      }
      
      if (validPosition && randomPos < totalPositions - 2) {
        stackPositions.add(randomPos)
      }
      attempts++
    }
    
    const stackPositionsArray = Array.from(stackPositions).sort((a, b) => a - b)
    let stackIndex = 0
    
    // Fill the grid
    for (let i = 0; i < totalPositions; i++) {
      if (stackPositionsArray.includes(i) && stackIndex < stackConfig.categories.length) {
        items.push({
          type: 'stack',
          key: `stack-${stackConfig.categories[stackIndex]}-${pageType}`,
          category: stackConfig.categories[stackIndex],
        })
        stackIndex++
      } else if (eventIndex < allEvents.length) {
        items.push({
          type: 'event',
          key: `event-${allEvents[eventIndex].id}`,
          event: allEvents[eventIndex],
        })
        eventIndex++
      }
    }
    
    return items
  }, [allEvents, stackConfig, pageType])

  // Loading state
  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-muted animate-pulse rounded-lg h-64" />
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (fetchError) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Failed to load events</p>
          {/* <p className="text-sm text-red-500">{fetchError}</p> */}
        </div>
      </div>
    )
  }

  // Empty state
  if (allEvents.length === 0) {
    const emptyMessages = {
      all: "No events found. Check back later for upcoming events.",
      zone: "No events in this zone yet. Be the first to create one!",
      global: "No community events available at the moment.",
      saved: "You haven't saved any events yet. Browse events and save your favorites!"
    }

    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {emptyMessages[pageType]}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridItemsWithStacks.map((item) => {
          if (item.type === 'stack') {
            return (
              <div key={item.key} className="flex justify-center">
                <EventStack 
                  category={item.category}
                  pageType={pageType}
                  zoneId={zoneId}
                  apiEndpoint={stackConfig.apiEndpoint}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            )
          } else {
            return (
              <EventCard 
                key={item.key} 
                event={item.event}
                // pageType={pageType}
                // showSaveButton={pageType !== "saved"}
              />
            )
          }
        })}
      </div>
    </div>
  )
}