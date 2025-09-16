import { Skeleton } from '@/components/ui/skeleton';
import { Zap } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

// Skeleton for individual story ring
export const StoryRingSkeleton = () => {
  return (
    <div className="flex-shrink-0">
      <div className="story-ring p-[3px] rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
        <div className="p-[3px] rounded-full bg-white">
          <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// Skeleton for the entire stories list
export const StoriesListSkeleton = () => {
  return (
    <div className="relative">
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-gray-300" />
          <Skeleton className="h-8 w-32" />
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
          className="w-full max-w-4xl"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-auto">
                <StoryRingSkeleton />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Skeleton navigation buttons */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

// Skeleton for the entire stories section
export const StoriesSectionSkeleton = () => {
  return <StoriesListSkeleton />;
};