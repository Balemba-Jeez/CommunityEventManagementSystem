import { useState } from 'react';
import { Play, Users, Clock, Bookmark, Bell, MoreHorizontal, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  type: 'live' | 'upcoming' | 'recorded';
  zone: string;
  viewCount?: string;
  duration?: string;
  scheduledTime?: string;
  streamedTime?: string;
  isBookmarked?: boolean;
  isNotified?: boolean;
}

interface MediaCardsProps {
  selectedZone: string;
  selectedEvent: string;
}

const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'Zone 3 Championship Finals - Live Commentary and Analysis',
    thumbnail: '/api/placeholder/320/180',
    type: 'live',
    zone: 'Zone 3',
    viewCount: '245K',
    isBookmarked: false,
    isNotified: true
  },
  {
    id: '2',
    title: 'Global Tournament Qualifiers - Day 2 Highlights',
    thumbnail: '/api/placeholder/320/180',
    type: 'recorded',
    zone: 'Global',
    viewCount: '89K',
    duration: '2:34:15',
    streamedTime: '3 hours ago',
    isBookmarked: true,
    isNotified: false
  },
  {
    id: '3',
    title: 'Community Showcase - Weekly Featured Players',
    thumbnail: '/api/placeholder/320/180',
    type: 'upcoming',
    zone: 'Community',
    scheduledTime: 'Tomorrow, 2:00 PM',
    isBookmarked: false,
    isNotified: true
  },
  {
    id: '4',
    title: 'Zone 5 Regional Championship - Semi Finals',
    thumbnail: '/api/placeholder/320/180',
    type: 'live',
    zone: 'Zone 5',
    viewCount: '156K',
    isBookmarked: true,
    isNotified: true
  },
  {
    id: '5',
    title: 'International Friendship Cup - Opening Ceremony',
    thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
    type: 'recorded',
    zone: 'Global',
    viewCount: '1.2M',
    duration: '1:45:30',
    streamedTime: '1 day ago',
    isBookmarked: false,
    isNotified: false
  },
  {
    id: '6',
    title: 'Zone 2 vs Zone 4 - Championship Playoffs',
    thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
    type: 'upcoming',
    zone: 'Zone 2',
    scheduledTime: 'Today, 7:00 PM',
    isBookmarked: true,
    isNotified: true
  }
];

// YouTube Shorts style horizontal shelf
const shortsItems = [
  {
    id: 's1',
    title: 'Best Goals of the Week',
    thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
    viewCount: '2.3M',
    duration: '0:45'
  },
  {
    id: 's2',
    title: 'Epic Saves Compilation',
    thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
    viewCount: '890K',
    duration: '1:20'
  },
  {
    id: 's3',
    title: 'Zone 3 Victory Celebration',
    thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
    viewCount: '456K',
    duration: '0:33'
  },
  {
    id: 's4',
    title: 'Behind the Scenes',
    thumbnail: 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg',
    viewCount: '234K',
    duration: '2:15'
  }
];

export const MediaCards = ({ selectedZone, selectedEvent }: MediaCardsProps) => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter(item => item.isBookmarked).map(item => item.id))
  );
  const [notifiedItems, setNotifiedItems] = useState<Set<string>>(
    new Set(mockMediaItems.filter(item => item.isNotified).map(item => item.id))
  );

  const toggleBookmark = (id: string) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleNotification = (id: string) => {
    setNotifiedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredItems = mockMediaItems.filter(item => {
    if (selectedZone !== 'all' && item.zone !== selectedZone) return false;
    return true;
  });

  const getTypeColor = (type: MediaItem['type']) => {
    switch (type) {
      case 'live':
        return 'bg-live text-live-foreground';
      case 'upcoming':
        return 'bg-warning text-warning-foreground';
      case 'recorded':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: MediaItem['type']) => {
    switch (type) {
      case 'live':
        return 'LIVE';
      case 'upcoming':
        return 'UPCOMING';
      case 'recorded':
        return 'RECORDED';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.slice(0, 6).map((item, index) => (
          <Card 
            key={item.id} 
            className="media-card group overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = 'https://ventureburn.com/wp-content/uploads/2019/12/aa-1024x576.jpg';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="gradient-primary shadow-glow">
                    <Play className="h-5 w-5 mr-2" fill="white" />
                    {item.type === 'live' ? 'Watch Live' : item.type === 'upcoming' ? 'Set Reminder' : 'Watch'}
                  </Button>
                </div>
              </div>

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                <Badge className={`text-xs font-semibold ${getTypeColor(item.type)}`}>
                  {getTypeLabel(item.type)}
                </Badge>
                {item.zone !== 'Community' && (
                  <Badge variant="secondary" className="text-xs">
                    {item.zone}
                  </Badge>
                )}
              </div>

              {/* Duration/View Count */}
              <div className="absolute bottom-3 right-3">
                {item.type === 'live' && item.viewCount && (
                  <div className="flex items-center space-x-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    <Users className="h-3 w-3" />
                    <span>{item.viewCount}</span>
                  </div>
                )}
                {item.type === 'recorded' && item.duration && (
                  <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    {item.duration}
                  </div>
                )}
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span className="font-medium">{item.zone === 'Community' ? 'Community' : item.zone}</span>
                {item.viewCount && item.type === 'recorded' && (
                  <span>{item.viewCount} views</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {item.streamedTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.streamedTime}</span>
                    </div>
                  )}
                  {item.scheduledTime && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{item.scheduledTime}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNotification(item.id)}
                    className={`h-8 w-8 p-0 hover:bg-accent ${
                      notifiedItems.has(item.id) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(item.id)}
                    className={`h-8 w-8 p-0 hover:bg-accent ${
                      bookmarkedItems.has(item.id) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" fill={bookmarkedItems.has(item.id) ? 'currentColor' : 'none'} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* YouTube Shorts Style Horizontal Shelf */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold">Quick Highlights</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <span className="mr-2">←</span>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-4">
          {shortsItems.map((short) => (
            <div key={short.id} className="flex-shrink-0 cursor-pointer group">
              <Card className="w-36 overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-[9/16] relative">
                  <img
                    src={short.thumbnail}
                    alt={short.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/160/284';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="sm" className="gradient-primary">
                        <Play className="h-4 w-4" fill="white" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex items-center justify-between text-white text-xs">
                      <span className="bg-black/70 px-1 py-0.5 rounded">{short.duration}</span>
                      <span className="bg-black/70 px-1 py-0.5 rounded">{short.viewCount}</span>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <h4 className="text-xs font-medium line-clamp-2">{short.title}</h4>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="hover:bg-accent">
          Load More Content
        </Button>
      </div>
    </div>
  );
};