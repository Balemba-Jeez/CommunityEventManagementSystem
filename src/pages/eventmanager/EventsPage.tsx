import React, { useState } from 'react';
import { SearchBar } from '../../components/eventmanager/events/SearchBar';
import { EventCard } from '../../components/eventmanager/events/EventCard';
import { Navbar } from '../../components/eventmanager/events/Navbar';
// import { eventData } from '../data/eventData';
import { CalendarIcon, LayoutGridIcon, ListIcon } from 'lucide-react';
export const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [viewMode, setViewMode] = useState('grid');
  return <div className="w-full px-4 py-4 md:px-6">
      {/* <Navbar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {/* {eventData.map(event => <EventCard key={event.id} event={event} />)} */}
      </div>
    </div>;
};