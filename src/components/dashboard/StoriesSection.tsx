// import React, { useState, useEffect } from 'react';
// import { StoriesList } from './StoriesList';
// import { StoriesViewer } from './StoriesViewer';
// import { StoriesSectionSkeleton } from './StoriesSkeletons';

// interface Story {
//   id: string;
//   title: string;
//   author: string;
//   thumbnail: string;
//   duration: string;
//   isLive?: boolean;
//   viewCount?: string;
// }

// const mockStories: Story[] = [
//   {
//     id: '1',
//     title: 'UEFA Friendship Cup',
//     author: 'UEFA Official',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '2:45',
//     viewCount: '1.2M'
//   },
//   {
//     id: '2',
//     title: 'Zone 3 Championship',
//     author: 'Zone 3 Events',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '1:30',
//     isLive: true,
//     viewCount: '45K'
//   },
//   {
//     id: '3',
//     title: 'Community Highlights',
//     author: 'PC Community',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '3:20',
//     viewCount: '890K'
//   },
//   {
//     id: '4',
//     title: 'Live Tournament',
//     author: 'Global Events',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '4:15',
//     isLive: true,
//     viewCount: '234K'
//   },
//   {
//     id: '5',
//     title: 'Weekly Recap',
//     author: 'PC Community',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '2:10',
//     viewCount: '567K'
//   },
//     {
//     id: '6',
//     title: 'Weekly Recap',
//     author: 'PC Community',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '2:10',
//     viewCount: '567K'
//   },
//     {
//     id: '7',
//     title: 'Weekly Recap',
//     author: 'PC Community',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '2:10',
//     viewCount: '567K'
//   },
//     {
//     id: '8',
//     title: 'Weekly Recap',
//     author: 'PC Community',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '2:10',
//     viewCount: '567K'
//   },
//     {
//     id: '9',
//     title: 'Weekly Recap',
//     author: 'PC Community',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '2:10',
//     viewCount: '567K'
//   },
//     {
//     id: '10',
//     title: 'Weekly Recap',
//     author: 'PC Community',
//     thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//     duration: '2:10',
//     viewCount: '567K'
//   }
// ];

// export const StoriesSection: React.FC = () => {
//   const [selectedStory, setSelectedStory] = useState<Story | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   // const [filteredStories, setFilteredStories] = useState<Story[]>(mockStories);
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading stories (replace with your actual data fetching)
//   useEffect(() => {
//     const loadStories = async () => {
//       setIsLoading(true);
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 3600));
      
//       // Replace this with your actual data fetching logic
//       // const stories = await fetchStories();
//       const stories = mockStories; // Your existing mock data
      
//       setIsLoading(false);
//     };

//     loadStories();
//   }, []);

//   const handleStoryClick = (story: Story, index: number) => {
//     setCurrentIndex(index);
//     setSelectedStory(story);
//   };

//   const handleCloseViewer = () => {
//     setSelectedStory(null);
//   };

//   const handleNextStory = () => {
//     const nextIndex = (currentIndex + 1) % mockStories.length;
//     setCurrentIndex(nextIndex);
//     setSelectedStory(mockStories[nextIndex]);
//   };

//   const handlePreviousStory = () => {
//     const prevIndex = currentIndex === 0 ? mockStories.length - 1 : currentIndex - 1;
//     setCurrentIndex(prevIndex);
//     setSelectedStory(mockStories[prevIndex]);
//   };

//   // const handleFilterChange = (level: 'global' | 'zone', selectedZone?: string, selectedEvent?: string) => {
//   //   // Here you would filter your stories based on the selected criteria
//   //   // For now, we'll just log the selection
//   //   console.log('Filter changed:', { level, selectedZone, selectedEvent });
    
//   //   // Example filtering logic (you can implement your own)
//   //   let filtered = mockStories;
    
//   //   if (selectedEvent) {
//   //     // Filter stories by specific event
//   //     filtered = mockStories.filter(story => 
//   //       story.title.toLowerCase().includes(selectedEvent.toLowerCase()) ||
//   //       story.author.toLowerCase().includes(selectedEvent.toLowerCase())
//   //     );
//   //   } else if (selectedZone && level === 'zone') {
//   //     // Filter stories by zone (you'd implement this based on your data structure)
//   //     filtered = mockStories.filter(story => 
//   //       // This is just an example - you'd implement based on your story data structure
//   //       story.author.toLowerCase().includes('zone') || 
//   //       story.title.toLowerCase().includes('zone')
//   //     );
//   //   }
    
//   //   setFilteredStories(filtered);
//   //   setCurrentIndex(0);
//   //   setSelectedStory(null);
//   // };

//     // Show skeleton while loading
//   if (isLoading) {
//     return <StoriesSectionSkeleton />;
//   }
//   return (
//     <>
//       <StoriesList 
//         stories={mockStories}
//         onStoryClick={handleStoryClick}
//         // onFilterChange={handleFilterChange}
//       />
      
//       <StoriesViewer
//         story={selectedStory}
//         isOpen={selectedStory !== null}
//         onClose={handleCloseViewer}
//         onNext={handleNextStory}
//         onPrevious={handlePreviousStory}
//       />
//     </>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { StoriesList } from './StoriesList';
// import { StoriesViewer } from './StoriesViewer';
// import { StoriesSectionSkeleton } from './StoriesSkeletons';

// // Updated interfaces
// interface Clip {
//   id: string;
//   type: 'video' | 'image';
//   url: string;
//   thumbnail?: string;
//   duration?: string;
// }

// interface Event {
//   id: string;
//   title: string;
//   author: string;
//   clips: Clip[];
//   isLive?: boolean;
//   viewCount?: string;
//   timestamp?: string;
// }

// // UPDATED: Mock data with multiple clips per event
// const mockEvents: Event[] = [
//   {
//     id: '1',
//     title: 'UEFA Friendship Cup',
//     author: 'UEFA Official',
//     clips: [
//       {
//         id: '1-1',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       },
//       {
//         id: '1-2',
//         type: 'video',
//         url: 'https://go.screenpal.com/watch/cTQlXAnophI',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '0:30'
//       },
//       {
//         id: '1-3',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       }
//     ],
//     viewCount: '1.2M',
//     timestamp: '2 hours ago'
//   },
//   {
//     id: '2',
//     title: 'Zone 3 Championship',
//     author: 'Zone 3 Events',
//     clips: [
//       {
//         id: '2-1',
//         type: 'video',
//         url: 'https://go.screenpal.com/watch/cTQlXAnophI',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '1:30'
//       },
//       {
//         id: '2-2',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       }
//     ],
//     isLive: true,
//     viewCount: '45K',
//     timestamp: '30 minutes ago'
//   },
//   {
//     id: '3',
//     title: 'Community Highlights',
//     author: 'PC Community',
//     clips: [
//       {
//         id: '3-1',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       }
//     ],
//     viewCount: '890K',
//     timestamp: '1 day ago'
//   },
//   {
//     id: '4',
//     title: 'Live Tournament',
//     author: 'Global Events',
//     clips: [
//       {
//         id: '4-1',
//         type: 'video',
//         url: 'https://example.com/video4.mp4',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '2:15'
//       },
//       {
//         id: '4-2',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       },
//       {
//         id: '4-3',
//         type: 'video',
//         url: 'https://go.screenpal.com/watch/cTQlXAnophI',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '1:45'
//       }
//     ],
//     isLive: true,
//     viewCount: '234K',
//     timestamp: '1 hour ago'
//   },
//   {
//     id: '5',
//     title: 'Weekly Recap',
//     author: 'PC Community',
//     clips: [
//       {
//         id: '5-1',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       },
//       {
//         id: '5-2',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       }
//     ],
//     viewCount: '567K',
//     timestamp: '3 days ago'
//   },
//   {
//     id: '6',
//     title: 'Match Highlights',
//     author: 'Sports Center',
//     clips: [
//       {
//         id: '6-1',
//         type: 'video',
//         url: 'https://go.screenpal.com/watch/cTQlXAnophI',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '3:20'
//       }
//     ],
//     viewCount: '1.5M',
//     timestamp: '5 hours ago'
//   },
//   {
//     id: '7',
//     title: 'Player Interviews',
//     author: 'Media Team',
//     clips: [
//       {
//         id: '7-1',
//         type: 'video',
//         url: 'https://go.screenpal.com/watch/cTQlXAnophI',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '2:10'
//       },
//       {
//         id: '7-2',
//         type: 'video',
//         url: 'https://go.screenpal.com/watch/cTQlXAnophI',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '1:55'
//       },
//       {
//         id: '7-3',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       }
//     ],
//     viewCount: '890K',
//     timestamp: '6 hours ago'
//   },
//   {
//     id: '8',
//     title: 'Behind the Scenes',
//     author: 'Production Team',
//     clips: [
//       {
//         id: '8-1',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       },
//       {
//         id: '8-2',
//         type: 'video',
//         url: 'https://go.screenpal.com/watch/cTQlXAnophI',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '2:30'
//       }
//     ],
//     viewCount: '445K',
//     timestamp: '8 hours ago'
//   },
//   {
//     id: '9',
//     title: 'Fan Zone',
//     author: 'Fan Community',
//     clips: [
//       {
//         id: '9-1',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       },
//       {
//         id: '9-2',
//         type: 'image',
//         url: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg'
//       },
//       {
//         id: '9-3',
//         type: 'video',
//         url: 'https://example.com/video9.mp4',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '1:20'
//       }
//     ],
//     viewCount: '723K',
//     timestamp: '12 hours ago'
//   },
//   {
//     id: '10',
//     title: 'Training Session',
//     author: 'Coaching Staff',
//     clips: [
//       {
//         id: '10-1',
//         type: 'video',
//         url: 'https://example.com/video10.mp4',
//         thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
//         duration: '4:15'
//       }
//     ],
//     viewCount: '334K',
//     timestamp: '1 day ago'
//   }
// ];

// export const StoriesSection: React.FC = () => {
//   // UPDATED: Changed variable names from story-related to event-related
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Changed from selectedStory
//   const [currentEventIndex, setCurrentEventIndex] = useState(0); // Changed from currentIndex
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading stories (replace with your actual data fetching)
//   useEffect(() => {
//     const loadEvents = async () => { // Changed from loadStories
//       setIsLoading(true);
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Reduced from 3600 to 1000
      
//       // Replace this with your actual data fetching logic
//       // const events = await fetchEvents();
//       const events = mockEvents; // Your updated mock data
      
//       setIsLoading(false);
//     };

//     loadEvents();
//   }, []);

//   // UPDATED: Function names and parameters
//   const handleEventClick = (event: Event, index: number) => { // Changed from handleStoryClick
//     setCurrentEventIndex(index);
//     setSelectedEvent(event);
//   };

//   const handleCloseViewer = () => {
//     setSelectedEvent(null);
//   };

//   // UPDATED: Changed to work with events instead of stories
//   const handleNextEvent = () => { // Changed from handleNextStory
//     const nextIndex = (currentEventIndex + 1) % mockEvents.length;
//     setCurrentEventIndex(nextIndex);
//     setSelectedEvent(mockEvents[nextIndex]);
//   };

//   const handlePreviousEvent = () => { // Changed from handlePreviousStory
//     const prevIndex = currentEventIndex === 0 ? mockEvents.length - 1 : currentEventIndex - 1;
//     setCurrentEventIndex(prevIndex);
//     setSelectedEvent(mockEvents[prevIndex]);
//   };

//   // Commented out filter functionality (you can uncomment and adapt as needed)
//   // const handleFilterChange = (level: 'global' | 'zone', selectedZone?: string, selectedEvent?: string) => {
//   //   // Here you would filter your events based on the selected criteria
//   //   console.log('Filter changed:', { level, selectedZone, selectedEvent });
    
//   //   let filtered = mockEvents;
    
//   //   if (selectedEvent) {
//   //     filtered = mockEvents.filter(event => 
//   //       event.title.toLowerCase().includes(selectedEvent.toLowerCase()) ||
//   //       event.author.toLowerCase().includes(selectedEvent.toLowerCase())
//   //     );
//   //   } else if (selectedZone && level === 'zone') {
//   //     filtered = mockEvents.filter(event => 
//   //       event.author.toLowerCase().includes('zone') || 
//   //       event.title.toLowerCase().includes('zone')
//   //     );
//   //   }
    
//   //   setFilteredEvents(filtered);
//   //   setCurrentEventIndex(0);
//   //   setSelectedEvent(null);
//   // };

//   // Show skeleton while loading
//   if (isLoading) {
//     return <StoriesSectionSkeleton />;
//   }

//   return (
//     <>
//       <StoriesList 
//         events={mockEvents} // Changed from stories={mockStories}
//         onEventClick={handleEventClick} // Changed from onStoryClick={handleStoryClick}
//         // onFilterChange={handleFilterChange}
//       />
      
//       <StoriesViewer
//         event={selectedEvent} // Changed from story={selectedStory}
//         isOpen={selectedEvent !== null}
//         onClose={handleCloseViewer}
//         onNextEvent={handleNextEvent} // Changed from onNext={handleNextStory}
//         onPreviousEvent={handlePreviousEvent} // Changed from onPrevious={handlePreviousStory}
//       />
//     </>
//   );
// };


import type React from "react"
import { useState, useEffect } from "react"
import { StoriesList } from "./StoriesList"
import { StoriesViewer } from "./StoriesViewer"
import { StoriesSectionSkeleton } from "./StoriesSkeletons"

interface Clip {
  id: string
  type: "video" | "image"
  url: string
  thumbnail?: string
  duration?: number // Changed to number for react-insta-stories
}

interface Event {
  id: string
  title: string
  author: string
  clips: Clip[]
  isLive?: boolean
  viewCount?: string
  timestamp?: string
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "UEFA Friendship Cup",
    author: "UEFA Official",
    clips: [
      {
        id: "1-1",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
      {
        id: "1-2",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        duration: 30000, // 30 seconds in milliseconds
      },
      {
        id: "1-3",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
    ],
    viewCount: "1.2M",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Zone 3 Championship",
    author: "Zone 3 Events",
    clips: [
      {
        id: "2-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        duration: 90000, // 90 seconds
      },
      {
        id: "2-2",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
    ],
    isLive: true,
    viewCount: "45K",
    timestamp: "30 minutes ago",
  },
  {
    id: "3",
    title: "Community Highlights",
    author: "PC Community",
    clips: [
      {
        id: "3-1",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
    ],
    viewCount: "890K",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    title: "Live Tournament",
    author: "Global Events",
    clips: [
      {
        id: "4-1",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        duration: 135000, // 2:15
      },
      {
        id: "4-2",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
      {
        id: "4-3",
        type: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        duration: 105000, // 1:45
      },
    ],
    isLive: true,
    viewCount: "234K",
    timestamp: "1 hour ago",
  },
  {
    id: "5",
    title: "Weekly Recap",
    author: "PC Community",
    clips: [
      {
        id: "5-1",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
      {
        id: "5-2",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
    ],
    viewCount: "567K",
    timestamp: "3 days ago",
  },
    {
    id: "6",
    title: "Weekly Recap",
    author: "PC Community",
    clips: [
      {
        id: "6-1",
        type: "image",
        url: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
      {
        id: "6-2",
        type: "video",
        url: "https://go.screenpal.com/watch/cTQlXAnophI",
        thumbnail: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
      },
    ],
    viewCount: "567K",
    timestamp: "3 days ago",
  },
]

export const StoriesSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }

    loadEvents()
  }, [])

  const handleEventClick = (event: Event, index: number) => {
    setCurrentEventIndex(index)
    setSelectedEvent(event)
  }

  const handleCloseViewer = () => {
    setSelectedEvent(null)
  }

  const handleNextEvent = () => {
    const nextIndex = (currentEventIndex + 1) % mockEvents.length
    console.log(nextIndex)
    setCurrentEventIndex(nextIndex)
    setSelectedEvent(mockEvents[nextIndex])
  }

  const handlePreviousEvent = () => {
    const prevIndex = currentEventIndex === 0 ? mockEvents.length - 1 : currentEventIndex - 1
    setCurrentEventIndex(prevIndex)
    setSelectedEvent(mockEvents[prevIndex])
  }

  if (isLoading) {
    return <StoriesSectionSkeleton />
  }

  return (
    <>
      <StoriesList events={mockEvents} onEventClick={handleEventClick} />

      <StoriesViewer
        event={selectedEvent}
        isOpen={selectedEvent !== null}
        onClose={handleCloseViewer}
        onNextEvent={handleNextEvent}
        onPreviousEvent={handlePreviousEvent}
      />
    </>
  )
}
