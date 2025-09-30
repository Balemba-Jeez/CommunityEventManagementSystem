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
import { CalendarDays, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface IconStatisticsProps {
  page?: "events" | "pending-events" | "categories" | "default"
}

export function IconStatistics({ page = "default" }: IconStatisticsProps) {
  const showActiveEvents = page !== "pending-events"
  
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