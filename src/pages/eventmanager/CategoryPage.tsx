import React, { useState } from 'react';
import { SearchBar } from '../../components/eventmanager/events/SearchBar';
import { EventCard } from '../../components/eventmanager/events/EventCard';
import { Navbar } from '../../components/eventmanager/events/Navbar';
// import { eventData } from '../data/eventData';
import { CalendarIcon, LayoutGridIcon, ListIcon } from 'lucide-react';
import { ResponsiveHeaderIcons } from '@/components/eventmanager/dashboard/responsive-header-icons';
import { EventLayout } from '@/components/eventmanager/events/event-layout';
import { CategoriesGrid } from '@/components/eventmanager/dashboard/categories-grid';
import { EmptyCategories } from '@/components/eventmanager/dashboard/empty-categories';
const categories = [
  {
    id: "1",
    name: "Communications",
    documentCount: 0,
    eventsCount: 0,
    description: "Internal and external communication documents",
    zone: "HR",
    createdAt: "Jan 15, 2024",
    hasParent: false,
  },
  {
    id: "2",
    name: "General",
    documentCount: 1,
    eventsCount: 3,
    description: "General company documents and policies",
    zone: "Admin",
    createdAt: "Jan 10, 2024",
    hasParent: false,
  },
  {
    id: "3",
    name: "Notes",
    documentCount: 0,
    eventsCount: 0,
    description: "Meeting notes and internal memos",
    zone: "HR",
    createdAt: "Feb 1, 2024",
    hasParent: false,
  },
  {
    id: "4",
    name: "Options",
    documentCount: 2,
    eventsCount: 5,
    description: "Stock options and equity documentation",
    parentCategory: "Share Plans",
    zone: "Finance",
    createdAt: "Dec 20, 2023",
    hasParent: true,
  },
  {
    id: "5",
    name: "Raise",
    documentCount: 0,
    eventsCount: 0,
    description: "Salary raise and compensation review documents",
    zone: "HR",
    createdAt: "Mar 5, 2024",
    hasParent: false,
  },
  {
    id: "6",
    name: "RSUs",
    documentCount: 0,
    eventsCount: 0,
    description: "Restricted Stock Units documentation",
    parentCategory: "Share Plans",
    zone: "Finance",
    createdAt: "Dec 20, 2023",
    hasParent: true,
  },
  {
    id: "7",
    name: "Share Certificates",
    documentCount: 0,
    eventsCount: 0,
    description: "Physical and digital share certificates",
    zone: "Finance",
    createdAt: "Jan 5, 2024",
    hasParent: false,
  },
  {
    id: "8",
    name: "Share Plans",
    documentCount: 1,
    eventsCount: 8,
    description: "Employee stock purchase and equity plans",
    zone: "Finance",
    createdAt: "Dec 15, 2023",
    hasParent: false,
  },
  {
    id: "9",
    name: "Transactions",
    documentCount: 0,
    eventsCount: 0,
    description: "Financial transactions and payment records",
    zone: "Finance",
    createdAt: "Feb 10, 2024",
    hasParent: false,
  },
  {
    id: "10",
    name: "Transfers",
    documentCount: 0,
    eventsCount: 0,
    description: "Asset and equity transfer documentation",
    zone: "Finance",
    createdAt: "Feb 15, 2024",
    hasParent: false,
  },
]

export const CategoryPage = () => {
  const hasCategories = categories.length > 0
  const [layout, setLayout] = useState<"grid" | "list">("grid")
  return <div className="w-full">
      {/* Header */}
      <ResponsiveHeaderIcons page="categories" layout={layout} onLayoutChange={setLayout} />
      {/* Event Layout */}
      <div className="py-8">
        {hasCategories ? <CategoriesGrid categories={categories} /> : <EmptyCategories />}
      </div>
    </div>;
};