import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EventPillsProps {
  selectedZone: string;
  selectedEvent: string;
  onZoneChange: (zone: string) => void;
  onEventChange: (event: string) => void;
}

const zones = [
  { id: 'all', name: 'All Zones' },
  { id: 'global', name: 'Global' },
  { id: 'zone1', name: 'Zone 1' },
  { id: 'zone2', name: 'Zone 2' },
  { id: 'zone3', name: 'Zone 3' },
  { id: 'zone4', name: 'Zone 4' },
  { id: 'zone5', name: 'Zone 5' },
  { id: 'community', name: 'Community' },
];

const eventsByZone: Record<string, Array<{ id: string; name: string }>> = {
  all: [
    { id: 'all', name: 'All Events' },
    { id: 'live', name: 'Live Now' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'popular', name: 'Most Popular' }
  ],
  global: [
    { id: 'all', name: 'All Global Events' },
    { id: 'championship', name: 'Global Championship' },
    { id: 'friendship', name: 'Friendship Cup' },
    { id: 'qualifiers', name: 'World Qualifiers' }
  ],
  zone1: [
    { id: 'all', name: 'All Zone 1 Events' },
    { id: 'regional', name: 'Regional Championship' },
    { id: 'local', name: 'Local Tournaments' }
  ],
  zone2: [
    { id: 'all', name: 'All Zone 2 Events' },
    { id: 'regional', name: 'Regional Championship' },
    { id: 'local', name: 'Local Tournaments' }
  ],
  zone3: [
    { id: 'all', name: 'All Zone 3 Events' },
    { id: 'regional', name: 'Regional Championship' },
    { id: 'local', name: 'Local Tournaments' },
    { id: 'finals', name: 'Championship Finals' }
  ],
  zone4: [
    { id: 'all', name: 'All Zone 4 Events' },
    { id: 'regional', name: 'Regional Championship' },
    { id: 'local', name: 'Local Tournaments' }
  ],
  zone5: [
    { id: 'all', name: 'All Zone 5 Events' },
    { id: 'regional', name: 'Regional Championship' },
    { id: 'semifinals', name: 'Semi Finals' },
    { id: 'local', name: 'Local Tournaments' }
  ],
  community: [
    { id: 'all', name: 'All Community Events' },
    { id: 'showcase', name: 'Community Showcase' },
    { id: 'featured', name: 'Featured Players' },
    { id: 'weekly', name: 'Weekly Events' }
  ]
};

export const EventPills = ({ 
  selectedZone, 
  selectedEvent, 
  onZoneChange, 
  onEventChange 
}: EventPillsProps) => {
  const currentEvents = eventsByZone[selectedZone] || eventsByZone.all;
  const selectedZoneName = zones.find(z => z.id === selectedZone)?.name || 'All Zones';

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <h3 className="font-heading font-semibold text-lg">Filter by:</h3>
        
        {/* Zone Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="event-pill font-medium hover:border-primary"
            >
              {selectedZoneName}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-background border-border shadow-lg">
            {zones.map((zone) => (
              <DropdownMenuItem
                key={zone.id}
                onClick={() => {
                  onZoneChange(zone.id);
                  onEventChange('all'); // Reset event selection when zone changes
                }}
                className={`cursor-pointer hover:bg-accent ${
                  selectedZone === zone.id ? 'bg-accent text-accent-foreground' : ''
                }`}
              >
                {zone.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Event Type Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="event-pill font-medium hover:border-primary"
            >
              {currentEvents.find(e => e.id === selectedEvent)?.name || 'All Events'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background border-border shadow-lg">
            {currentEvents.map((event) => (
              <DropdownMenuItem
                key={event.id}
                onClick={() => onEventChange(event.id)}
                className={`cursor-pointer hover:bg-accent ${
                  selectedEvent === event.id ? 'bg-accent text-accent-foreground' : ''
                }`}
              >
                {event.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Horizontal Pills for Quick Access */}
      <div className="flex flex-wrap gap-2">
        {currentEvents.slice(0, 6).map((event) => (
          <Button
            key={event.id}
            variant="outline"
            size="sm"
            onClick={() => onEventChange(event.id)}
            className={`event-pill text-sm transition-all ${
              selectedEvent === event.id 
                ? 'active bg-primary text-primary-foreground border-primary' 
                : 'hover:border-primary'
            }`}
          >
            {event.name}
          </Button>
        ))}
      </div>

      {/* Live Stats */}
      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-live rounded-full animate-pulse"></div>
          <span>12 Live Events</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <span>8 Upcoming Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>2.3M Total Viewers</span>
        </div>
      </div>
    </div>
  );
};