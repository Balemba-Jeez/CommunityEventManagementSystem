import React from 'react'
import { ThumbsUpIcon, ShareIcon, FlagIcon, BookmarkIcon } from 'lucide-react'
const EventInfo = ({ eventData, handleLike, isLiked, isSaved, setIsSaved }) => {
  return (
    <div className="mt-4">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900">
        {eventData.title}
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
        <div>
          <p className="text-gray-700 font-medium">{eventData.organizer}</p>
          <div className="flex items-center mt-1">
            <span className="text-red-600 font-medium text-sm">
              {eventData.date}
            </span>
            <span className="ml-3 text-gray-600 text-sm">
              {eventData.viewCount.toLocaleString()} watching now
            </span>
          </div>
        </div>
        <div className="flex space-x-4 mt-3 sm:mt-0">
          <button
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${isLiked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={handleLike}
          >
            <ThumbsUpIcon size={18} />
            <span>{eventData.likeCount}</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full">
            <ShareIcon size={18} />
            <span>Share</span>
          </button>
          <button
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full ${isSaved ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <BookmarkIcon size={18} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full">
            <FlagIcon size={18} />
            <span>Report</span>
          </button>
        </div>
      </div>
      <div className="h-px bg-gray-200 my-4"></div>
    </div>
  )
}
export default EventInfo
