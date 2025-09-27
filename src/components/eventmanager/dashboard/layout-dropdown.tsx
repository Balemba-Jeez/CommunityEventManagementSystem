"use client"

import { useState } from "react"
import { ChevronDownIcon, Grid3X3, List, LayoutGrid, Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type LayoutOption = "grid" | "list" | "table" | "cards"

interface LayoutDropdownProps {
  onLayoutChange?: (layout: LayoutOption) => void
}

export function LayoutDropdown({ onLayoutChange }: LayoutDropdownProps) {
  const [selectedLayout, setSelectedLayout] = useState<LayoutOption>("grid")

  const handleLayoutChange = (layout: LayoutOption) => {
    setSelectedLayout(layout)
    onLayoutChange?.(layout)
  }

  const getLayoutIcon = (layout: LayoutOption) => {
    switch (layout) {
      case "grid":
        return <Grid3X3 className="h-4 w-4" />
      case "list":
        return <List className="h-4 w-4" />
      case "table":
        return <Table className="h-4 w-4" />
      case "cards":
        return <LayoutGrid className="h-4 w-4" />
      default:
        return <Grid3X3 className="h-4 w-4" />
    }
  }

  const getLayoutLabel = (layout: LayoutOption) => {
    switch (layout) {
      case "grid":
        return "Grid"
      case "list":
        return "List"
      case "table":
        return "Table"
      case "cards":
        return "Cards"
      default:
        return "Grid"
    }
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
                  {getLayoutIcon(selectedLayout)}
                  {getLayoutLabel(selectedLayout)}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 bg-popover border-border shadow-lg" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleLayoutChange("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span>Grid</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleLayoutChange("list")}
                  >
                    <List className="h-4 w-4" />
                    <span>List</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleLayoutChange("table")}
                  >
                    <Table className="h-4 w-4" />
                    <span>Table</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleLayoutChange("cards")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span>Cards</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change layout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
