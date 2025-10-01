// "use client"

// import { CalendarDays, Clock, CheckCircle } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

// export function IconStatistics() {
//   return (
//     <div className="flex items-center gap-3 md:gap-4">
//       <TooltipProvider>
//         {/* Total Events */}
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div className="relative cursor-help">
//               <CalendarDays className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
//               <Badge
//                 variant="default"
//                 className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4"
//               >
//                 25
//               </Badge>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Total Events</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <TooltipProvider>
//         {/* Pending Approval */}
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div className="relative cursor-help">
//               <Clock className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
//               <Badge
//                 variant="secondary"
//                 className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4"
//               >
//                 5
//               </Badge>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Pending Approval</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <TooltipProvider>
//         {/* Active Events */}
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div className="relative cursor-help">
//               <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
//               <Badge
//                 variant="outline"
//                 className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4 bg-green-500 text-white border-green-500"
//               >
//                 10
//               </Badge>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>Active Events</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </div>
//   )
// }


"use client"
import { CalendarDays, Clock, CheckCircle, Folder, Video, Radio } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface IconStatisticsProps {
  page?: "events" | "pending-events" | "categories" | "go-live" | "default"
}

export function IconStatistics({ page = "default" }: IconStatisticsProps) {
  const showActiveEvents = page !== "pending-events"
  const isCategoriesPage = page === "categories"
  const isGoLivePage = page === "go-live"
 
  // For categories page, show only total categories
  if (isCategoriesPage) {
    return (
      <div className="flex items-center gap-3 md:gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative cursor-help">
                <Folder className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4"
                >
                  10
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total Categories</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  // For go-live page, show stream statistics
  if (isGoLivePage) {
    return (
      <div className="flex items-center gap-3 md:gap-4">
        <TooltipProvider>
          {/* Ready to Stream */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative cursor-help">
                <Video className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4"
                >
                  8
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ready to Stream</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          {/* Ongoing Streams */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative cursor-help">
                <Radio className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
                <Badge
                  variant="outline"
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4 bg-red-500 text-white border-red-500"
                >
                  3
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ongoing Streams</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  // For events pages, show events statistics
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <TooltipProvider>
        {/* Total Events */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative cursor-help">
              <CalendarDays className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
              <Badge
                variant="default"
                className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4"
              >
                25
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Total Events</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        {/* Pending Approval */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative cursor-help">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4"
              >
                5
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Pending Approval</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Active Events - Hidden on pending-events page */}
      {showActiveEvents && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative cursor-help">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground hover:text-foreground transition-colors" />
                <Badge
                  variant="outline"
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] rounded-full flex items-center justify-center min-w-4 bg-green-500 text-white border-green-500"
                >
                  10
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Active Events</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}