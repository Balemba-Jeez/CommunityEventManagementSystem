import React, { useState } from 'react';
import { SearchBar } from '../../components/eventmanager/events/SearchBar';
import { EventCard } from '../../components/eventmanager/events/EventCard';
import { Navbar } from '../../components/eventmanager/events/Navbar';
// import { eventData } from '../data/eventData';
import { CalendarIcon, LayoutGridIcon, ListIcon } from 'lucide-react';
import { ResponsiveHeaderIcons } from '@/components/eventmanager/dashboard/responsive-header-icons';
import { EventLayout } from '@/components/eventmanager/events/event-layout';
const sampleEvents = [
  {
    id: "1",
    title: "DAY // NIGHT - Tycho (Live) w/ Gold Panada, Com Truise + More at 1015 Folsom",
    description: "An unforgettable night of electronic music featuring live performances from renowned artists.",
    date: "MON, APR 09",
    time: "7:00 PM",
    location: "1015 FOLSOM, San Francisco, CA",
    zone: "Global",
    price: "$25–$80",
    status: "scheduled" as const,
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OrmkPXESs8bFUGSGBraXwie4uBAYsl.png",
  },
  {
    id: "2",
    title: "Summer Music Festival 2024",
    description: "Three days of incredible music, food, and entertainment under the stars.",
    date: "SAT, JUN 15",
    time: "2:00 PM",
    location: "Golden Gate Park, San Francisco, CA",
    zone: "Zone A",
    price: "$150–$350",
    status: "active" as const,
    imageUrl: "/summer-music-festival-outdoor-stage.jpg",
  },
  {
    id: "3",
    title: "Tech Conference 2024",
    description: "Join industry leaders for insights on the latest technology trends and innovations.",
    date: "WED, MAY 22",
    time: "9:00 AM",
    location: "Moscone Center, San Francisco, CA",
    zone: "Global",
    price: "$299–$599",
    status: "pending" as const,
    imageUrl: "/tech-conference-stage.png",
  },
  {
    id: "4",
    title: "Art Gallery Opening",
    description: "Explore contemporary art from emerging local artists in an intimate gallery setting.",
    date: "FRI, APR 26",
    time: "6:00 PM",
    location: "SFMOMA, San Francisco, CA",
    zone: "Zone B",
    price: "Free",
    status: "draft" as const,
    imageUrl: "/modern-art-gallery.png",
  },
  {
    id: "5",
    title: "Food & Wine Tasting",
    description: "Sample exquisite wines paired with gourmet dishes from award-winning chefs.",
    date: "SUN, MAY 05",
    time: "4:00 PM",
    location: "Ferry Building, San Francisco, CA",
    zone: "Zone A",
    price: "$75–$125",
    status: "scheduled" as const,
    imageUrl: "/wine-tasting-elegant-restaurant.jpg",
  },
  {
    id: "6",
    title: "Comedy Night Special",
    description: "Laugh out loud with top comedians performing their best stand-up routines.",
    date: "THU, APR 18",
    time: "8:00 PM",
    location: "Cobb's Comedy Club, San Francisco, CA",
    zone: "Global",
    price: "$35–$55",
    status: "completed" as const,
    imageUrl: "/comedy-club-stage-spotlight.jpg",
  },
]
export const PendingEventsPage = () => {
  // const [activeTab, setActiveTab] = useState('Active');
  // const [viewMode, setViewMode] = useState('grid');
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  return <div className="w-full">
      {/* <Navbar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      {/* <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <SearchBar />
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <button className="flex items-center gap-2 text-gray-700 bg-white border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-50">
              <CalendarIcon size={18} />
              <span>This Month</span>
            </button>
          </div>
          <div className="flex items-center bg-gray-100 rounded-md overflow-hidden">
            <button className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-900 text-white' : 'bg-transparent text-gray-600'}`} onClick={() => setViewMode('grid')}>
              <LayoutGridIcon size={20} />
            </button>
            <button className={`p-2 ${viewMode === 'list' ? 'bg-indigo-900 text-white' : 'bg-transparent text-gray-600'}`} onClick={() => setViewMode('list')}>
              <ListIcon size={20} />
            </button>
          </div>
        </div>
      </div> */}
      {/* Header */}
      <ResponsiveHeaderIcons page="pending-events" layout={layout} onLayoutChange={setLayout} />
      {/* Event Layout */}
      <div className="container mx-auto px-4 py-8">
        <EventLayout events={sampleEvents} layout={layout} onLayoutChange={setLayout} />
      </div>
    </div>;
};