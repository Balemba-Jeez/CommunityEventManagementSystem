// / CategoryEventsPage.jsx (Bonus - for specific category pages)
// "use client"
// import { useParams } from "next/navigation"
// import { DashboardLayout } from "../pages/layouts/DashboardLayout"
// import { EventsGrid } from "@/components/events/EventsGrid"

// export default function CategoryEventsPage() {
//   const { category } = useParams()
  
//   return (
//     <DashboardLayout>
//       {(sidebarCollapsed) => (
//         <div className="p-6 space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-balance">
//                 {category} Events
//               </h1>
//               <p className="text-muted-foreground mt-2">
//                 Explore all {category.toLowerCase()} events and workshops
//               </p>
//             </div>
//           </div>
//           <EventsGrid 
//             pageType="category"
//             category={category}
//             showStacks={false} // No stacks when filtering by specific category
//           />
//         </div>
//       )}
//     </DashboardLayout>
//   )
// }