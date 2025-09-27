"use client"

import { SortingDropdown } from "./sorting-dropdown"
import { EventSortingDropdown } from "./event-sorting-dropdown"
import { LayoutDropdown } from "./layout-dropdown"
import { FilterDropdown } from "./filter-dropdown"
import { IconStatistics } from "./icon-statistics"
import SearchComponent from "./search-component"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export function ResponsiveHeaderLabels() {
  return (
    <div className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6 lg:gap-8 flex-wrap lg:flex-nowrap">
          {/* Left side: Event context + actions */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            {/* Statistics section */}
            <div className="hidden md:block">
              <IconStatistics />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="text-xs md:text-sm px-3 md:px-4 h-9 md:h-10">New Event</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add new event</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="text-xs md:text-sm px-3 md:px-4 h-9 md:h-10 bg-transparent">
                      Export
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export events list as PDF</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Right side: Event view controls */}
          <div className="flex items-center gap-4 md:gap-5 flex-1 lg:flex-initial min-w-0">
            {/* Search bar */}
            <div className="flex-1 lg:w-64 min-w-0 mr-2 md:mr-4">
              <SearchComponent
                placeholder="Search events..."
                onSearch={(query) => console.log("Search:", query)}
                showMobileSearch={false}
                className="w-full"
              />
            </div>

            {/* View control dropdowns */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <SortingDropdown
                onSelectionChange={(selections) => {
                  console.log("Selection changed:", selections)
                }}
              />
              <FilterDropdown
                onFilterChange={(filters) => {
                  console.log("Filters changed:", filters)
                }}
              />
              <EventSortingDropdown
                onSortChange={(sortBy, order) => {
                  console.log("Sort changed:", sortBy, order)
                }}
              />
              <LayoutDropdown
                onLayoutChange={(layout) => {
                  console.log("Layout changed:", layout)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
