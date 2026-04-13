import { getDestination, getDestinations } from "@/lib/api";
import { extractItem, extractList } from "@/services/http";

export type DestinationItem = {
  id?: number;
  name: string;
  slug: string;
  short?: string;
  description?: string;
  overview?: string;
  location?: string;
  img?: string;
  heroImg?: string;
  display_tags?: string[];
  highlights?: string[];
  packageLink?: string;
  restaurants?: Array<{ name: string; area?: string; cuisine?: string; budget?: string; img?: string }>;
  things?: string[];
  hotelSearch?: string;
};

export async function fetchDestinations(params: Record<string, unknown> = {}): Promise<DestinationItem[]> {
  const response = await getDestinations(params as never);
  return extractList<DestinationItem>(response.data);
}

export async function fetchDestination(slug: string): Promise<DestinationItem | null> {
  const response = await getDestination(slug);
  return extractItem<DestinationItem>(response.data);
}
