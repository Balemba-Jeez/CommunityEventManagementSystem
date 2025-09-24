import React from 'react'
const EventTabs = ({
  activeTab,
  setActiveTab,
  eventData,
  organizerInfo,
  relatedEvents,
}) => {
  const tabs = [
    {
      id: 'about',
      label: 'About',
    },
    {
      id: 'related',
      label: 'Related Events',
    },
    {
      id: 'organizer',
      label: 'Organizer',
    },
  ]
  return (
    <div className="mt-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="py-4">
        {activeTab === 'about' && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Event Details</h3>
            <p className="text-gray-700">{eventData.description}</p>
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Schedule</h4>
              <div className="space-y-3">
                <div className="flex">
                  <div className="w-24 text-gray-500 text-sm">9:00 AM</div>
                  <div>
                    <p className="font-medium">Welcome and Introduction</p>
                    <p className="text-sm text-gray-600">
                      Conference overview and agenda
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 text-gray-500 text-sm">9:30 AM</div>
                  <div>
                    <p className="font-medium">
                      Keynote: Future of Web Development
                    </p>
                    <p className="text-sm text-gray-600">
                      By Sarah Johnson, CTO of WebTech
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 text-gray-500 text-sm">11:00 AM</div>
                  <div>
                    <p className="font-medium">
                      Performance Optimization Workshop
                    </p>
                    <p className="text-sm text-gray-600">
                      Hands-on techniques for faster web apps
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 text-gray-500 text-sm">1:00 PM</div>
                  <div>
                    <p className="font-medium">Lunch Break</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'related' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Related Events</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {relatedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="relative">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                    {event.live && (
                      <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                        LIVE
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                      {event.viewers}
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-gray-900 line-clamp-2">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {event.organizer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'organizer' && (
          <div>
            <div className="flex items-start space-x-4">
              <img
                src={organizerInfo.avatar}
                alt={organizerInfo.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{organizerInfo.name}</h3>
                <p className="text-gray-600 text-sm">
                  {organizerInfo.subscribers}
                </p>
                <p className="mt-2 text-gray-700">
                  {organizerInfo.description}
                </p>
                <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">More from this organizer</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="JavaScript Fundamentals"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h5 className="font-medium">JavaScript Fundamentals</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      152K views • 2 weeks ago
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="CSS Masterclass"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h5 className="font-medium">CSS Masterclass</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      98K views • 1 month ago
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="UX Design Workshop"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h5 className="font-medium">UX Design Workshop</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      214K views • 3 months ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default EventTabs
