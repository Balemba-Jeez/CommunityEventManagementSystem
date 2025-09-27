import { BarChart3Icon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface StatisticsDisplayProps {
  totalEvents?: number
  pendingApproval?: number
  activeEvents?: number
}

export function StatisticsDisplay({
  totalEvents = 25,
  pendingApproval = 5,
  activeEvents = 10,
}: StatisticsDisplayProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart3Icon className="h-4 w-4" />
            <span>
              Showing {totalEvents} events · {pendingApproval} Pending Approval · {activeEvents} Active
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Overview of current events and statuses</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
