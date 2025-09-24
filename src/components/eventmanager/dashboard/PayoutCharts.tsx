// import React from 'react';
// import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { ChevronRight } from 'lucide-react';
// const areaChartData = [{
//   name: 'Q1',
//   value1: 10,
//   value2: 20
// }, {
//   name: 'Q2',
//   value1: 15,
//   value2: 25
// }, {
//   name: 'Q3',
//   value1: 25,
//   value2: 18
// }, {
//   name: 'Q4',
//   value1: 22,
//   value2: 30
// }, {
//   name: 'Q5',
//   value1: 30,
//   value2: 40
// }, {
//   name: 'Q6',
//   value1: 40,
//   value2: 45
// }, {
//   name: 'Q7',
//   value1: 35,
//   value2: 50
// }];
// const barChartData = [{
//   name: '1',
//   paid: 25,
//   remaining: 10
// }, {
//   name: '2',
//   paid: 35,
//   remaining: 15
// }, {
//   name: '3',
//   paid: 30,
//   remaining: 10
// }, {
//   name: '4',
//   paid: 38,
//   remaining: 12
// }, {
//   name: '5',
//   paid: 45,
//   remaining: 15
// }, {
//   name: '6',
//   paid: 40,
//   remaining: 10
// }, {
//   name: '7',
//   paid: 35,
//   remaining: 8
// }, {
//   name: '8',
//   paid: 40,
//   remaining: 10
// }, {
//   name: '9',
//   paid: 35,
//   remaining: 12
// }, {
//   name: '10',
//   paid: 38,
//   remaining: 15
// }];
// export function PayoutCharts() {
//   return <div className="grid grid-cols-5 gap-4 mb-6">
//       <div className="col-span-3 rounded-lg p-4" style={{
//       backgroundColor: 'var(--card)',
//       boxShadow: 'var(--shadow-sm)'
//     }}>
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="font-medium" style={{
//           color: 'var(--card-foreground)'
//         }}>
//             Available for payout
//           </h3>
//           <button className="px-3 py-1 rounded-md text-sm" style={{
//           backgroundColor: 'var(--muted)',
//           color: 'var(--primary)'
//         }}>
//             Get paid instantly
//           </button>
//         </div>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={areaChartData} margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0
//           }}>
//               <defs>
//                 <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
//                 </linearGradient>
//                 <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
//               <XAxis dataKey="name" stroke="var(--muted-foreground)" />
//               <YAxis orientation="left" axisLine={false} tickLine={false} stroke="var(--muted-foreground)" />
//               <Tooltip contentStyle={{
//               backgroundColor: 'var(--card)',
//               borderColor: 'var(--border)',
//               color: 'var(--card-foreground)'
//             }} />
//               <Area type="monotone" dataKey="value1" stroke="var(--chart-1)" fillOpacity={1} fill="url(#colorValue1)" />
//               <Area type="monotone" dataKey="value2" stroke="var(--chart-2)" fillOpacity={1} fill="url(#colorValue2)" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <div className="col-span-2 rounded-lg p-4" style={{
//       backgroundColor: 'var(--card)',
//       boxShadow: 'var(--shadow-sm)'
//     }}>
//         <div className="flex justify-between items-center mb-2">
//           <h3 className="font-medium" style={{
//           color: 'var(--card-foreground)'
//         }}>
//           Contributions
//           </h3>
//           <ChevronRight className="h-5 w-5" style={{
//           color: 'var(--muted-foreground)'
//         }} />
//         </div>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={barChartData} margin={{
//             top: 20,
//             right: 10,
//             left: -20,
//             bottom: 5
//           }}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
//               <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="var(--muted-foreground)" />
//               <YAxis axisLine={false} tickLine={false} stroke="var(--muted-foreground)" />
//               <Tooltip contentStyle={{
//               backgroundColor: 'var(--card)',
//               borderColor: 'var(--border)',
//               color: 'var(--card-foreground)'
//             }} />
//               <Bar dataKey="paid" stackId="a" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
//               <Bar dataKey="remaining" stackId="a" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="grid grid-cols-3 gap-4 mt-2">
//           <div>
//             <div className="flex items-center">
//               <div className="h-3 w-3 rounded-full mr-2" style={{
//               backgroundColor: 'var(--chart-1)'
//             }}></div>
//               <span className="text-xs" style={{
//               color: 'var(--muted-foreground)'
//             }}>
//                 Paid
//               </span>
//             </div>
//             <div className="font-medium" style={{
//             color: 'var(--card-foreground)'
//           }}>
//               XAF55.00
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center">
//               <div className="h-3 w-3 rounded-full mr-2" style={{
//               backgroundColor: 'var(--chart-3)'
//             }}></div>
//               <span className="text-xs" style={{
//               color: 'var(--muted-foreground)'
//             }}>
//                 Remaining
//               </span>
//             </div>
//             <div className="font-medium" style={{
//             color: 'var(--card-foreground)'
//           }}>
//               XAF920.50
//             </div>
//           </div>
//           <div>
//             <div className="flex items-center">
//               <div className="h-3 w-3 rounded-full mr-2" style={{
//               backgroundColor: 'var(--muted)'
//             }}></div>
//               <span className="text-xs" style={{
//               color: 'var(--muted-foreground)'
//             }}>
//                 Adjustments
//               </span>
//             </div>
//             <div className="font-medium" style={{
//             color: 'var(--card-foreground)'
//           }}>
//               XAF0.00
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>;
// }

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Keep the existing bar chart data for the contributions chart
const barChartData = [{
  name: '1',
  paid: 25,
  remaining: 10
}, {
  name: '2',
  paid: 35,
  remaining: 15
}, {
  name: '3',
  paid: 30,
  remaining: 10
}, {
  name: '4',
  paid: 38,
  remaining: 12
}, {
  name: '5',
  paid: 45,
  remaining: 15
}, {
  name: '6',
  paid: 40,
  remaining: 10
}, {
  name: '7',
  paid: 35,
  remaining: 8
}, {
  name: '8',
  paid: 40,
  remaining: 10
}, {
  name: '9',
  paid: 35,
  remaining: 12
}, {
  name: '10',
  paid: 38,
  remaining: 15
}];

export function PayoutCharts() {
  const [eventTrendsData, setEventTrendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth()

useEffect(() => {
  if (token) { // ✅ wait for token
    fetchEventTrends();
  }
}, [token]);

  const fetchEventTrends = async () => {
    try {
      setLoading(true);
      setError(null);
      
      
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

      // Process events into weekly trends
      const trendsData = processEventsIntoTrends(events);
      setEventTrendsData(trendsData);

    } catch (error) {
      console.error('Error fetching event trends:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const processEventsIntoTrends = (events) => {
    const now = new Date();
    const weeks = [];
    
    // Generate last 8 weeks
    for (let i = 7; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7));
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      
      weeks.push({
        start: weekStart,
        end: weekEnd,
        name: `Week ${8 - i}`
      });
    }

    return weeks.map(week => {
      const weekEvents = events.filter(event => {
        const eventDate = new Date(event.start_time);
        return eventDate >= week.start && eventDate <= week.end;
      });

      // Categorize events by status
      const upcoming = weekEvents.filter(event => {
        const eventDate = new Date(event.start_time);
        return eventDate > now && event.status !== 'draft';
      }).length;

      const ongoing = weekEvents.filter(event => {
        const eventDate = new Date(event.start_time);
        const estimatedEnd = new Date(eventDate.getTime() + (4 * 60 * 60 * 1000)); // 4 hours duration
        return eventDate <= now && now <= estimatedEnd && event.status !== 'draft';
      }).length;

      const past = weekEvents.filter(event => {
        const eventDate = new Date(event.start_time);
        const estimatedEnd = new Date(eventDate.getTime() + (4 * 60 * 60 * 1000));
        return estimatedEnd < now && event.status !== 'draft';
      }).length;

      const pending = weekEvents.filter(event => 
        event.status === 'draft'
      ).length;

      return {
        name: week.name,
        upcoming,
        ongoing,
        past,
        pending,
        total: upcoming + ongoing + past + pending
      };
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + entry.value, 0);
      
      return (
        <div 
          className="p-3 rounded-lg shadow-lg border"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)'
          }}
        >
          <p className="font-medium mb-2">{`${label} - Total: ${total} events`}</p>
          {payload.map((entry) => (
            <p key={entry.dataKey} style={{ color: entry.color }}>
              {`${entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <div className="col-span-3 rounded-lg p-4" style={{
        backgroundColor: 'var(--card)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium" style={{
            color: 'var(--card-foreground)'
          }}>
            Event Trends Over Time
          </h3>
          <button className="px-3 py-1 rounded-md text-sm" style={{
            backgroundColor: 'var(--muted)',
            color: 'var(--primary)'
          }}>
            View Details
          </button>
        </div>
        
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="h-4 w-32 bg-gray-200 rounded mb-2 mx-auto"></div>
              <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Loading event trends...
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-red-500 mb-2">Error loading data</div>
              <button 
                onClick={fetchEventTrends}
                className="px-3 py-1 rounded text-xs"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={eventTrendsData} 
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <defs>
                  <linearGradient id="colorUpcoming" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorOngoing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorPast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B7280" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6B7280" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FBBF24" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis 
                  orientation="left" 
                  axisLine={false} 
                  tickLine={false} 
                  stroke="var(--muted-foreground)"
                  label={{ value: 'Number of Events', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                
                <Area 
                  type="monotone" 
                  dataKey="pending" 
                  stackId="1"
                  stroke="#FBBF24" 
                  fillOpacity={1} 
                  fill="url(#colorPending)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="upcoming" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorUpcoming)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="ongoing" 
                  stackId="1"
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#colorOngoing)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="past" 
                  stackId="1"
                  stroke="#6B7280" 
                  fillOpacity={1} 
                  fill="url(#colorPast)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {/* Legend */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#FBBF24' }}></div>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Pending</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#3B82F6' }}></div>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Upcoming</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#10B981' }}></div>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Ongoing</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: '#6B7280' }}></div>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Past</span>
          </div>
        </div>
      </div>
      
      {/* Keep the existing contributions chart */}
      <div className="col-span-2 rounded-lg p-4" style={{
        backgroundColor: 'var(--card)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium" style={{
            color: 'var(--card-foreground)'
          }}>
            Contributions
          </h3>
          <ChevronRight className="h-5 w-5" style={{
            color: 'var(--muted-foreground)'
          }} />
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{
              top: 20,
              right: 10,
              left: -20,
              bottom: 5
            }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="var(--muted-foreground)" />
              <YAxis axisLine={false} tickLine={false} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--card-foreground)'
              }} />
              <Bar dataKey="paid" stackId="a" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="remaining" stackId="a" fill="var(--chart-3)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full mr-2" style={{
                backgroundColor: 'var(--chart-1)'
              }}></div>
              <span className="text-xs" style={{
                color: 'var(--muted-foreground)'
              }}>
                Paid
              </span>
            </div>
            <div className="font-medium" style={{
              color: 'var(--card-foreground)'
            }}>
              XAF55.00
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full mr-2" style={{
                backgroundColor: 'var(--chart-3)'
              }}></div>
              <span className="text-xs" style={{
                color: 'var(--muted-foreground)'
              }}>
                Remaining
              </span>
            </div>
            <div className="font-medium" style={{
              color: 'var(--card-foreground)'
            }}>
              XAF920.50
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full mr-2" style={{
                backgroundColor: 'var(--muted)'
              }}></div>
              <span className="text-xs" style={{
                color: 'var(--muted-foreground)'
              }}>
                Adjustments
              </span>
            </div>
            <div className="font-medium" style={{
              color: 'var(--card-foreground)'
            }}>
              XAF0.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}