import React from 'react';
import { MapPinIcon } from 'lucide-react';
interface EventProps {
  event: {
    id: number;
    category: string;
    status: string;
    image: string;
    date: string;
    time: string;
    title: string;
    location: string;
    venue: string;
    city: string;
    state: string;
    progress: number;
    price: number;
  };
}
export const EventCard = ({
  event
}: EventProps) => {
  return <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
            {event.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white text-pink-500 text-xs font-medium px-3 py-1 rounded-full flex items-center">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-1.5"></span>
            {event.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-gray-500 text-sm mb-1">
          {event.date} — {event.time}
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h3>
        <div className="flex items-start mb-4">
          <MapPinIcon size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-500 text-sm ml-1">
            {event.venue}, {event.city}, {event.state}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-3/4">
            <div className="bg-gray-200 h-2 rounded-full w-full">
              <div className="bg-pink-400 h-2 rounded-full" style={{
              width: `${event.progress}%`
            }}></div>
            </div>
            <div className="text-gray-600 text-sm mt-1">{event.progress}%</div>
          </div>
          <div className="text-right">
            <span className="text-pink-500 font-bold">${event.price}</span>
          </div>
        </div>
      </div>
    </div>;
};