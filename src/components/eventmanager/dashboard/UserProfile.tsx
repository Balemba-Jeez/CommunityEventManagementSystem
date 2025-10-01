// import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import { useAuth } from '@/context/AuthContext';
// import { useState, useEffect } from "react";
// import { UserCheck, MapPin, Clock, Users, Video, FolderOpen, Award } from "lucide-react";
// import TypingWithIcon from './TypingWithIcon';
// import TextType from './TextType';




// export function useFormattedDateTime() {
//   const [dateTime, setDateTime] = useState(getFormattedDateTime());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDateTime(getFormattedDateTime());
//     }, 60 * 1000); // update every minute

//     return () => clearInterval(interval); // cleanup on unmount
//   }, []);

//   return dateTime;
// }

// // Helper function
// function getFormattedDateTime(): string {
//   const date = new Date();

//   const hours = date.getHours() % 12 || 12;
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const ampm = date.getHours() >= 12 ? "pm" : "am";

//   const day = date.getDate();
//   const monthNames = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];
//   const month = monthNames[date.getMonth()];
//   const year = date.getFullYear();

//   return `${hours}:${minutes} ${ampm} ${day} ${month} ${year}`;
// }

// export function UserProfile() {

//   const { loginUser } = useAuth();
//   const currentTime = useFormattedDateTime();

//   const welcomeTexts = [
//    `Welcome back`, 
//    "Oversee community and zone events",
//    "Track upcoming deadlines",
//    "Engage participants effortlessly" ,
//    "Go live and share memorable moments" ,
//    "Organize categories and events like a pro" ,
//    "Celebrate community milestones together" 
// ];

//   return <div className="mb-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className="text-sm" style={{
//         color: 'var(--muted-foreground)'
//       }}>
//           <TextType text={welcomeTexts} textColors={['#111827']}  className="text-4xl font-bold"/>
//         </div>
//         <div className="text-sm" style={{
//         color: 'var(--muted-foreground)'
//       }}>
//           Last Update: {currentTime}
//         </div>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <h2 className="text-2xl font-bold" style={{
//           color: 'var(--foreground)'
//         }}>
//             {loginUser?.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

//           </h2>
//         </div>
//         <div className="flex items-center">
//           <div className="flex -space-x-2 mr-4">
//             <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
//             backgroundImage: "url('https://i.pravatar.cc/100?img=32')",
//             borderColor: 'var(--background)'
//           }}></div>
//             <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
//             backgroundImage: "url('https://i.pravatar.cc/100?img=45')",
//             borderColor: 'var(--background)'
//           }}></div>
//             <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
//             backgroundImage: "url('https://i.pravatar.cc/100?img=68')",
//             borderColor: 'var(--background)'
//           }}></div>
//             <div className="h-8 w-8 rounded-full bg-cover bg-center border-2" style={{
//             backgroundImage: "url('https://i.pravatar.cc/100?img=12')",
//             borderColor: 'var(--background)'
//           }}></div>
//             <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2" style={{
//             backgroundColor: 'var(--secondary)',
//             borderColor: 'var(--background)',
//             color: 'var(--secondary-foreground)'
//           }}>
//               8+
//             </div>
//           </div>
//           <button className="flex items-center px-3 py-2 rounded-md text-sm hover:opacity-90" style={{
//           backgroundColor: 'var(--card)',
//           border: '1px solid var(--border)',
//           color: 'var(--card-foreground)'
//         }}>
//             <span className="mr-1">+</span>
//             Invite Member
//           </button>
//         </div>
//       </div>
//     </div>;
// }

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from "react";
import TextType from './TextType';

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

  const welcomeTexts = [
    "Welcome back, 👋",
    "Oversee community and zone events 📍",
    "Track upcoming deadlines ⏰",
    "Engage participants effortlessly 🤝",
    "Go live and share memorable moments 🎥",
    "Organize categories and events like a pro 📂",
    "Celebrate community milestones together 🎉"
  ];

  return (
    <div className="mb-6">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        {/* Animated Welcome Text */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          <TextType
            text={welcomeTexts}
            typingSpeed={100}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="text-2xl sm:text-2xl md:text-3xl font-bold"
            textColors={['var(--foreground)']} // Theme-safe
          />
        </div>

        {/* Last Update */}
        <div className="text-sm text-muted-foreground">
          Last Update: {currentTime}
        </div>
      </div>

      {/* User Info Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-foreground">
            {loginUser?.name
              ?.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </h2>
        </div>

        {/* Team Avatars and Invite Button */}
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-4">
            {[32, 45, 68, 12].map((img, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full bg-cover bg-center border-2"
                style={{
                  backgroundImage: `url('https://i.pravatar.cc/100?img=${img}')`,
                  borderColor: 'var(--background)'
                }}
              />
            ))}
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2"
                 style={{
                   backgroundColor: 'var(--secondary)',
                   borderColor: 'var(--background)',
                   color: 'var(--secondary-foreground)'
                 }}>
              8+
            </div>
          </div>

          <button
            className="flex items-center px-3 py-2 rounded-md text-sm hover:opacity-90"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--card-foreground)'
            }}
          >
            <span className="mr-1">+</span>
            Invite Member
          </button>
        </div>
      </div>
    </div>
  );
}
