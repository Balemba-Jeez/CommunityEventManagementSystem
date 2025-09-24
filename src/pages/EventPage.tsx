// import EventDetailTop from "@/components/events/event-detail-top"

// export default function EventPage() {
//   return (
//     <main className="min-h-screen">
//       <EventDetailTop
//         eventTitle="Dinner Party"
//         eventDate="Saturday, Feb 23 2019"
//         eventTime="5:00 PM - 11:00 PM"
//         location="5323 Gilroy St Gilroy, CA"
//         eventDateTime="2024-12-25T17:00:00Z"
//         hasStream={true}
//         eventImage="https://images.unsplash.com/photo-1703883635837-932563331641?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmlnZXJpYW4lMjBjdWx0dXJlfGVufDB8fDB8fHww"
//       />

//       {/* Additional sections can be added here */}
//       <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
//         {/* About Section */}
//         <section>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
//           <div className="prose prose-gray max-w-none">
//             <p className="text-gray-700 leading-relaxed">
//               We are hosting a dinner party just for our best clients. We are excited to see you there. The event will
//               be held on Saturday under a beautiful starry night in Gilroy on Mt. Hamilton.
//             </p>
//             <p className="text-gray-700 leading-relaxed mt-4">
//               Join us for an evening of great food, wonderful company, and memorable conversations. This exclusive
//               gathering is our way of showing appreciation for your continued partnership and trust.
//             </p>
//           </div>
//         </section>

//         {/* Organizer Section */}
//         <section>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Organizer</h2>
//           <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
//             <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
//               <span className="text-2xl">🏢</span>
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-gray-900">American Bar</h3>
//               <p className="text-gray-600 mt-1">
//                 Premium event organizer specializing in exclusive dining experiences and corporate gatherings.
//               </p>
//               <div className="flex items-center space-x-4 mt-3">
//                 <span className="text-sm text-gray-500">📞 (415)444-3434</span>
//                 <span className="text-sm text-gray-500">✉️ dino_runolfsdottir@yahoo.com</span>
//                 <a href="http://www.hilltopgilroy.com" className="text-sm text-blue-600 hover:text-blue-700">
//                   🌐 www.hilltopgilroy.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Related Events Section */}
//         <section>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Events</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
//               >
//                 <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-900 mb-2">Upcoming Event {i}</h3>
//                   <p className="text-sm text-gray-600 mb-2">March {15 + i}, 2024</p>
//                   <p className="text-xs text-gray-500">6:00 PM - 10:00 PM</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </main>
//   )
// }

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EventDetailTop from "@/components/events/event-detail-top"
import { EventCard } from "@/components/events/EventCard"
import { useAuth } from "@/context/AuthContext";

interface Event {
  id: number
  title: string
  description: string
  start_time: string
  end_time: string
  location: string
  image_url: string
  status: string
  zone_id: number
  organizer_id: number
  live_status: string
  live_stream_url: string
  live_playback_url: string
  category_name: string
  organizer_name: string
  zone_name?: string
}

interface EventPageState {
  event: Event | null
  relatedEvents: Event[]
  loading: boolean
  error: string | null
}

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const [state, setState] = useState<EventPageState>({
    event: null,
    relatedEvents: [],
    loading: true,
    error: null
  })
  const { token, authLoading } = useAuth();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long", 
      day: "numeric",
      year: "numeric"
    })
  }

  // Format time for display
  const formatTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
    const end = new Date(endTime).toLocaleTimeString("en-US", {
      hour: "numeric", 
      minute: "2-digit",
      hour12: true
    })
    return `${start} - ${end}`
  }

  // Fetch event data
  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) {
        console.log(eventId)
        setState(prev => ({ ...prev, error: "No event ID provided", loading: false }))
        return
      }

      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        

        // Fetch main event
        const eventResponse = await fetch(`http://localhost:3000/api/events/member/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!eventResponse.ok) {
          throw new Error(`Failed to fetch event: ${eventResponse.statusText}`)
        }

        const eventData = await eventResponse.json()
        const event = eventData.event

        // Fetch related events (same category, excluding current event)
        const relatedResponse = await fetch(`http://localhost:3000/api/events/member?category=${event.category_name}&light=false`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        let relatedEvents = []
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json()
          // Filter out current event and limit to 3
          relatedEvents = (relatedData.events || [])
            .filter((e: Event) => e.id !== event.id)
            .slice(0, 3)
        }

        setState({
          event,
          relatedEvents,
          loading: false,
          error: null
        })

      } catch (error) {
        console.error('Error fetching event data:', error)
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to load event',
          loading: false
        }))
      }
    }

    fetchEventData()
  }, [eventId])

  // Loading state
  if (state.loading) {
    return (
      <main className="min-h-screen">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    )
  }

  // Error state
  if (state.error || !state.event) {
    return (
      <main className="min-h-screen">
        <div className="flex items-center justify-center h-96 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-6">{state.error || "The event you're looking for doesn't exist."}</p>
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    )
  }

  const { event, relatedEvents } = state

  return (
    <main className="min-h-screen">
      <EventDetailTop
        eventTitle={event.title}
        eventDate={formatDate(event.start_time)}
        eventTime={formatTime(event.start_time, event.end_time)}
        location={event.location}
        eventDateTime={event.start_time}
        hasStream={!!event.live_stream_url}
        eventImage={event.image_url}
      />
      
      {/* Additional sections */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        
        {/* About Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Status:</span>{' '}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'published' ? 'bg-green-100 text-green-800' :
                    event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Category:</span>{' '}
                  <span className="text-gray-600">{event.category_name}</span>
                </div>
                {event.zone_name && (
                  <div>
                    <span className="font-medium text-gray-900">Zone:</span>{' '}
                    <span className="text-gray-600">{event.zone_name}</span>
                  </div>
                )}
                {event.live_status && (
                  <div>
                    <span className="font-medium text-gray-900">Live Status:</span>{' '}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.live_status === 'active' ? 'bg-red-100 text-red-800' :
                      event.live_status === 'ended' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.live_status.charAt(0).toUpperCase() + event.live_status.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Organizer Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Organizer</h2>
          <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {event.organizer_name || 'Event Organizer'}
              </h3>
              <p className="text-gray-600 mt-1">
                Organizing events to bring the community together.
              </p>
              <div className="flex items-center space-x-4 mt-3">
                <span className="text-sm text-gray-500">📧 Contact organizer for more details</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <EventCard
                  key={relatedEvent.id}
                  event={{
                    id: relatedEvent.id,
                    title: relatedEvent.title,
                    description: relatedEvent.description,
                    date: relatedEvent.start_time,
                    time: formatTime(relatedEvent.start_time, relatedEvent.end_time),
                    location: relatedEvent.location,
                    category: relatedEvent.category_name,
                    image: relatedEvent.image_url
                  }}
                  variant="list"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}