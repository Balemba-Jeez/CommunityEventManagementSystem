import React from 'react';
interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export const Navbar = ({
  activeTab,
  setActiveTab
}: NavbarProps) => {
  const tabs = [{
    name: 'Active',
    count: 48
  }, {
    name: 'Draft',
    count: 22
  }, {
    name: 'Past',
    count: 32
  }];
  return <div className="flex space-x-4">
      {tabs.map(tab => <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab.name ? 'bg-pink-500 text-white' : 'bg-transparent text-gray-700'}`}>
          {tab.name} ({tab.count})
        </button>)}
    </div>;
};