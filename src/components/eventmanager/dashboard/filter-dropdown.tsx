// "use client"

// import { useState } from "react"
// import { ChevronDownIcon, FilterIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// type CategoryOption = "tech" | "music" | "sports" | "business" | "education"
// type StatusOption = "draft" | "pending" | "active" | "completed"
// type DateRangeOption = "today" | "this-week" | "this-month" | "custom"

// interface FilterState {
//   categories: CategoryOption[]
//   statuses: StatusOption[]
//   dateRanges: DateRangeOption[]
// }

// interface FilterDropdownProps {
//   onFilterChange?: (filters: FilterState) => void
// }

// export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
//   const [filters, setFilters] = useState<FilterState>({
//     categories: [],
//     statuses: [],
//     dateRanges: [],
//   })

//   const handleCategoryToggle = (category: CategoryOption, checked: boolean) => {
//     const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

//     const newFilters = { ...filters, categories: newCategories }
//     setFilters(newFilters)
//     onFilterChange?.(newFilters)
//   }

//   const handleStatusToggle = (status: StatusOption, checked: boolean) => {
//     const newStatuses = checked ? [...filters.statuses, status] : filters.statuses.filter((s) => s !== status)

//     const newFilters = { ...filters, statuses: newStatuses }
//     setFilters(newFilters)
//     onFilterChange?.(newFilters)
//   }

//   const handleDateRangeToggle = (dateRange: DateRangeOption, checked: boolean) => {
//     const newDateRanges = checked
//       ? [...filters.dateRanges, dateRange]
//       : filters.dateRanges.filter((d) => d !== dateRange)

//     const newFilters = { ...filters, dateRanges: newDateRanges }
//     setFilters(newFilters)
//     onFilterChange?.(newFilters)
//   }

//   const getFilterCount = () => {
//     return filters.categories.length + filters.statuses.length + filters.dateRanges.length
//   }

//   const getButtonLabel = () => {
//     const count = getFilterCount()
//     return count > 0 ? `Filters (${count})` : "Filters"
//   }

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="flex items-center gap-2 bg-background border-border text-foreground hover:bg-accent"
//                 >
//                   <FilterIcon className="h-4 w-4" />
//                   <ChevronDownIcon className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="start">
//                 <DropdownMenuGroup>
//                   <DropdownMenuSub>
//                     <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
//                     <DropdownMenuSubContent className="w-48 bg-popover border-border shadow-lg">
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleCategoryToggle("tech", !filters.categories.includes("tech"))}
//                       >
//                         <Checkbox
//                           checked={filters.categories.includes("tech")}
//                           onCheckedChange={(checked) => handleCategoryToggle("tech", checked as boolean)}
//                         />
//                         <span>Tech</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleCategoryToggle("music", !filters.categories.includes("music"))}
//                       >
//                         <Checkbox
//                           checked={filters.categories.includes("music")}
//                           onCheckedChange={(checked) => handleCategoryToggle("music", checked as boolean)}
//                         />
//                         <span>Music</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleCategoryToggle("sports", !filters.categories.includes("sports"))}
//                       >
//                         <Checkbox
//                           checked={filters.categories.includes("sports")}
//                           onCheckedChange={(checked) => handleCategoryToggle("sports", checked as boolean)}
//                         />
//                         <span>Sports</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleCategoryToggle("business", !filters.categories.includes("business"))}
//                       >
//                         <Checkbox
//                           checked={filters.categories.includes("business")}
//                           onCheckedChange={(checked) => handleCategoryToggle("business", checked as boolean)}
//                         />
//                         <span>Business</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleCategoryToggle("education", !filters.categories.includes("education"))}
//                       >
//                         <Checkbox
//                           checked={filters.categories.includes("education")}
//                           onCheckedChange={(checked) => handleCategoryToggle("education", checked as boolean)}
//                         />
//                         <span>Education</span>
//                       </DropdownMenuItem>
//                     </DropdownMenuSubContent>
//                   </DropdownMenuSub>

//                   <DropdownMenuSub>
//                     <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
//                     <DropdownMenuSubContent className="w-48 bg-popover border-border shadow-lg">
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleStatusToggle("draft", !filters.statuses.includes("draft"))}
//                       >
//                         <Checkbox
//                           checked={filters.statuses.includes("draft")}
//                           onCheckedChange={(checked) => handleStatusToggle("draft", checked as boolean)}
//                         />
//                         <span>Draft</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleStatusToggle("pending", !filters.statuses.includes("pending"))}
//                       >
//                         <Checkbox
//                           checked={filters.statuses.includes("pending")}
//                           onCheckedChange={(checked) => handleStatusToggle("pending", checked as boolean)}
//                         />
//                         <span>Pending</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleStatusToggle("active", !filters.statuses.includes("active"))}
//                       >
//                         <Checkbox
//                           checked={filters.statuses.includes("active")}
//                           onCheckedChange={(checked) => handleStatusToggle("active", checked as boolean)}
//                         />
//                         <span>Active</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleStatusToggle("completed", !filters.statuses.includes("completed"))}
//                       >
//                         <Checkbox
//                           checked={filters.statuses.includes("completed")}
//                           onCheckedChange={(checked) => handleStatusToggle("completed", checked as boolean)}
//                         />
//                         <span>Completed</span>
//                       </DropdownMenuItem>
//                     </DropdownMenuSubContent>
//                   </DropdownMenuSub>

//                   <DropdownMenuSub>
//                     <DropdownMenuSubTrigger>Date Range</DropdownMenuSubTrigger>
//                     <DropdownMenuSubContent className="w-48 bg-popover border-border shadow-lg">
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleDateRangeToggle("today", !filters.dateRanges.includes("today"))}
//                       >
//                         <Checkbox
//                           checked={filters.dateRanges.includes("today")}
//                           onCheckedChange={(checked) => handleDateRangeToggle("today", checked as boolean)}
//                         />
//                         <span>Today</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleDateRangeToggle("this-week", !filters.dateRanges.includes("this-week"))}
//                       >
//                         <Checkbox
//                           checked={filters.dateRanges.includes("this-week")}
//                           onCheckedChange={(checked) => handleDateRangeToggle("this-week", checked as boolean)}
//                         />
//                         <span>This Week</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleDateRangeToggle("this-month", !filters.dateRanges.includes("this-month"))}
//                       >
//                         <Checkbox
//                           checked={filters.dateRanges.includes("this-month")}
//                           onCheckedChange={(checked) => handleDateRangeToggle("this-month", checked as boolean)}
//                         />
//                         <span>This Month</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         className="flex items-center gap-2 cursor-pointer"
//                         onSelect={(e) => e.preventDefault()}
//                         onClick={() => handleDateRangeToggle("custom", !filters.dateRanges.includes("custom"))}
//                       >
//                         <Checkbox
//                           checked={filters.dateRanges.includes("custom")}
//                           onCheckedChange={(checked) => handleDateRangeToggle("custom", checked as boolean)}
//                         />
//                         <span>Custom</span>
//                       </DropdownMenuItem>
//                     </DropdownMenuSubContent>
//                   </DropdownMenuSub>
//                 </DropdownMenuGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Filter events by Category, Status, Date Range</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   )
// }

"use client"
import { useState } from "react"
import { ChevronDownIcon, FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CategoryOption = "tech" | "music" | "sports" | "business" | "education"
type StatusOption = "draft" | "pending" | "active" | "completed"
type DateRangeOption = "today" | "this-week" | "this-month" | "custom"

interface FilterState {
  categories: CategoryOption[]
  statuses: StatusOption[]
  dateRanges: DateRangeOption[]
}

interface FilterDropdownProps {
  onFilterChange?: (filters: FilterState) => void
  page?: "events" | "pending-events" | "categories" | "default"
}

export function FilterDropdown({ onFilterChange, page = "default" }: FilterDropdownProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    statuses: [],
    dateRanges: [],
  })
  
  const showStatusFilter = page !== "pending-events"

  const handleCategoryToggle = (category: CategoryOption, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)
    const newFilters = { ...filters, categories: newCategories }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleStatusToggle = (status: StatusOption, checked: boolean) => {
    const newStatuses = checked ? [...filters.statuses, status] : filters.statuses.filter((s) => s !== status)
    const newFilters = { ...filters, statuses: newStatuses }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleDateRangeToggle = (dateRange: DateRangeOption, checked: boolean) => {
    const newDateRanges = checked
      ? [...filters.dateRanges, dateRange]
      : filters.dateRanges.filter((d) => d !== dateRange)
    const newFilters = { ...filters, dateRanges: newDateRanges }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-background border-border text-foreground hover:bg-accent"
                >
                  <FilterIcon className="h-4 w-4" />
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="start">
                <DropdownMenuGroup>
                  {/* Category Filter */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48 bg-popover border-border shadow-lg">
                      {(["tech", "music", "sports", "business", "education"] as CategoryOption[]).map((category) => (
                        <DropdownMenuItem
                          key={category}
                          className="flex items-center gap-2 cursor-pointer"
                          onSelect={(e) => e.preventDefault()}
                          onClick={() => handleCategoryToggle(category, !filters.categories.includes(category))}
                        >
                          <Checkbox
                            checked={filters.categories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                          />
                          <span className="capitalize">{category}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  {/* Status Filter - Hidden on pending-events page */}
                  {showStatusFilter && (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-48 bg-popover border-border shadow-lg">
                        {(["draft", "pending", "active", "completed"] as StatusOption[]).map((status) => (
                          <DropdownMenuItem
                            key={status}
                            className="flex items-center gap-2 cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                            onClick={() => handleStatusToggle(status, !filters.statuses.includes(status))}
                          >
                            <Checkbox
                              checked={filters.statuses.includes(status)}
                              onCheckedChange={(checked) => handleStatusToggle(status, checked as boolean)}
                            />
                            <span className="capitalize">{status}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  )}

                  {/* Date Range Filter */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Date Range</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48 bg-popover border-border shadow-lg">
                      {(["today", "this-week", "this-month", "custom"] as DateRangeOption[]).map((dateRange) => (
                        <DropdownMenuItem
                          key={dateRange}
                          className="flex items-center gap-2 cursor-pointer"
                          onSelect={(e) => e.preventDefault()}
                          onClick={() => handleDateRangeToggle(dateRange, !filters.dateRanges.includes(dateRange))}
                        >
                          <Checkbox
                            checked={filters.dateRanges.includes(dateRange)}
                            onCheckedChange={(checked) => handleDateRangeToggle(dateRange, checked as boolean)}
                          />
                          <span className="capitalize">{dateRange.replace("-", " ")}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{showStatusFilter ? "Filter events by Category, Status, Date Range" : "Filter events by Category, Date Range"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}