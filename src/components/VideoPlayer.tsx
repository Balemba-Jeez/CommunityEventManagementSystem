import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import {
  VolumeXIcon,
  Volume2Icon,
  ExpandIcon,
  SettingsIcon,
} from 'lucide-react'
const VideoPlayer = () => {
  const [isMuted, setIsMuted] = useState(false)
  // Using a demo video for the player
  const videoUrl = 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
  return (
    <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
      <div className="absolute top-2 right-2 z-10 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
        LIVE
      </div>
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        playing={true}
        muted={isMuted}
        controls={false}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
            },
          },
        }}
      />
      {/* Custom controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-gray-300 transition"
            >
              {isMuted ? <VolumeXIcon size={20} /> : <Volume2Icon size={20} />}
            </button>
            <div className="text-white text-sm">1080p</div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300 transition">
              <SettingsIcon size={20} />
            </button>
            <button className="text-white hover:text-gray-300 transition">
              <ExpandIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VideoPlayer