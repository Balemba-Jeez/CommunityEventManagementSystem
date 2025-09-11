import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Story {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
  isLive?: boolean;
  viewCount?: string;
}

const mockStories: Story[] = [
  {
    id: '1',
    title: 'UEFA Friendship Cup',
    author: 'UEFA Official',
    thumbnail: '/lovable-uploads/693514ba-e48c-4089-ad8c-83259282dc98.png',
    duration: '2:45',
    viewCount: '1.2M'
  },
  {
    id: '2',
    title: 'Zone 3 Championship',
    author: 'Zone 3 Events',
    thumbnail: '/api/placeholder/120/160',
    duration: '1:30',
    isLive: true,
    viewCount: '45K'
  },
  {
    id: '3',
    title: 'Community Highlights',
    author: 'PC Community',
    thumbnail: '/api/placeholder/120/160',
    duration: '3:20',
    viewCount: '890K'
  },
  {
    id: '4',
    title: 'Live Tournament',
    author: 'Global Events',
    thumbnail: '/api/placeholder/120/160',
    duration: '4:15',
    isLive: true,
    viewCount: '234K'
  },
  {
    id: '5',
    title: 'Weekly Recap',
    author: 'PC Community',
    thumbnail: '/api/placeholder/120/160',
    duration: '2:10',
    viewCount: '567K'
  }
];

export const StoriesRing = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openStory = (story: Story) => {
    setSelectedStory(story);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  const nextStory = () => {
    const nextIndex = (currentIndex + 1) % mockStories.length;
    setCurrentIndex(nextIndex);
    setSelectedStory(mockStories[nextIndex]);
  };

  const prevStory = () => {
    const prevIndex = currentIndex === 0 ? mockStories.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedStory(mockStories[prevIndex]);
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-heading font-bold">Live Stories</h2>
          <div className="ml-auto flex space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-4">
            {mockStories.map((story, index) => (
              <div
                key={story.id}
                className="flex-shrink-0 cursor-pointer group"
                onClick={() => {
                  setCurrentIndex(index);
                  openStory(story);
                }}
              >
                <div className="relative">
                  {/* Story Ring with Gradient Border */}
                  <div className="story-ring p-1">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-accent to-background">
                      <img
                        src={story.thumbnail}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/96/96';
                        }}
                      />
                      
                      {/* Live Badge */}
                      {story.isLive && (
                        <div className="absolute top-1 right-1">
                          <span className="live-badge text-xs">LIVE</span>
                        </div>
                      )}
                      
                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Story Info */}
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-foreground truncate w-20 sm:w-24">
                      {story.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {story.viewCount} views
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer Dialog */}
      <Dialog open={selectedStory !== null} onOpenChange={() => closeStory()}>
        <DialogContent className="max-w-md p-0 bg-black border-none">
          {selectedStory && (
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
              <img
                src={selectedStory.thumbnail}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/360/640';
                }}
              />
              
              {/* Story Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30">
                {/* Top Info */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {selectedStory.author.slice(0, 1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{selectedStory.author}</p>
                        <p className="text-xs opacity-75">{selectedStory.viewCount} views</p>
                      </div>
                    </div>
                    {selectedStory.isLive && (
                      <span className="live-badge">LIVE</span>
                    )}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevStory}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                </div>
                
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextStory}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-semibold mb-2">{selectedStory.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-75">Duration: {selectedStory.duration}</span>
                    <Button
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};