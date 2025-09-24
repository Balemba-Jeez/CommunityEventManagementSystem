import React from 'react';
import { Search, ChevronRight, Filter, MoreHorizontal } from 'lucide-react';
export function SalesTable() {
  return <div className="rounded-lg p-4" style={{
    backgroundColor: 'var(--card)',
    boxShadow: 'var(--shadow-sm)'
  }}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-medium" style={{
          color: 'var(--card-foreground)'
        }}>
            Sales by Ticket Type
          </h3>
          <div className="text-xs" style={{
          color: 'var(--muted-foreground)'
        }}>
            Ticket Sales Breakdown
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input type="text" placeholder="Search..." className="pl-8 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent" style={{
            backgroundColor: 'var(--muted)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)',
            '--tw-ring-color': 'var(--ring)'
          }} />
            <Search className="absolute left-2 top-2.5 h-4 w-4" style={{
            color: 'var(--muted-foreground)'
          }} />
          </div>
          <button className="p-2 rounded-md" style={{
          backgroundColor: 'var(--muted)',
          border: '1px solid var(--border)'
        }}>
            <Filter className="h-4 w-4" style={{
            color: 'var(--muted-foreground)'
          }} />
          </button>
          <button className="p-2 rounded-md" style={{
          backgroundColor: 'var(--muted)',
          border: '1px solid var(--border)'
        }}>
            <ChevronRight className="h-4 w-4" style={{
            color: 'var(--muted-foreground)'
          }} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-4" style={{
        color: 'var(--card-foreground)'
      }}>
          <thead>
            <tr className="text-left text-sm" style={{
            color: 'var(--muted-foreground)',
            borderBottom: '1px solid var(--border)'
          }}>
              <th className="pb-2 font-medium">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Ticket Type
                </div>
              </th>
              <th className="pb-2 font-medium">Price</th>
              <th className="pb-2 font-medium">Sold</th>
              <th className="pb-2 font-medium">End Sales</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr style={{
            borderBottom: '1px solid var(--border)'
          }}>
              <td className="py-4">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>General Admission</span>
                </div>
              </td>
              <td className="py-4">$20</td>
              <td className="py-4">0/200</td>
              <td className="py-4">3/21/24</td>
              <td className="py-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{
                backgroundColor: 'rgba(234, 179, 8, 0.1)',
                color: 'rgb(202, 138, 4)'
              }}>
                  Selling Fast
                </span>
              </td>
              <td className="py-4 text-right">
                <button>
                  <MoreHorizontal className="h-5 w-5" style={{
                  color: 'var(--muted-foreground)'
                }} />
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-4">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>General Admission</span>
                </div>
              </td>
              <td className="py-4">$20</td>
              <td className="py-4">0/200</td>
              <td className="py-4">3/21/24</td>
              <td className="py-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                color: 'rgb(21, 128, 61)'
              }}>
                  On Sale
                </span>
              </td>
              <td className="py-4 text-right">
                <button>
                  <MoreHorizontal className="h-5 w-5" style={{
                  color: 'var(--muted-foreground)'
                }} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>;
}