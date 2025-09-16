import { Play } from 'lucide-react';

// Updated interfaces
interface Clip {
  id: string;
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
  duration?: string;
}

interface Event {
  id: string;
  title: string;
  author: string;
  clips: Clip[];
  isLive?: boolean;
  viewCount?: string;
  timestamp?: string;
}

interface StoryRingProps {
  event: Event; // Changed from 'story' to 'event'
  onClick: () => void;
}

export const StoryRing: React.FC<StoryRingProps> = ({ event, onClick }) => {
  // Use the first clip as the preview
  const previewClip = event.clips[0];
  const clipCount = event.clips.length;
  
  return (
    <div
      className="flex-shrink-0 cursor-pointer group"
      onClick={onClick}
    >
      <div className="story-ring p-[3px] rounded-full bg-gradient-to-r from-[#2C3E94] via-blue-500 to-purple-500">
        {/* Inner border - white/light colored */}
        <div className="p-[3px] rounded-full bg-white">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-br from-accent to-background">
            {previewClip.type === 'video' ? (
              <video
                src={previewClip.url}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                muted
                loop
                playsInline
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <img
                src={previewClip.thumbnail || previewClip.url}
                alt={event.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = '/api/placeholder/96/96';
                }}
              />
            )}
         
            {/* Live Badge */}
            {/* {event.isLive && (
              <div className="absolute top-1 right-1 z-10">
                <span className="live-badge text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">LIVE</span>
              </div>
            )} */}

            {/* Clip Count Badge - NEW */}
            {/* {clipCount > 1 && (
              <div className="absolute bottom-1 right-1 z-10">
                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {clipCount}
                </span>
              </div>
            )} */}
         
            {/* Play Icon Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};