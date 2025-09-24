"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, UserPlus, HelpCircle, LogOut, Hash, Shield, Megaphone, TrendingUp, Target } from "lucide-react"
import { ThemeSelector } from "./theme-selector"
import UserAvatar from "./UserAvatar"
import { useAuth } from "@/context/AuthContext";

export function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { loginUser: user, logout } = useAuth();

  // Mock user data
  // const user = {
  //   name: "PCCommunity's Lovable",
  //   email: "pccommunityevents@gmail.com",
  //   initials: "P",
  //   personZone: 42,
  //   role: "Administrator",
  //   isPro: false,
  // }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-72 p-0 bg-gray-900 border-gray-800 text-white [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full"
        align="end"
        sideOffset={8}
      >
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <UserAvatar />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white truncate">{user?.name}</div>
              <div className="text-sm text-gray-400 truncate">{user?.email}</div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Hash className="size-3" />
                  Zone {user?.zone}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Shield className="size-3" />
                  {user?.role}
                </div>
              </div>
            </div>
          </div>
        </div>


    {/* Only show advertising section for members */}
    {user?.role === 'member' && (
      <div className="p-4 border-b border-gray-800">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="size-4 text-blue-500" />
              <span className="text-white font-medium">Start Advertising</span>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-4">
              Get Started
            </Button>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <Target className="size-3 text-green-400" />
              <span>Reach your target audience effectively</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="size-3 text-green-400" />
              <span>Track performance with detailed analytics</span>
            </div>
            <div className="text-gray-500">Customizable ad formats • Real-time insights • Boost visibility</div>
          </div>
        </div>
      </div>
    )}

        {/* Action Buttons */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <Settings className="size-4 mr-2" />
              Settings
            </Button>
            {/* <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <UserPlus className="size-4 mr-2" />
              Invite
            </Button> */}
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer">
            <HelpCircle className="size-4 mr-2" />
            Help Center
          </DropdownMenuItem>

          <div className="px-2 py-1">
            <ThemeSelector />
          </div>

          <DropdownMenuSeparator className="bg-gray-800 my-2" />

          <DropdownMenuItem 
            className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
            onClick={() => {
              logout();  // call your logout function
              setIsOpen(false); // close the dropdown after logout
            }}
            >
            <LogOut className="size-4 mr-2" />
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
