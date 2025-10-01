// "use client"

// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Folder, GitBranch, Edit, Trash2, FolderPlus, Plus } from "lucide-react"
// import { useState } from "react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// interface Category {
//   id: string
//   name: string
//   documentCount: number
//   description?: string
//   parentCategory?: string
//   zone?: string
//   createdAt?: string
//   hasParent?: boolean
//   eventsCount?: number
// }

// interface CategoriesGridProps {
//   categories: Category[]
// }

// export function CategoriesGrid({ categories }: CategoriesGridProps) {
//   const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())

//   const toggleSelection = (id: string) => {
//     const newSelection = new Set(selectedCategories)
//     if (newSelection.has(id)) {
//       newSelection.delete(id)
//     } else {
//       newSelection.add(id)
//     }
//     setSelectedCategories(newSelection)
//   }

//   return (
//     <TooltipProvider>
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
//         {categories.map((category) => (
//           <Card key={category.id} className="group relative overflow-hidden transition-all hover:shadow-lg">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 toggleSelection(category.id)
//               }}
//               className="absolute right-3 top-3 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-foreground/20 bg-background/80 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:border-foreground/40"
//               aria-label="Select category"
//             >
//               {selectedCategories.has(category.id) && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
//             </button>

//             <div className="flex flex-col gap-3 p-4">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="flex h-24 w-full items-center justify-center rounded-lg bg-muted/30">
//                   <div className="relative">
//                     <Folder className="h-16 w-16 text-yellow-500" strokeWidth={1.5} />
//                     {category.hasParent && (
//                       <GitBranch className="absolute -right-1.5 -top-1.5 h-5 w-5 text-muted-foreground/70" />
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex w-full translate-y-2 items-center  gap-0.5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           console.log("[v0] Edit category:", category.id)
//                         }}
//                       >
//                         <Edit className="h-3 w-3" />
//                         {/* <span className="text-xs">Edit</span> */}
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Edit category</p>
//                     </TooltipContent>
//                   </Tooltip>

//                   {/* <div className="h-5 w-px bg-border" /> */}

//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           console.log("[v0] Delete category:", category.id)
//                         }}
//                       >
//                         <Trash2 className="h-3 w-3" />
//                         {/* <span className="text-xs">Delete</span> */}
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Delete category</p>
//                     </TooltipContent>
//                   </Tooltip>

//                   {/* <div className="h-5 w-px bg-border" /> */}

//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           console.log("[v0] Add sub-category:", category.id)
//                         }}
//                       >
//                         <FolderPlus className="h-3 w-3" />
//                         {/* <span className="text-xs">Sub</span> */}
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Add sub-category</p>
//                     </TooltipContent>
//                   </Tooltip>

//                   {/* <div className="h-5 w-px bg-border" /> */}

//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           console.log("[v0] Add event:", category.id)
//                         }}
//                       >
//                         <Plus className="h-3 w-3" />
//                         {/* <span className="text-xs">Event</span> */}
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Add event to category</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </div>
//               </div>

//               <div className="flex items-start justify-between gap-2">
//                 <div className="flex-1 space-y-0.5">
//                   <h3 className="font-semibold text-foreground leading-tight">{category.name}</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {category.eventsCount === 0
//                       ? "No events"
//                       : category.eventsCount === 1
//                         ? "1 event"
//                         : `${category.eventsCount} events`}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end gap-0.5 text-right">
//                   {category.zone && (
//                     <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
//                       {category.zone}
//                     </span>
//                   )}
//                   {category.createdAt && <span className="text-xs text-muted-foreground">{category.createdAt}</span>}
//                 </div>
//               </div>

//               <div className="space-y-1.5 border-t pt-2">
//                 {category.description && (
//                   <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{category.description}</p>
//                 )}
//                 {category.parentCategory && (
//                   <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//                     <GitBranch className="h-3 w-3" />
//                     <span>Parent: {category.parentCategory}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </TooltipProvider>
//   )
// }

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder, GitBranch, Edit, Trash2, FolderPlus, Plus } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Event {
  id: string
  name: string
  startDate: string
  endDate: string
  isLive?: boolean
}

interface Category {
  id: string
  name: string
  events?: Event[]
  eventsCount?: number
  description?: string
  parentCategory?: string
  zone?: string
  createdAt?: string
  hasParent?: boolean
}

interface CategoriesGridProps {
  categories: Category[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedCategories)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedCategories(newSelection)
  }

  const hasOngoingEvent = (category: Category) => {
    if (!category.events) return false
    const now = new Date()
    return category.events.some(event => new Date(event.startDate) <= now && now <= new Date(event.endDate))
  }

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="group relative overflow-hidden transition-all hover:shadow-lg">
            {/* Selection button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleSelection(category.id)
              }}
              className="absolute right-3 top-3 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-foreground/20 bg-background/80 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:border-foreground/40"
              aria-label="Select category"
            >
              {selectedCategories.has(category.id) && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
            </button>

            <div className="flex flex-col gap-3 p-4">
              {/* Folder icon */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-24 w-full items-center justify-center rounded-lg bg-muted/30">
                  <div className="relative">
                    <Folder className="h-16 w-16 text-yellow-500" strokeWidth={1.5} />
                    {category.hasParent && (
                      <GitBranch className="absolute -right-1.5 -top-1.5 h-5 w-5 text-muted-foreground/70" />
                    )}
                  </div>
                </div>

                {/* Hover buttons */}
                <div className="flex w-full translate-y-2 items-center gap-0.5 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {/* Edit */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("[v0] Edit category:", category.id)
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit category</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Delete */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("[v0] Delete category:", category.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete category</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Add sub-category */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("[v0] Add sub-category:", category.id)
                        }}
                      >
                        <FolderPlus className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add sub-category</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Add event */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("[v0] Add event:", category.id)
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add event to category</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Live button only if category has ongoing event */}
                  {hasOngoingEvent(category) && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 gap-1 px-2 transition-all hover:scale-105 rounded-[5px]"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("[v0] Start live stream for category:", category.id)
                          }}
                        >
                          Live
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Start Live Stream</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>

              {/* Category info */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-0.5">
                  <h3 className="font-semibold text-foreground leading-tight">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.eventsCount === 0
                      ? "No events"
                      : category.eventsCount === 1
                        ? "1 event"
                        : `${category.eventsCount} events`}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-0.5 text-right">
                  {category.zone && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {category.zone}
                    </span>
                  )}
                  {category.createdAt && <span className="text-xs text-muted-foreground">{category.createdAt}</span>}
                </div>
              </div>

              {/* Description and parent info */}
              <div className="space-y-1.5 border-t pt-2">
                {category.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{category.description}</p>
                )}
                {category.parentCategory && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <GitBranch className="h-3 w-3" />
                    <span>Parent: {category.parentCategory}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}
