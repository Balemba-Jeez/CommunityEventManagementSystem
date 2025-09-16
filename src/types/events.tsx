// types/events.ts

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  description: string;
  attendees?: number;
}

export type PageType = "all" | "zone" | "global" | "saved" | "category";

export interface EventsGridProps {
  pageType?: PageType;
  userId?: string | null;
  zoneId?: string | null;
  category?: string;
  showStacks?: boolean;
  stackCategories?: string[];
  className?: string;
  events?: Event[] | null;
  loading?: boolean;
  error?: string | null;
}

export interface EventStackProps {
  category?: string;
  className?: string;
  pageType?: PageType;
  zoneId?: string | null;
  apiEndpoint?: string;
}

export interface GridItem {
  type: 'event' | 'stack';
  key: string;
  event?: Event;
  category?: string;
}

export interface StackConfig {
  show: boolean;
  categories: string[];
  maxStacks: number;
  apiEndpoint?: string;
}