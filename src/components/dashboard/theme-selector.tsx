"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Monitor, Moon, Sun, Check } from "lucide-react"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { value: "system", label: "System", icon: Monitor },
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <Monitor className="size-4 mr-2" />
          Appearance
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 bg-gray-900 border-gray-800 text-white [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full"
        align="start"
        side="right"
      >
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer justify-between"
            >
              <div className="flex items-center">
                <Icon className="size-4 mr-2" />
                {themeOption.label}
              </div>
              {theme === themeOption.value && <Check className="size-4 text-green-500" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
