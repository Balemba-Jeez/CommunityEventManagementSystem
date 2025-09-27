"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
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

type ActionOption = "global" | "zone"
type ZoneOption = "zone-1" | "zone-2" | "zone-3" | "zone-4" | "zone-5"

interface SortingDropdownProps {
  onSelectionChange?: (selections: { global: boolean; zones: ZoneOption[] }) => void
}

export function SortingDropdown({ onSelectionChange }: SortingDropdownProps) {
  const [globalSelected, setGlobalSelected] = useState(false)
  const [selectedZones, setSelectedZones] = useState<ZoneOption[]>([])

  const handleGlobalToggle = (checked: boolean) => {
    setGlobalSelected(checked)
    onSelectionChange?.({ global: checked, zones: selectedZones })
  }

  const handleZoneToggle = (zone: ZoneOption, checked: boolean) => {
    const newSelectedZones = checked ? [...selectedZones, zone] : selectedZones.filter((z) => z !== zone)

    setSelectedZones(newSelectedZones)
    onSelectionChange?.({ global: globalSelected, zones: newSelectedZones })
  }

  const getButtonLabel = () => {
    const selections = []
    if (globalSelected) selections.push("Global")
    if (selectedZones.length > 0) {
      if (selectedZones.length === 1) {
        selections.push(`Zone ${selectedZones[0].split("-")[1]}`)
      } else {
        selections.push(`${selectedZones.length} Zones`)
      }
    }
    return selections.length > 0 ? selections.join(", ") : "Select Actions"
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
                  {getButtonLabel()}
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover border-border shadow-lg" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => handleGlobalToggle(!globalSelected)}
                  >
                    <Checkbox checked={globalSelected} onCheckedChange={handleGlobalToggle} />
                    <span>Global</span>
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Zones</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48 bg-popover border-border shadow-lg">
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleZoneToggle("zone-1", !selectedZones.includes("zone-1"))}
                      >
                        <Checkbox
                          checked={selectedZones.includes("zone-1")}
                          onCheckedChange={(checked) => handleZoneToggle("zone-1", checked as boolean)}
                        />
                        <span>Zone 1</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleZoneToggle("zone-2", !selectedZones.includes("zone-2"))}
                      >
                        <Checkbox
                          checked={selectedZones.includes("zone-2")}
                          onCheckedChange={(checked) => handleZoneToggle("zone-2", checked as boolean)}
                        />
                        <span>Zone 2</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleZoneToggle("zone-3", !selectedZones.includes("zone-3"))}
                      >
                        <Checkbox
                          checked={selectedZones.includes("zone-3")}
                          onCheckedChange={(checked) => handleZoneToggle("zone-3", checked as boolean)}
                        />
                        <span>Zone 3</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleZoneToggle("zone-4", !selectedZones.includes("zone-4"))}
                      >
                        <Checkbox
                          checked={selectedZones.includes("zone-4")}
                          onCheckedChange={(checked) => handleZoneToggle("zone-4", checked as boolean)}
                        />
                        <span>Zone 4</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                        onClick={() => handleZoneToggle("zone-5", !selectedZones.includes("zone-5"))}
                      >
                        <Checkbox
                          checked={selectedZones.includes("zone-5")}
                          onCheckedChange={(checked) => handleZoneToggle("zone-5", checked as boolean)}
                        />
                        <span>Zone 5</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Select global or zone events</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

import * as React from "react"

const TooltipContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => {})

interface TooltipProviderProps {
  children: React.ReactNode
}

const TooltipProvider = ({ children }: TooltipProviderProps) => {
  const [open, setOpen] = React.useState(false)

  return <TooltipContext.Provider value={setOpen}>{children}</TooltipContext.Provider>
}

export { TooltipProvider, TooltipContext }
