import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LiveStream {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  viewerCount: string;
  isLive: boolean;
  duration?: string;
  category: string;
}

const mockStreams: LiveStream[] = [
  {
    id: '1',
    title: 'UEFA Champions League Final - Real Madrid vs Manchester City',
    channel: 'UEFA Official',
    thumbnail: '/api/placeholder/640/360',
    viewerCount: '2.3M',
    isLive: true,
    category: 'Sports'
  },
  {
    id: '2',
    title: 'Zone 5 Championship Finals - Live Commentary',
    channel: 'Zone 5 Events',
    thumbnail: '/api/placeholder/640/360',
    viewerCount: '456K',
    isLive: true,
    category: 'Gaming'
  },
  {
    id: '3',
    title: 'PC Community Weekly Showcase',
    channel: 'PC Community',
    thumbnail: '/api/placeholder/640/360',
    viewerCount: '89K',
    isLive: true,
    category: 'Community'
  },
  {
    id: '4',
    title: 'Global Tournament Highlights',
    channel: 'Global Events',
    thumbnail: '/api/placeholder/640/360',
    viewerCount: '234K',
    isLive: false,
    duration: '2:45:30',
    category: 'Sports'
  }
];

export const HorizontalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockStreams.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + mockStreams.length) % mockStreams.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % mockStreams.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentStream = mockStreams[currentIndex];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold">Live Now</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="hover:bg-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Featured Stream */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card to-accent/20 border-border shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="aspect-video relative group cursor-pointer">
          <img
            src={currentStream.thumbnail}
            alt={currentStream.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/800/450';
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-80 group-hover:opacity-90 transition-opacity">
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              {currentStream.isLive ? (
                <span className="live-badge flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </span>
              ) : (
                <span className="bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                  {currentStream.duration}
                </span>
              )}
              <span className="bg-primary/80 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                {currentStream.category}
              </span>
            </div>

            {/* Viewer Count */}
            <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">{currentStream.viewerCount}</span>
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="lg" className="gradient-primary shadow-glow animate-float">
                <Play className="h-6 w-6 mr-2" fill="white" />
                Watch Live
              </Button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-heading font-bold mb-2 line-clamp-2">
                {currentStream.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {currentStream.channel.slice(0, 1)}
                    </span>
                  </div>
                  <span className="font-medium">{currentStream.channel}</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Watch Live
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stream Thumbnails */}
      <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-2">
        {mockStreams.map((stream, index) => (
          <div
            key={stream.id}
            className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
              index === currentIndex ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
          >
            <Card className="w-48 overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/192/108';
                  }}
                />
                {stream.isLive && (
                  <div className="absolute top-2 left-2">
                    <span className="live-badge text-xs">LIVE</span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
                  <Users className="h-3 w-3" />
                  <span>{stream.viewerCount}</span>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm line-clamp-2 mb-1">
                  {stream.title}
                </h4>
                <p className="text-xs text-muted-foreground">{stream.channel}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center space-x-2">
        {mockStreams.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-6' : 'bg-muted hover:bg-muted-foreground/50'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
          />
        ))}
      </div>
    </div>
  );
};