// import React from 'react';


// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { StoryRing } from './StoriesRing';
// import { Zap } from 'lucide-react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';

// interface Story {
//   id: string;
//   title: string;
//   author: string;
//   thumbnail: string;
//   duration: string;
//   isLive?: boolean;
//   viewCount?: string;
// }

// interface StoriesListProps {
//   stories: Story[];
//   onStoryClick: (story: Story, index: number) => void;
//   // onFilterChange: (level: 'global' | 'zone', selectedZone?: string, selectedEvent?: string) => void;
// }

// export const StoriesList: React.FC<StoriesListProps> = ({ stories, onStoryClick, }) => {
//   return (
//     <div className="relative">
//       <div className="flex items-center mb-6">
//         <div className="flex items-center space-x-2">
//           <Zap className="h-5 w-5 text-[#2C3E94]" />
//           <h2 className="text-2xl font-heading font-bold">Quick Hits</h2>
//         </div>
//       </div>

//       <div className="relative">
//         <Carousel
//           opts={{
//             align: "start",
//             loop: false,
//             skipSnaps: false,
//             dragFree: true,
//           }}
//           className="w-full max-w-4xl"
//         >
//           <CarouselContent className="-ml-2 md:-ml-4 ">
//             {stories.map((story, index) => (
//               <CarouselItem key={story.id} className="pl-2 md:pl-4 basis-auto ">
//                 <StoryRing
//                   story={story}
//                   onClick={() => onStoryClick(story, index)}
//                 />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
          
//           {/* Custom styled navigation buttons */}
//           <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 hover:border-[#2C3E94] text-gray-600 hover:text-[#2C3E94] shadow-md" />
//           <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 hover:border-[#2C3E94] text-gray-600 hover:text-[#2C3E94] shadow-md" />
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { StoryRing } from './StoriesRing';
// import { Zap } from 'lucide-react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';

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

// interface StoriesListProps {
//   events: Event[]; // Changed from 'stories: Story[]' to 'events: Event[]'
//   onEventClick: (event: Event, index: number) => void; // Changed from 'onStoryClick'
//   // onFilterChange: (level: 'global' | 'zone', selectedZone?: string, selectedEvent?: string) => void;
// }

// export const StoriesList: React.FC<StoriesListProps> = ({ events, onEventClick }) => {
//   return (
//     <div className="relative">
//       <div className="flex items-center mb-6">
//         <div className="flex items-center space-x-2">
//           <Zap className="h-5 w-5 text-[#2C3E94]" />
//           <h2 className="text-2xl font-heading font-bold">Quick Hits</h2>
//         </div>
//       </div>

//       <div className="relative">
//         <Carousel
//           opts={{
//             align: "start",
//             loop: false,
//             skipSnaps: false,
//             dragFree: true,
//           }}
//           className="w-full max-w-4xl"
//         >
//           <CarouselContent className="-ml-2 md:-ml-4 ">
//             {events.map((event, index) => ( // Changed from 'stories.map((story' to 'events.map((event'
//               <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-auto ">
//                 <StoryRing
//                   event={event} // Changed from 'story={story}' to 'event={event}'
//                   onClick={() => onEventClick(event, index)} // Changed from 'onStoryClick(story, index)'
//                 />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
          
//           {/* Custom styled navigation buttons */}
//           <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 hover:border-[#2C3E94] text-gray-600 hover:text-[#2C3E94] shadow-md" />
//           <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 hover:border-[#2C3E94] text-gray-600 hover:text-[#2C3E94] shadow-md" />
//         </Carousel>
//       </div>
//     </div>
//   );
// };


import type React from "react"
import { StoryRing } from "./StoriesRing"
import { Zap } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Updated interfaces
interface Clip {
  id: string
  type: "video" | "image"
  url: string
  thumbnail?: string
  duration?: number // Changed to number
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

interface StoriesListProps {
  events: Event[] // Changed from 'stories: Story[]' to 'events: Event[]'
  onEventClick: (event: Event, index: number) => void // Changed from 'onStoryClick'
  // onFilterChange: (level: 'global' | 'zone', selectedZone?: string, selectedEvent?: string) => void;
}

export const StoriesList: React.FC<StoriesListProps> = ({ events, onEventClick }) => {
  return (
    <div className="relative">
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-[#2C3E94]" />
          <h2 className="text-2xl font-heading font-bold">Quick Hits</h2>
        </div>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            skipSnaps: false,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 ">
            {events.map(
              (
                event,
                index, // Changed from 'stories.map((story' to 'events.map((event'
              ) => (
                <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-auto ">
                  <StoryRing
                    event={event} // Changed from 'story={story}' to 'event={event}'
                    onClick={() => onEventClick(event, index)} // Changed from 'onStoryClick(story, index)'
                  />
                </CarouselItem>
              ),
            )}
          </CarouselContent>

          {/* Custom styled navigation buttons */}
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 hover:border-[#2C3E94] text-gray-600 hover:text-[#2C3E94] shadow-md" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 hover:border-[#2C3E94] text-gray-600 hover:text-[#2C3E94] shadow-md" />
        </Carousel>
      </div>
    </div>
  )
}
