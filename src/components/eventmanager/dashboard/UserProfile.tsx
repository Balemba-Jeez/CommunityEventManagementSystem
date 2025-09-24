import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from "react";

export function useFormattedDateTime() {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 60 * 1000); // update every minute

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return dateTime;
}

// Helper function
function getFormattedDateTime(): string {
  const date = new Date();

  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "pm" : "am";

  const day = date.getDate();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${hours}:${minutes} ${ampm} ${day} ${month} ${year}`;
}

export function UserProfile() {

  const { loginUser } = useAuth();
  const currentTime = useFormattedDateTime();

  return <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm" style={{
        color: 'var(--muted-foreground)'
      }}>
          Welcome Back
        </div>
        <div className="text-sm" style={{
        color: 'var(--muted-foreground)'
      }}>
          Last Update: {currentTime}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold" style={{
          color: 'var(--foreground)'
        }}>
            {loginUser?.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

          </h2>
        </div>
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-4">
            <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
            backgroundImage: "url('https://i.pravatar.cc/100?img=32')",
            borderColor: 'var(--background)'
          }}></div>
            <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
            backgroundImage: "url('https://i.pravatar.cc/100?img=45')",
            borderColor: 'var(--background)'
          }}></div>
            <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
            backgroundImage: "url('https://i.pravatar.cc/100?img=68')",
            borderColor: 'var(--background)'
          }}></div>
            <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
            backgroundImage: "url('https://i.pravatar.cc/100?img=12')",
            borderColor: 'var(--background)'
          }}></div>
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2" style={{
            backgroundColor: 'var(--secondary)',
            borderColor: 'var(--background)',
            color: 'var(--secondary-foreground)'
          }}>
              8+
            </div>
          </div>
          <button className="flex items-center px-3 py-2 rounded-md text-sm hover:opacity-90" style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
          color: 'var(--card-foreground)'
        }}>
            <span className="mr-1">+</span>
            Invite Member
          </button>
        </div>
      </div>
    </div>;
}