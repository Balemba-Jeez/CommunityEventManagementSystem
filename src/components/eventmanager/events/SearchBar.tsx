import React from 'react';
import { SearchIcon } from 'lucide-react';
export const SearchBar = () => {
  return <div className="relative flex-grow max-w-2xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-400" />
      </div>
      <input type="text" className="bg-white border border-gray-200 text-gray-900 text-sm rounded-md block w-full pl-10 pr-4 py-2.5" placeholder="Search event, location, etc" />
      <button className="absolute right-2.5 inset-y-0 flex items-center">
        <div className="bg-indigo-900 text-white p-1.5 rounded-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8H20M4 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </button>
    </div>;
};