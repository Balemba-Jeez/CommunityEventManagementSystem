// import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent } from '@/components/ui/dialog';

// interface Story {
//   id: string;
//   title: string;
//   author: string;
//   thumbnail: string;
//   duration: string;
//   isLive?: boolean;
//   viewCount?: string;
// }

// interface StoriesViewerProps {
//   story: Story | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onNext: () => void;
//   onPrevious: () => void;
// }

// export const StoriesViewer: React.FC<StoriesViewerProps> = ({ 
//   story, 
//   isOpen, 
//   onClose, 
//   onNext, 
//   onPrevious 
// }) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md p-0 bg-black border-none">
//         {story && (
//           <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
//             <img
//               src={story.thumbnail}
//               alt={story.title}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.currentTarget.src = '/api/placeholder/360/640';
//               }}
//             />
            
//             {/* Story Controls */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30">
//               {/* Top Info */}
//               <div className="absolute top-4 left-4 right-4">
//                 <div className="flex items-center justify-between text-white">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//                       <span className="text-sm font-semibold">
//                         {story.author.slice(0, 1)}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold">{story.author}</p>
//                       <p className="text-xs opacity-75">{story.viewCount} views</p>
//                     </div>
//                   </div>
//                   {story.isLive && (
//                     <span className="live-badge">LIVE</span>
//                   )}
//                 </div>
//               </div>

//               {/* Navigation Arrows */}
//               <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={onPrevious}
//                   className="text-white hover:bg-white/20"
//                 >
//                   <ChevronLeft className="h-6 w-6" />
//                 </Button>
//               </div>
              
//               <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={onNext}
//                   className="text-white hover:bg-white/20"
//                 >
//                   <ChevronRight className="h-6 w-6" />
//                 </Button>
//               </div>

//               {/* Bottom Info */}
//               <div className="absolute bottom-4 left-4 right-4 text-white">
//                 <h3 className="text-lg font-semibold mb-2">{story.title}</h3>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm opacity-75">Duration: {story.duration}</span>
//                   <Button
//                     size="sm"
//                     className="bg-white/20 hover:bg-white/30 text-white border-white/30"
//                   >
//                     <Play className="h-4 w-4 mr-2" />
//                     Watch
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { useState, useEffect } from 'react';

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

// interface StoriesViewerProps {
//   event: Event | null; // Changed from 'story: Story | null' to 'event: Event | null'
//   isOpen: boolean;
//   onClose: () => void;
//   onNextEvent: () => void; // Changed from 'onNext' to 'onNextEvent'
//   onPreviousEvent: () => void; // Changed from 'onPrevious' to 'onPreviousEvent'
// }

// export const StoriesViewer: React.FC<StoriesViewerProps> = ({ 
//   event, // Changed from 'story' to 'event'
//   isOpen, 
//   onClose, 
//   onNextEvent, // Changed from 'onNext' to 'onNextEvent'
//   onPreviousEvent // Changed from 'onPrevious' to 'onPreviousEvent'
// }) => {
//   // NEW STATE for managing clips within an event
//   const [currentClipIndex, setCurrentClipIndex] = useState(0);
//   const [progress, setProgress] = useState(0);

//   // Reset clip index when event changes
//   useEffect(() => {
//     setCurrentClipIndex(0);
//     setProgress(0);
//   }, [event?.id]);

//   // NEW: Auto-progress simulation
//   useEffect(() => {
//     if (!isOpen || !event) return;

//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           // Auto advance to next clip
//           handleNextClip();
//           return 0;
//         }
//         return prev + 2; // Adjust speed as needed (2% every 100ms = 5 seconds per clip)
//       });
//     }, 100);

//     return () => clearInterval(interval);
//   }, [isOpen, event, currentClipIndex]);

//   // NEW: Handle clip navigation within an event
//   const handleNextClip = () => {
//     if (!event) return;
    
//     if (currentClipIndex < event.clips.length - 1) {
//       setCurrentClipIndex(prev => prev + 1);
//       setProgress(0);
//     } else {
//       // Move to next event when all clips are done
//       onNextEvent();
//     }
//   };

//   const handlePreviousClip = () => {
//     if (currentClipIndex > 0) {
//       setCurrentClipIndex(prev => prev - 1);
//       setProgress(0);
//     } else {
//       // Move to previous event
//       onPreviousEvent();
//     }
//   };

//   // NEW: Jump to specific clip
//   const handleClipClick = (clipIndex: number) => {
//     setCurrentClipIndex(clipIndex);
//     setProgress(0);
//   };

//   // Early return if no event
//   if (!event) return null;

//   const currentClip = event.clips[currentClipIndex];

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md p-0 bg-black border-none">
//         <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
//           {/* NEW: Progress bars for each clip */}
//           <div className="absolute top-2 left-4 right-4 z-20 flex space-x-1">
//             {event.clips.map((_, index) => (
//               <div
//                 key={index}
//                 className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
//                 onClick={() => handleClipClick(index)}
//               >
//                 <div
//                   className="h-full bg-white transition-all duration-100"
//                   style={{
//                     width: index < currentClipIndex ? '100%' : 
//                            index === currentClipIndex ? `${progress}%` : '0%'
//                   }}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* UPDATED: Current clip display */}
//           {currentClip.type === 'video' ? (
//             <video
//               src={currentClip.url}
//               className="w-full h-full object-cover"
//               autoPlay
//               muted
//               playsInline
//               onError={(e) => {
//                 e.currentTarget.style.display = 'none';
//               }}
//             />
//           ) : (
//             <img
//               src={currentClip.url}
//               alt={event.title}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.currentTarget.src = '/api/placeholder/360/640';
//               }}
//             />
//           )}
            
//           {/* Story Controls */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30">
//             {/* UPDATED: Top Info */}
//             <div className="absolute top-8 left-4 right-4"> {/* Changed top-4 to top-8 to accommodate progress bars */}
//               <div className="flex items-center justify-between text-white">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//                     <span className="text-sm font-semibold">
//                       {event.author.slice(0, 1)}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold">{event.author}</p>
//                     <p className="text-xs opacity-75">{event.viewCount} views</p>
//                   </div>
//                 </div>
//                 {event.isLive && (
//                   <span className="live-badge bg-red-500 text-white px-2 py-1 rounded text-xs">LIVE</span>
//                 )}
//               </div>
//             </div>

//             {/* NEW: Navigation Areas - Left and Right halves for clip navigation */}
//             <div 
//               className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer" 
//               onClick={handlePreviousClip}
//             />
//             <div 
//               className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer" 
//               onClick={handleNextClip}
//             />

//             {/* UPDATED: Event Navigation Arrows */}
//             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onPreviousEvent} // Changed from onPrevious
//                 className="text-white hover:bg-white/20"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </Button>
//             </div>
            
//             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onNextEvent} // Changed from onNext
//                 className="text-white hover:bg-white/20"
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </Button>
//             </div>

//             {/* UPDATED: Bottom Info */}
//             <div className="absolute bottom-4 left-4 right-4 text-white">
//               <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
//               <div className="flex items-center justify-between">
//                 <div className="flex flex-col"> {/* NEW: Added flex-col for stacked info */}
//                   <span className="text-sm opacity-75">
//                     Clip {currentClipIndex + 1} of {event.clips.length}
//                   </span>
//                   {currentClip.duration && (
//                     <span className="text-xs opacity-60">Duration: {currentClip.duration}</span>
//                   )}
//                 </div>
//                 <Button
//                   size="sm"
//                   className="bg-white/20 hover:bg-white/30 text-white border-white/30"
//                 >
//                   <Play className="h-4 w-4 mr-2" />
//                   Watch
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };




// import type React from "react"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { useState, useEffect } from "react"
// import Stories from "react-insta-stories"

// interface Clip {
//   id: string
//   type: "video" | "image"
//   url: string
//   thumbnail?: string
//   duration?: number // Changed to number for react-insta-stories
// }

// interface Event {
//   id: string
//   title: string
//   author: string
//   clips: Clip[]
//   isLive?: boolean
//   viewCount?: string
//   timestamp?: string
// }

// interface StoriesViewerProps {
//   event: Event | null
//   isOpen: boolean
//   onClose: () => void
//   onNextEvent: () => void
//   onPreviousEvent: () => void
// }

// export const StoriesViewer: React.FC<StoriesViewerProps> = ({
//   event,
//   isOpen,
//   onClose,
//   onNextEvent,
//   onPreviousEvent,
// }) => {
//   const [stories, setStories] = useState<any[]>([])

//   useEffect(() => {
//     if (!event) return

//     const convertedStories = event.clips.map((clip) => ({
//       url: clip.url,
//       type: clip.type,
//       duration: clip.type === "video" ? clip.duration || 15000 : 5000,
//       header: {
//         heading: event.title,
//         subheading: event.author,
//         profileImage: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       },
//     }))

//     setStories(convertedStories)
//   }, [event])

//   if (!event || !isOpen) return null

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="p-0 bg-black border-none overflow-hidden w-[90vw] h-[90vh] max-w-[400px] max-h-[700px] sm:w-[400px] sm:h-[700px] rounded-lg">
//         <div >
//           <Stories
//             stories={stories}
//             defaultInterval={5000}
//             width={432}
//             height={768}
//             onAllStoriesEnd={() => {
//               console.log("[v0] All stories ended, advancing to next event")
//                 // Add small delay to prevent React state conflicts
//   setTimeout(() => {
//     try {
//       onNextEvent()
//     } catch (error) {
//       console.error("Error advancing to next event:", error)
//       onClose() // Close viewer if navigation fails
//     }
//   }, 300) // 300ms delay for smooth transition

//             }}
//             onStoryStart={(s, st) => {
//               console.log("[v0] Story started:", s, st)
//             }}
//             onStoryEnd={(s, st) => {
//               console.log("[v0] Story ended:", s, st)
//             }}
//             // onStoryError={(error) => {
//             //   console.log("[v0] Story error:", error)
//             //   // Continue to next story on error
//             // }}
//             keyboardNavigation={true}
//             preventDefault
//             currentIndex={0}
//             onNext={() => {
//               console.log("[v0] Next story")
//             }}
//             onPrevious={() => {
//               console.log("[v0] Previous story")
//             }}
//             storyStyles={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//             progressContainerStyles={{
//               top: 8,
//               left: 16,
//               right: 16,
//               zIndex: 60,
//             }}
//             progressWrapperStyles={{
//               background: "rgba(255, 255, 255, 0.4)",
//               backdropFilter: "blur(4px)",
//               height: "3px",
//             }}
//             progressStyles={{
//               background: "white",
//             }}
//           />

//           <div className="absolute inset-0 pointer-events-none">
//             <div
//               className="absolute left-0 top-0 w-1/3 h-full pointer-events-auto cursor-pointer z-50 flex items-center justify-start pl-4"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 onPreviousEvent()
//               }}
//             >
//               <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity sm:hidden" />
//             </div>
//             <div
//               className="absolute right-0 top-0 w-1/3 h-full pointer-events-auto cursor-pointer z-50 flex items-center justify-end pr-4"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 onNextEvent()
//               }}
//             >
//               <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity sm:hidden" />
//             </div>
//           </div>

//           {event.isLive && (
//             <div className="absolute top-4 right-4 z-50 sm:top-16">
//               <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">LIVE</span>
//             </div>
//           )}

//           <div className="absolute bottom-4 left-4 right-4 z-50 text-white sm:bottom-6">
//             <div className="flex items-center justify-between">
//               <span className="text-sm opacity-75">{event.viewCount} views</span>
//               <span className="text-xs opacity-60">{event.timestamp}</span>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }


// import type React from "react"
// import { useState, useEffect } from "react"
// import Stories from "react-insta-stories"

// interface Clip {
//   id: string
//   type: "video" | "image"
//   url: string
//   thumbnail?: string
//   duration?: number
// }

// interface Event {
//   id: string
//   title: string
//   author: string
//   clips: Clip[]
//   isLive?: boolean
//   viewCount?: string
//   timestamp?: string
// }

// interface StoriesViewerProps {
//   event: Event | null
//   isOpen: boolean
//   onClose: () => void
//   onNextEvent: () => void
//   onPreviousEvent: () => void
// }

// export const StoriesViewer: React.FC<StoriesViewerProps> = ({
//   event,
//   isOpen,
//   onClose,
//   onNextEvent,
//   onPreviousEvent,
// }) => {
//   const [stories, setStories] = useState<any[]>([])

//   useEffect(() => {
//     if (!event) return

//     const convertedStories = event.clips.map((clip) => ({
//       url: clip.url,
//       type: clip.type,
//       duration: clip.type === "video" ? (clip.duration ? clip.duration : 8000) : 4000,
//       header: {
//         heading: event.title,
//         subheading: event.author,
//         profileImage: "https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg",
//       },
//     }))

//     setStories(convertedStories)

//     // Add validation
//     if (convertedStories.length === 0) {
//       console.warn("No valid stories found, closing viewer")
//       onClose()
//     }
//   }, [event, onClose])

//   // Don't render anything if not open or no event
//   if (!isOpen || !event || stories.length === 0) {
//     return null
//   }

//   return (
//     <>
//       {/* Backdrop with transparent background */}
//       <div 
//         className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
//         onClick={onClose} // Close when clicking backdrop
//       >
//         {/* Stories Container */}
//         <div 
//           className="relative bg-black rounded-lg overflow-hidden shadow-2xl
//                      w-[90vw] h-[90vh] max-w-[400px] max-h-[700px]
//                      sm:w-[400px] sm:h-[700px]"
//           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking stories
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-1 z-50 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm 
//                        text-white hover:bg-black/70 transition-colors duration-200 
//                        flex items-center justify-center"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           {/* Stories Component */}
//           <Stories
//             stories={stories}
//             defaultInterval={5000}
//             width="100%"
//             height="100%"
            
//             onAllStoriesEnd={() => {
//               console.log("[StoriesViewer] All stories ended, advancing to next event")
//               setTimeout(() => {
//                 try {
//                   onNextEvent()
//                 } catch (error) {
//                   console.error("Error advancing to next event:", error)
//                   onClose()
//                 }
//               }, 300)
//             }}
//             onStoryStart={(s, st) => {
//               console.log("[StoriesViewer] Story started:", s, st)
//             }}
//             onStoryEnd={(s, st) => {
//               console.log("[StoriesViewer] Story ended:", s, st)
//             }}
//             keyboardNavigation={true}
//             preventDefault={true}
//             currentIndex={0}
//             storyStyles={{
//               width: "100%",
//               height: "100%",
//               objectFit: "contain",
//             }}
//             progressContainerStyles={{
//               position: "absolute",
//               top: "12px",
//               left: "16px",
//               right: "16px",
//               zIndex: 60,
//             }}
//             progressWrapperStyles={{
//               background: "rgba(255, 255, 255, 0.3)",
//               backdropFilter: "blur(4px)",
//               height: "3px",
//               borderRadius: "2px",
//             }}
//             progressStyles={{
//               background: "white",
//               height: "100%",
//               borderRadius: "2px",
//             }}
//           />

//           {/* Navigation Areas */}
//           <div className="absolute inset-0 pointer-events-none z-40">
//             {/* Previous Event Area */}
//             <div
//               className="absolute left-0 top-0 w-1/3 h-full pointer-events-auto cursor-pointer 
//                          flex items-center justify-start pl-4"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 onPreviousEvent()
//               }}
//             >
//               <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm 
//                              opacity-0 hover:opacity-100 transition-opacity duration-200 
//                              flex items-center justify-center">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </div>
//             </div>

//             {/* Next Event Area */}
//             <div
//               className="absolute right-0 top-0 w-1/3 h-full pointer-events-auto cursor-pointer 
//                          flex items-center justify-end pr-4"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 onNextEvent()
//               }}
//             >
//               <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm 
//                              opacity-0 hover:opacity-100 transition-opacity duration-200 
//                              flex items-center justify-center">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Live Badge */}
//           {event.isLive && (
//             <div className="absolute top-16 right-4 z-50">
//               <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
//                 LIVE
//               </span>
//             </div>
//           )}

//           {/* Bottom Info */}
//           <div className="absolute bottom-4 left-4 right-4 z-50 text-white">
//             <div className="flex items-center justify-between">
//               <span className="text-sm opacity-90 font-medium drop-shadow-lg">
//                 {event.viewCount && `${event.viewCount} views`}
//               </span>
//               <span className="text-xs opacity-70 drop-shadow-lg">
//                 {event.timestamp}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface Clip {
  id: string
  type: "video" | "image"
  url: string
  thumbnail?: string
  duration?: number // in milliseconds
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

interface StoriesViewerProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  onNextEvent: () => void
  onPreviousEvent: () => void
}

export const StoriesViewer: React.FC<StoriesViewerProps> = ({
  event,
  isOpen,
  onClose,
  onNextEvent,
  onPreviousEvent,
}) => {
  const [currentClipIndex, setCurrentClipIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const pausedTimeRef = useRef<number>(0)

  // Reset state when event changes
  useEffect(() => {
    if (event) {
      setCurrentClipIndex(0)
      setProgress(0)
      setIsPaused(false)
      setIsBuffering(false)
      startTimeRef.current = Date.now()
      pausedTimeRef.current = 0
    }
  }, [event])

  // Get current clip
  const currentClip = event?.clips[currentClipIndex]
  const clipDuration = currentClip?.type === "video" 
    ? currentClip.duration || 15000 
    : currentClip?.duration || 5000

  // Progress animation
  useEffect(() => {
    if (!isOpen || !currentClip || isPaused || isBuffering) return

    startTimeRef.current = Date.now() - pausedTimeRef.current

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const progressPercent = Math.min((elapsed / clipDuration) * 100, 100)
      
      setProgress(progressPercent)

      if (progressPercent >= 100) {
        handleNextClip()
      }
    }, 50) // Update every 50ms for smooth animation

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isOpen, currentClip, isPaused, isBuffering, clipDuration])

  // Handle next clip
  const handleNextClip = () => {
    if (!event) return

    if (currentClipIndex < event.clips.length - 1) {
      setCurrentClipIndex(prev => prev + 1)
      setProgress(0)
      startTimeRef.current = Date.now()
      pausedTimeRef.current = 0
    } else {
      // Move to next event
      setTimeout(() => {
        try {
          onNextEvent()
        } catch (error) {
          console.error("Error advancing to next event:", error)
          onClose()
        }
      }, 300)
    }
  }

  // Handle previous clip
  const handlePreviousClip = () => {
    if (!event) return

    if (currentClipIndex > 0) {
      setCurrentClipIndex(prev => prev - 1)
      setProgress(0)
      startTimeRef.current = Date.now()
      pausedTimeRef.current = 0
    } else {
      onPreviousEvent()
    }
  }

  // Handle tap/click to pause
  const handleTogglePause = () => {
    if (isPaused) {
      // Resume
      setIsPaused(false)
      pausedTimeRef.current = 0
    } else {
      // Pause
      setIsPaused(true)
      pausedTimeRef.current = Date.now() - startTimeRef.current
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickPercent = (clickX / rect.width) * 100
    
    setProgress(clickPercent)
    const newTime = (clickPercent / 100) * clipDuration
    startTimeRef.current = Date.now() - newTime
    pausedTimeRef.current = 0

    if (videoRef.current) {
      videoRef.current.currentTime = newTime / 1000
    }
  }

  // Handle video events
  const handleVideoCanPlay = () => {
    setIsBuffering(false)
    if (videoRef.current && !isPaused) {
      videoRef.current.play()
    }
  }

  const handleVideoWaiting = () => {
    setIsBuffering(true)
  }

  const handleVideoEnded = () => {
    handleNextClip()
  }

  if (!isOpen || !event) return null

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full max-w-md max-h-screen bg-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-50 flex space-x-1">
          {event.clips.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white transition-all duration-100 rounded-full"
                style={{
                  width: index < currentClipIndex ? '100%' : 
                         index === currentClipIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-4 right-4 z-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {event.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold drop-shadow-lg">
                {event.author}
              </p>
              <p className="text-white/80 text-xs drop-shadow-lg">
                {event.timestamp}
              </p>
            </div>
          </div>
          
          {event.isLive && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              LIVE
            </span>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm 
                     text-white hover:bg-black/70 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Media Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {currentClip?.type === "video" ? (
            <video
              ref={videoRef}
              src={currentClip.url}
              className="w-full h-full object-cover"
              muted
              playsInline
              autoPlay={!isPaused}
              onCanPlay={handleVideoCanPlay}
              onWaiting={handleVideoWaiting}
              onEnded={handleVideoEnded}
              onError={() => {
                console.error("Video failed to load")
                handleNextClip()
              }}
            />
          ) : (
            <img
              src={currentClip?.url}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image failed to load")
                e.currentTarget.src = "/api/placeholder/400/600"
              }}
            />
          )}

          {/* Pause/Play Overlay */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Buffering Spinner */}
          {isBuffering && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Navigation Areas */}
        <div className="absolute inset-0 flex">
          {/* Previous Area */}
          <div
            className="flex-1 cursor-pointer"
            onClick={handlePreviousClip}
          />
          
          {/* Pause/Play Area */}
          <div
            className="flex-1 cursor-pointer"
            onClick={handleTogglePause}
          />
          
          {/* Next Area */}
          <div
            className="flex-1 cursor-pointer"
            onClick={handleNextClip}
          />
        </div>

        {/* Event Navigation Buttons */}
        <button
          onClick={onPreviousEvent}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full 
                     bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors
                     flex items-center justify-center opacity-70 hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={onNextEvent}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full 
                     bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors
                     flex items-center justify-center opacity-70 hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Info */}
        <div className="absolute bottom-6 left-4 right-4 z-50">
          <h3 className="text-white text-lg font-semibold mb-2 drop-shadow-lg">
            {event.title}
          </h3>
          <div className="flex items-center justify-between text-white/80 text-sm">
            <span className="drop-shadow-lg">
              {event.viewCount} views
            </span>
            <span className="drop-shadow-lg">
              {currentClipIndex + 1} of {event.clips.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}