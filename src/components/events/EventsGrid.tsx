
// import { useState, useMemo, useEffect } from "react"
// import { EventCard } from "./EventCard"
// import { EventStack } from "./EventStack"
// import { cn } from "@/lib/utils"
// import { Event, EventsGridProps, StackConfig, GridItem, PageType } from "@/types/events"
// import { useAuth } from "@/context/AuthContext";
// import axios from "axios";


// export const EventsGrid: React.FC<EventsGridProps> = ({ 
//   pageType = "all", // "all", "zone", "global", "saved"
//   userId = null,
//   zoneId = null,
//   showStacks = true,
//   stackCategories = ["Technology", "Design", "Marketing"],
//   className = "",
//   events = null, // Allow passing events directly
//   loading = false,
//   error = null
// }) => {
//   const [allEvents, setAllEvents] = useState<Event[]>(events || [])
//   const [isLoading, setIsLoading] = useState<boolean>(loading)
//   const [fetchError, setFetchError] = useState<string | null>(error)
//   const { token, authLoading } = useAuth();

//   if (loading) {
//   return (
//     <div className="text-center py-12">
//       <p>Loading user info...</p>
//     </div>
//   )
// }

//   // Transform API event to match EventCard props
//   const transformEventForCard = (e: any) => ({
//     id: e.id,
//     title: e.title,
//     description: e.description,
//     date: e.start_time,
//     time: e.start_time
//       ? new Date(e.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//       : "",
//     location: e.location,
//     category: e.category_name,
//     image: e.image_url || "/placeholder.svg",
//   });



//  // Fetch events based on page type (using axios)
// useEffect(() => {
//   if (authLoading) return; // wait until AuthContext finishes restoring token
//   if (!token) return; // no token, don’t fetch
//   if (events) {
//     setAllEvents(events)
//     return
//   }

//   const fetchEvents = async () => {
//     setIsLoading(true)
//     setFetchError(null)

//     try {
//       let endpoint = ""

//       switch (pageType) {
//         case "zone":
//           endpoint = `http://localhost:3000/api/events/member`
//           break
//         case "global":
//           endpoint = "/api/events/global"
//           break
//         case "saved":
//           endpoint = `/api/users/${userId}/saved-events`
//           break
//         case "all":
//         default:
//           endpoint = "http://localhost:3000/api/events/member"
//           break
//       }

//       const response = await axios.get(endpoint, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // 👈 send token
//         },
//         params: {
//           // optional query params if needed
//           // light: true,
//         },
//       })
      
//       console.log('events gotten from backend', response.data)
//       const fetchedEvents = response.data
      
//       setAllEvents(fetchedEvents.events || fetchedEvents)
//     } catch (err: any) {
//       setFetchError(err.response?.data?.message || err.message)
//       console.error("Error fetching events:", err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   fetchEvents()
// }, [pageType, userId, zoneId, events, token])


//   // Configure stacks based on page type
//   const getStackConfig = (): StackConfig => {
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
//   const gridItemsWithStacks = useMemo((): GridItem[] => {
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

//     console.log('gridItemsWithStacks',items)
    
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
//           {/* <p className="text-sm text-red-500">{fetchError}</p> */}
//         </div>
//       </div>
//     )
//   }

//   // Empty state
//   if (allEvents.length === 0) {
//     const emptyMessages = {
//       all: "No events found. Check back later for upcoming events.",
//       zone: "No events in this zone yet.",
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
//                   className="transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//                 />
//               </div>
//             )
//           } else {
//             return (
//               <EventCard 
//                 key={item.key} 
//                 // event={item.event}
//                 event={transformEventForCard(item.event)} // ← transform here
//                 // pageType={pageType}
//                 // showSaveButton={pageType !== "saved"}
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
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

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
  const { token, authLoading } = useAuth();

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Loading user info...</p>
      </div>
    )
  }

  // Transform API event to match EventCard props
  const transformEventForCard = (e: any) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    date: e.start_time,
    time: e.start_time
      ? new Date(e.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "",
    location: e.location,
    category: e.category_name,
    image: e.image_url || "/placeholder.svg",
  });

  // Get unique categories from actual events
  const availableCategories = useMemo(() => {
    // Ensure allEvents is an array before trying to map
    if (!Array.isArray(allEvents)) {
      console.log('allEvents is not an array:', typeof allEvents, allEvents)
      return []
    }
    
    const categories = allEvents
      .map(event => event.category_name)
      .filter(Boolean) // Remove null/undefined
      .filter((category, index, arr) => arr.indexOf(category) === index) // Remove duplicates
    
    console.log('Available categories from events:', categories)
    return categories
  }, [allEvents])

  // Fetch events based on page type (using axios)
  useEffect(() => {
    if (authLoading) return; // wait until AuthContext finishes restoring token
    if (!token) return; // no token, don't fetch
    if (events) {
      setAllEvents(events)
      return
    }

    const fetchEvents = async () => {
      setIsLoading(true)
      setFetchError(null)

      try {
        let endpoint = ""

        let queryParams = {}
        
        switch (pageType) {
          case "zone":
            endpoint = `http://localhost:3000/api/events/member`
            // No additional params needed - uses user's zone by default
            break
          case "global":
            endpoint = `http://localhost:3000/api/events/member`
            queryParams.global = "true" // Add global flag
            break
          case "saved":
            endpoint = `http://localhost:3000/api/users/${userId}/saved-events` // Fixed: added full URL
            break
          case "all":
          default:
            endpoint = "http://localhost:3000/api/events/member"
            break
        }

        const response = await axios.get(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 👈 send token
          },
          params: {
            ...queryParams,
            // Add other params as needed
            // light: true,
          },
        })
        
        console.log('events gotten from backend', response.data)
        const fetchedEvents = response.data
        
        // Ensure we're setting an array
        const eventsArray = fetchedEvents.events || fetchedEvents
        if (Array.isArray(eventsArray)) {
          setAllEvents(eventsArray)
        } else {
          console.error('Events data is not an array:', eventsArray)
          setAllEvents([])
        }
      } catch (err: any) {
        setFetchError(err.response?.data?.message || err.message)
        console.error("Error fetching events:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [pageType, userId, zoneId, events, token])

  // Configure stacks based on page type
  const getStackConfig = (): StackConfig => {
    switch (pageType) {
      case "zone":
        return {
          show: showStacks,
          // Use actual categories from events, fallback to stackCategories if no events yet
          categories: availableCategories.length > 0 ? availableCategories.slice(0, 2) : stackCategories.slice(0, 2),
          maxStacks: 2, // Fewer stacks for zone-specific events
          apiEndpoint: `/api/zones/${zoneId}/categories`
        }
      case "global":
        return {
          show: showStacks,
          categories: availableCategories.length > 0 ? availableCategories.slice(0, 3) : ["Community", "Networking", "Workshop"],
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
          categories: availableCategories.length > 0 ? availableCategories.slice(0, 3) : stackCategories,
          maxStacks: 3,
          apiEndpoint: "/api/categories"
        }
    }
  }

  const stackConfig = getStackConfig()

  console.log('Stack config:', stackConfig)

  // Generate grid layout with appropriate spacing for stacks
  const gridItemsWithStacks = useMemo((): GridItem[] => {
    if (allEvents.length === 0) return []
    
    const items = []
    let eventIndex = 0
    
    // Calculate total positions
    const basePositions = Math.max(12, allEvents.length + (stackConfig.show ? stackConfig.maxStacks : 0))
    const totalPositions = Math.min(basePositions, allEvents.length + stackConfig.maxStacks + 3)
    
    if (!stackConfig.show || stackConfig.maxStacks === 0 || stackConfig.categories.length === 0) {
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

    console.log('gridItemsWithStacks', items)
    
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
      zone: "No events in this zone yet.",
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
                  className="transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>
            )
          } else {
            return (
              <EventCard 
                key={item.key} 
                event={transformEventForCard(item.event)}
              />
            )
          }
        })}
      </div>
    </div>
  )
}