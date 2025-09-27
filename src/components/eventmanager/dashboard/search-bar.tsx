"use client"

import type React from "react"

import { useState } from "react"
import { SearchIcon, ClockIcon, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "What are you looking for?" }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [recentSearches] = useState(["windows 11 file explorer", "Community event website"])

  const handleSearch = () => {
    onSearch?.(query)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pr-12 bg-background border-border"
        />
        <Button
          onClick={handleSearch}
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-pink-500 hover:bg-pink-600"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Recent searches dropdown - shown when input is focused */}
      {query === "" && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50">
          {recentSearches.map((search, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 hover:bg-accent cursor-pointer"
              onClick={() => setQuery(search)}
            >
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{search}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <XIcon className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
