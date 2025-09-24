// import React from 'react';
// import { DollarSign, Ticket, FileText, Users, ChevronRight } from 'lucide-react';
// export function StatCards() {
//   return <div className="grid grid-cols-4 gap-4 mb-6">
//       <StatCard icon={<DollarSign className="h-5 w-5" style={{
//       color: 'var(--primary)'
//     }} />} iconBg="var(--muted)" title="Net sales" value="$975.50" subtext="$1020.50 gross sales" color="var(--primary)" />
//       <StatCard icon={<Ticket className="h-5 w-5" style={{
//       color: 'var(--primary-foreground)'
//     }} />} iconBg="var(--primary)" title="Ticket Sold" value="300" valueExtra="/500" subtext="50 paid • 250 free" color="var(--card-foreground)" bg="var(--card)" isDark={true} />
//       <StatCard icon={<FileText className="h-5 w-5" style={{
//       color: 'var(--chart-3)'
//     }} />} iconBg="var(--muted)" title="Page View" value="300" subtext="50 from Eventbrite" color="var(--chart-3)" />
//       <StatCard icon={<Users className="h-5 w-5 text-emerald-500" />} iconBg="var(--muted)" title="Active Users" value="180" subtext="50 via Social Media" color="text-emerald-500" />
//     </div>;
// }
// function StatCard({
//   icon,
//   iconBg,
//   title,
//   value,
//   valueExtra = '',
//   subtext,
//   color,
//   bg = 'var(--card)',
//   isDark = false
// }) {
//   return <div className="rounded-lg p-4 relative overflow-hidden" style={{
//     backgroundColor: bg,
//     boxShadow: 'var(--shadow-sm)'
//   }}>
//       <div className="flex justify-between items-start">
//         <div className="p-2 rounded-md" style={{
//         backgroundColor: iconBg
//       }}>
//           {icon}
//         </div>
//         <ChevronRight className="h-5 w-5" style={{
//         color: 'var(--muted-foreground)'
//       }} />
//       </div>
//       <div className="mt-3">
//         <div className="text-sm" style={{
//         color: 'var(--muted-foreground)'
//       }}>
//           {title}
//         </div>
//         <div className="flex items-baseline mt-1">
//           <span className="text-2xl font-bold" style={{
//           color: color
//         }}>
//             {value}
//           </span>
//           <span style={{
//           color: 'var(--muted-foreground)'
//         }} className="text-sm">
//             {valueExtra}
//           </span>
//         </div>
//         <div className="text-xs mt-1" style={{
//         color: 'var(--muted-foreground)'
//       }}>
//           {subtext}
//         </div>
//       </div>
//     </div>;
// }

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, PlayCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

export function StatCards() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    pendingApprovals: 0,
    ongoingEvents: 0,
    pastEvents: 0,
    loading: true,
    error: null
  });
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
    fetchEventStats();
    }
  }, [token]);

  const fetchEventStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      
      const response = await fetch('http://localhost:3000/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const events = data.events || [];

      // Calculate statistics
      const now = new Date();
      const totalEvents = events.length;
      
      // Count pending approvals (draft status)
      const pendingApprovals = events.filter(event => 
        event.status === 'draft'
      ).length;

      // Count ongoing events (events that have started but not ended)
      // Assuming events have start_time and you might have end_time or duration
      const ongoingEvents = events.filter(event => {
        const startTime = new Date(event.start_time);
        // For now, assuming events last 4 hours if no end_time is provided
        const estimatedEndTime = new Date(startTime.getTime() + (4 * 60 * 60 * 1000));
        return startTime <= now && now <= estimatedEndTime && event.status !== 'draft';
      }).length;

      // Count past events
      const pastEvents = events.filter(event => {
        const startTime = new Date(event.start_time);
        const estimatedEndTime = new Date(startTime.getTime() + (4 * 60 * 60 * 1000));
        return estimatedEndTime < now && event.status !== 'draft';
      }).length;

      setStats({
        totalEvents,
        pendingApprovals,
        ongoingEvents,
        pastEvents,
        loading: false,
        error: null
      });

    } catch (error) {
      console.error('Error fetching event stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  if (stats.loading) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-lg p-4 animate-pulse" style={{
            backgroundColor: 'var(--card)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div className="h-20"></div>
          </div>
        ))}
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-4 p-4 rounded-lg" style={{
          backgroundColor: 'var(--destructive)',
          color: 'var(--destructive-foreground)'
        }}>
          Error loading stats: {stats.error}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={<Calendar className="h-5 w-5 text-blue-600" />}
        iconBg="rgb(219 234 254)" // blue-100
        title="Total Events"
        value={stats.totalEvents.toString()}
        subtext="Across all zones"
        color="rgb(37 99 235)" // blue-600
      />
      
      <StatCard
        icon={<Clock className="h-5 w-5 text-orange-600" />}
        iconBg="rgb(254 215 170)" // orange-100
        title="Pending Approvals"
        value={stats.pendingApprovals.toString()}
        subtext="Awaiting validation"
        color="rgb(234 88 12)" // orange-600
      />
      
      <StatCard
        icon={<PlayCircle className="h-5 w-5 text-green-600" />}
        iconBg="rgb(187 247 208)" // green-100
        title="Ongoing Events"
        value={stats.ongoingEvents.toString()}
        subtext="Currently active"
        color="rgb(22 163 74)" // green-600
      />
      
      <StatCard
        icon={<CheckCircle className="h-5 w-5 text-gray-600" />}
        iconBg="rgb(243 244 246)" // gray-100
        title="Past Events"
        value={stats.pastEvents.toString()}
        subtext="Completed events"
        color="rgb(75 85 99)" // gray-600
      />
    </div>
  );
}

function StatCard({
  icon,
  iconBg,
  title,
  value,
  valueExtra = '',
  subtext,
  color,
  bg = 'var(--card)',
  isDark = false
}) {
  return (
    <div 
      className="rounded-lg p-4 relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer" 
      style={{
        backgroundColor: bg,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div className="flex justify-between items-start">
        <div 
          className="p-2 rounded-md" 
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>
        <ChevronRight 
          className="h-5 w-5" 
          style={{ color: 'var(--muted-foreground)' }} 
        />
      </div>
      <div className="mt-3">
        <div 
          className="text-sm" 
          style={{ color: 'var(--muted-foreground)' }}
        >
          {title}
        </div>
        <div className="flex items-baseline mt-1">
          <span 
            className="text-2xl font-bold" 
            style={{ color: color }}
          >
            {value}
          </span>
          <span 
            style={{ color: 'var(--muted-foreground)' }} 
            className="text-sm"
          >
            {valueExtra}
          </span>
        </div>
        <div 
          className="text-xs mt-1" 
          style={{ color: 'var(--muted-foreground)' }}
        >
          {subtext}
        </div>
      </div>
    </div>
  );
}