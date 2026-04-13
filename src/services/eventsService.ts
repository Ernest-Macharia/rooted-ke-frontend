import api, { getEvent, getEvents } from "@/lib/api";
import { extractItem, extractList } from "@/services/http";

export type EventItem = {
  id?: number;
  slug: string;
  title: string;
  short?: string;
  description?: string;
  category?: string;
  venue?: string;
  area?: string;
  date?: string;
  time?: string;
  priceDisplay?: string;
  img?: string;
  lineup?: string[];
  ticketLink?: string;
  whatToPair?: string;
  tips?: string[];
  tags?: string[];
  gallery?: string[];
};

export type EventCategoryItem = {
  key: string;
  label: string;
  icon: string;
  desc: string;
};

export async function fetchEvents(params: Record<string, unknown> = {}): Promise<EventItem[]> {
  const response = await getEvents(params as never);
  return extractList<EventItem>(response.data);
}

export async function fetchEvent(slug: string): Promise<EventItem | null> {
  const response = await getEvent(slug);
  return extractItem<EventItem>(response.data);
}

export async function fetchEventCategories(): Promise<EventCategoryItem[]> {
  const response = await api.get("/api/events/categories/");
  return extractList<EventCategoryItem>(response.data);
}
