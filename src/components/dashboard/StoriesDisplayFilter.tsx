"use client"

import { useState, useEffect } from "react"
import { ChevronDownIcon, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Zone {
  id: string
  name: string
}

interface Event {
  id: string
  name: string
}

const fetchZones = async (): Promise<Zone[]> => {
  // TODO: Replace with actual API call
  // return await fetch('/api/zones').then(res => res.json())

  // Static data for now
  return [
    { id: "zone-1", name: "Zone 1" },
    { id: "zone-2", name: "Zone 2" },
    { id: "zone-3", name: "Zone 3" },
    { id: "zone-4", name: "Zone 4" },
    { id: "zone-5", name: "Zone 5" },
  ]
}

const fetchGlobalEvents = async (): Promise<Event[]> => {
  // TODO: Replace with actual API call
  // return await fetch('/api/events/global').then(res => res.json())

  // Static data for now
  return [
    { id: "global-1", name: "Global System Alert" },
    { id: "global-2", name: "Network Maintenance" },
    { id: "global-3", name: "Security Update" },
    { id: "global-4", name: "Performance Optimization" },
    { id: "global-5", name: "Database Backup" },
  ]
}

const fetchZoneEvents = async (zoneId: string): Promise<Event[]> => {
  // TODO: Replace with actual API call
  // return await fetch(`/api/zones/${zoneId}/events`).then(res => res.json())

  // Static data for now
  const staticZoneEvents: Record<string, Event[]> = {
    "zone-1": [
      { id: "z1-event-1", name: "Server Restart" },
      { id: "z1-event-2", name: "Load Balancer Update" },
      { id: "z1-event-3", name: "Cache Refresh" },
    ],
    "zone-2": [
      { id: "z2-event-1", name: "Database Migration" },
      { id: "z2-event-2", name: "API Gateway Update" },
      { id: "z2-event-3", name: "SSL Certificate Renewal" },
    ],
    "zone-3": [
      { id: "z3-event-1", name: "Storage Expansion" },
      { id: "z3-event-2", name: "Network Reconfiguration" },
      { id: "z3-event-3", name: "Monitoring Setup" },
    ],
    "zone-4": [
      { id: "z4-event-1", name: "Firewall Update" },
      { id: "z4-event-2", name: "Backup Verification" },
      { id: "z4-event-3", name: "Performance Tuning" },
    ],
    "zone-5": [
      { id: "z5-event-1", name: "Service Deployment" },
      { id: "z5-event-2", name: "Log Rotation" },
      { id: "z5-event-3", name: "Health Check Update" },
    ],
  }

  return staticZoneEvents[zoneId] || []
}

export function StoriesDisplayDropdown() {
  const [selectedView, setSelectedView] = useState<string>("All Events")
  const [selectedZone, setSelectedZone] = useState<string>("")
  const [selectedEvent, setSelectedEvent] = useState<string>("")

  const [zones, setZones] = useState<Zone[]>([])
  const [globalEvents, setGlobalEvents] = useState<Event[]>([])
  const [zoneEventsCache, setZoneEventsCache] = useState<Record<string, Event[]>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true)
      try {
        const [zonesData, globalEventsData] = await Promise.all([fetchZones(), fetchGlobalEvents()])
        setZones(zonesData)
        setGlobalEvents(globalEventsData)
      } catch (error) {
        console.error("Failed to load initial data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const loadZoneEvents = async (zoneId: string) => {
    if (zoneEventsCache[zoneId]) {
      return zoneEventsCache[zoneId]
    }

    try {
      const events = await fetchZoneEvents(zoneId)
      setZoneEventsCache((prev) => ({
        ...prev,
        [zoneId]: events,
      }))
      return events
    } catch (error) {
      console.error(`Failed to load events for zone ${zoneId}:`, error)
      return []
    }
  }

  const refreshData = async () => {
    setLoading(true)
    try {
      const [zonesData, globalEventsData] = await Promise.all([fetchZones(), fetchGlobalEvents()])
      setZones(zonesData)
      setGlobalEvents(globalEventsData)
      setZoneEventsCache({}) // Clear cache to force reload
    } catch (error) {
      console.error("Failed to refresh data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGlobalEventSelect = (eventName: string) => {
    setSelectedView("Global")
    setSelectedEvent(eventName)
    setSelectedZone("")
  }

  const handleZoneEventSelect = (zoneName: string, eventName: string) => {
    setSelectedView("Zone")
    setSelectedZone(zoneName)
    setSelectedEvent(eventName)
  }

  const getDisplayText = () => {
    if (loading) return "Loading..."
    if (selectedView === "Global" && selectedEvent) {
      return `Global: ${selectedEvent}`
    }
    if (selectedView === "Zone" && selectedZone && selectedEvent) {
      return `${selectedZone}: ${selectedEvent}`
    }
    return "View"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2 text-sm font-medium bg-transparent" disabled={loading}>
          <EyeIcon className="h-3.5 w-3.5" />
          {getDisplayText()}
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">Event View Options</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Global Events Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">Global Events</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuLabel className="text-xs">Global Events</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {globalEvents.map((event) => (
              <DropdownMenuItem key={event.id} onClick={() => handleGlobalEventSelect(event.name)} className="text-sm">
                {event.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Zone Events Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">Zone Events</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuLabel className="text-xs">Select Zone</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {zones.map((zone) => (
              <DropdownMenuSub key={zone.id}>
                <DropdownMenuSubTrigger
                  className="text-sm"
                  onSelect={() => loadZoneEvents(zone.id)} // Preload events when zone is hovered
                >
                  {zone.name}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuLabel className="text-xs">{zone.name} Events</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {zoneEventsCache[zone.id]?.map((event) => (
                    <DropdownMenuItem
                      key={event.id}
                      onClick={() => handleZoneEventSelect(zone.name, event.name)}
                      className="text-sm"
                    >
                      {event.name}
                    </DropdownMenuItem>
                  )) || (
                    <DropdownMenuItem disabled className="text-sm text-muted-foreground">
                      Loading events...
                    </DropdownMenuItem>
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={refreshData} className="text-sm text-muted-foreground">
          Refresh Data
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setSelectedView("All Events")
            setSelectedZone("")
            setSelectedEvent("")
          }}
          className="text-sm text-muted-foreground"
        >
          Clear Selection
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
