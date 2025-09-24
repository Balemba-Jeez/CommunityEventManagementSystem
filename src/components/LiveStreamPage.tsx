import React, { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import EventInfo from './EventInfo'
import LiveChat from './LiveChat'
import EventTabs from './EventTabs'
const LiveStreamPage = () => {
  const [activeTab, setActiveTab] = useState('about')
  const [viewCount, setViewCount] = useState(1245)
  const [likeCount, setLikeCount] = useState(342)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  // Simulate fluctuating view count for live effect
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 10) - 3
      setViewCount((prev) => Math.max(1000, prev + fluctuation))
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setIsLiked(!isLiked)
  }
  const eventData = {
    title: 'Annual Web Development Conference 2023',
    organizer: 'TechLearn Academy',
    date: 'Live Now • Started 2 hours ago',
    description:
      "Join us for our annual web development conference where industry experts share insights on the latest trends, tools, and best practices in web development. This year's focus is on performance optimization and modern frontend frameworks.",
    viewCount,
    likeCount,
  }
  const organizerInfo = {
    name: 'TechLearn Academy',
    subscribers: '1.2M subscribers',
    description:
      'TechLearn Academy provides high-quality tech education through online courses, live workshops, and annual conferences. We focus on web development, mobile app development, and cloud computing.',
    avatar:
      'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=2069&auto=format&fit=crop',
  }
  const relatedEvents = [
    {
      id: 1,
      title: 'Frontend Framework Comparison',
      organizer: 'TechLearn Academy',
      thumbnail:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kaW5nfGVufDB8fDB8fHww',
      viewers: '5.2K watching',
      live: true,
    },
    {
      id: 2,
      title: 'Backend Development Masterclass',
      organizer: 'CodeMasters',
      thumbnail:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww',
      viewers: '3.7K watching',
      live: true,
    },
    {
      id: 3,
      title: 'DevOps Essentials Workshop',
      organizer: 'Cloud Experts',
      thumbnail:
        'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
      viewers: '1.8K watching',
      live: true,
    },
    {
      id: 4,
      title: 'Mobile App Development Trends',
      organizer: 'App Builders',
      thumbnail:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww',
      viewers: '2.3K watching',
      live: false,
    },
  ]
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main content area */}
        <div className="flex-1">
          <VideoPlayer />
          <EventInfo
            eventData={eventData}
            handleLike={handleLike}
            isLiked={isLiked}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
          />
          <EventTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            eventData={eventData}
            organizerInfo={organizerInfo}
            relatedEvents={relatedEvents}
          />
        </div>
        {/* Live chat sidebar */}
        <div className="w-full lg:w-80 h-[calc(100vh-2rem)] lg:h-auto">
          <LiveChat />
        </div>
      </div>
    </div>
  )
}
export default LiveStreamPage