"use client"

import { SortingDropdown } from "./sorting-dropdown"
import { EventSortingDropdown } from "./event-sorting-dropdown"
import { LayoutDropdown } from "./layout-dropdown"
import { FilterDropdown } from "./filter-dropdown"
import { IconStatistics } from "./icon-statistics"
import SearchComponent from "./search-component"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { CalendarPlusIcon, DownloadIcon } from "lucide-react"

interface ResponsiveHeaderIconsProps {
  layout?: "grid" | "list"
  onLayoutChange?: (layout: "grid" | "list") => void
  page?: "events" | "pending-events" | "categories" | "go-live" | "default"
}

export function ResponsiveHeaderIcons({ layout = "grid", onLayoutChange, page = "default" }: ResponsiveHeaderIconsProps) {
  const handleLayoutChange = (selectedLayout: "grid" | "list" | "table" | "cards") => {
    // Map layout options to grid/list for EventLayout
    if (selectedLayout === "grid" || selectedLayout === "cards") {
      onLayoutChange?.("grid")
    } else if (selectedLayout === "list" || selectedLayout === "table") {
      onLayoutChange?.("list")
    }
  }

  const showSortingDropdown = page !== "categories"
  
  // Dynamic button text based on page
  const getAddButtonText = () => {
    if (page === "categories") return "Add new category"
    if (page === "go-live") return "Start a new stream"
    return "Add new event"
  }

  const getExportButtonText = () => {
    if (page === "categories") return "Export categories list as PDF"
    if (page === "go-live") return "Export streams list as PDF"
    return "Export events list as PDF"
  }

  const getSearchPlaceholder = () => {
    if (page === "categories") return "Search categories..."
    if (page === "go-live") return "Search streams..."
    return "Search events..."
  }

  return (
    <div className="w-full bg-background ">
      <div className="max-w-7xl">
        <div className="flex items-center justify-between gap-6 lg:gap-8 flex-wrap lg:flex-nowrap">
          {/* Left side: Event context + actions */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            {/* Statistics section */}
            <div className="hidden md:block">
              <IconStatistics page={page} />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="p-2.5 h-9 w-9 md:h-10 md:w-10">
                      <CalendarPlusIcon className="h-4 w-4 md:h-4 md:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getAddButtonText()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="p-2.5 h-9 w-9 md:h-10 md:w-10 bg-transparent">
                      <DownloadIcon className="h-4 w-4 md:h-4 md:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getExportButtonText()}</p>
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
                placeholder={getSearchPlaceholder()}
                onSearch={(query) => console.log("Search:", query)}
                showMobileSearch={false}
                className="w-full"
              />
            </div>

            {/* View control dropdowns */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              {showSortingDropdown && (
                <SortingDropdown
                  page={page}
                  onSelectionChange={(selections) => {
                    console.log("Selection changed:", selections)
                  }}
                />
              )}
              <FilterDropdown
                page={page}
                onFilterChange={(filters) => {
                  console.log("Filters changed:", filters)
                }}
              />
              <EventSortingDropdown
                page={page}
                onSortChange={(sortBy, order) => {
                  console.log("Sort changed:", sortBy, order)
                }}
              />
              <LayoutDropdown
                onLayoutChange={handleLayoutChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}