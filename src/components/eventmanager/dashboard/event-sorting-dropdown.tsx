// "use client"

// import { useState } from "react"
// import { ChevronDownIcon, ArrowUpDownIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// type SortOption = "date" | "status" | "title" | "location" | "category" | "createdAt"
// type SortOrder = "asc" | "desc"

// interface EventSortingDropdownProps {
//   onSortChange?: (sortBy: SortOption, order: SortOrder) => void
// }

// export function EventSortingDropdown({ onSortChange }: EventSortingDropdownProps) {
//   const [sortBy, setSortBy] = useState<SortOption>("date")
//   const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

//   const handleSortFieldChange = (newSortBy: SortOption) => {
//     setSortBy(newSortBy)
//     onSortChange?.(newSortBy, sortOrder)
//   }

//   const handleOrderChange = (newOrder: SortOrder) => {
//     setSortOrder(newOrder)
//     onSortChange?.(sortBy, newOrder)
//   }

//   const getSortLabel = () => {
//     const labels = {
//       date: "Date",
//       status: "Status",
//       title: "Title",
//       location: "Location",
//       category: "Category",
//       createdAt: "Created At",
//     }
//     return `${labels[sortBy]} (${sortOrder === "asc" ? "A-Z" : "Z-A"})`
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
//                   <ArrowUpDownIcon className="h-4 w-4" />
//                   <ChevronDownIcon className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="start">
//                 <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Sorting Factor</div>
//                 <DropdownMenuGroup>
//                   <div className="px-2 py-2">
//                     <RadioGroup value={sortBy} onValueChange={handleSortFieldChange}>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="date" id="date" />
//                         <Label htmlFor="date" className="cursor-pointer">
//                           Date
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="status" id="status" />
//                         <Label htmlFor="status" className="cursor-pointer">
//                           Status
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="title" id="title" />
//                         <Label htmlFor="title" className="cursor-pointer">
//                           Title
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="location" id="location" />
//                         <Label htmlFor="location" className="cursor-pointer">
//                           Location
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="category" id="category" />
//                         <Label htmlFor="category" className="cursor-pointer">
//                           Category
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="createdAt" id="createdAt" />
//                         <Label htmlFor="createdAt" className="cursor-pointer">
//                           Created At
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 </DropdownMenuGroup>

//                 <DropdownMenuSeparator />

//                 <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Order Direction</div>
//                 <DropdownMenuGroup>
//                   <div className="px-2 py-2">
//                     <RadioGroup value={sortOrder} onValueChange={handleOrderChange}>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="asc" id="asc" />
//                         <Label htmlFor="asc" className="cursor-pointer">
//                           Ascending (A-Z)
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="desc" id="desc" />
//                         <Label htmlFor="desc" className="cursor-pointer">
//                           Descending (Z-A)
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 </DropdownMenuGroup>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Sort events</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   )
// }

"use client"
import { useState } from "react"
import { ChevronDownIcon, ArrowUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SortOption = "date" | "status" | "title" | "location" | "category" | "createdAt"
type SortOrder = "asc" | "desc"

interface EventSortingDropdownProps {
  onSortChange?: (sortBy: SortOption, order: SortOrder) => void
  page?: "events" | "pending-events" | "categories" | "go-live" | "default"
}

export function EventSortingDropdown({ onSortChange, page = "default" }: EventSortingDropdownProps) {
  const [sortBy, setSortBy] = useState<SortOption>("date")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  
  const showStatusSort = page !== "pending-events" && page !== "categories" && page !== "go-live"
  const showCategorySort = page !== "categories"

  const handleSortFieldChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy)
    onSortChange?.(newSortBy, sortOrder)
  }

  const handleOrderChange = (newOrder: SortOrder) => {
    setSortOrder(newOrder)
    onSortChange?.(sortBy, newOrder)
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
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="start">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Sorting Factor</div>
                <DropdownMenuGroup>
                  <div className="px-2 py-2">
                    <RadioGroup value={sortBy} onValueChange={handleSortFieldChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="date" id="date" />
                        <Label htmlFor="date" className="cursor-pointer">
                          Date
                        </Label>
                      </div>
                      {/* Status option - Hidden on pending-events page */}
                      {showStatusSort && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="status" id="status" />
                          <Label htmlFor="status" className="cursor-pointer">
                            Status
                          </Label>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="title" id="title" />
                        <Label htmlFor="title" className="cursor-pointer">
                          Title
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="location" id="location" />
                        <Label htmlFor="location" className="cursor-pointer">
                          Location
                        </Label>
                      </div>
                      {/* Category option - Hidden on categories page */}
                      {showCategorySort && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="category" id="category" />
                          <Label htmlFor="category" className="cursor-pointer">
                            Category
                          </Label>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="createdAt" id="createdAt" />
                        <Label htmlFor="createdAt" className="cursor-pointer">
                          Created At
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">Order Direction</div>
                <DropdownMenuGroup>
                  <div className="px-2 py-2">
                    <RadioGroup value={sortOrder} onValueChange={handleOrderChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="asc" id="asc" />
                        <Label htmlFor="asc" className="cursor-pointer">
                          Ascending (A-Z)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="desc" id="desc" />
                        <Label htmlFor="desc" className="cursor-pointer">
                          Descending (Z-A)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sort events</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}