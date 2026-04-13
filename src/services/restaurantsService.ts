import api, { getRestaurant, getRestaurants } from "@/lib/api";
import { extractItem, extractList } from "@/services/http";

export type RestaurantItem = {
  id?: number;
  slug: string;
  name: string;
  short?: string;
  description?: string;
  area?: string;
  cuisine?: Array<{ name: string }>;
  budget?: string;
  budget_tier?: string;
  priceRange?: string;
  img?: string;
  openingHours?: string;
  bestFor?: string[];
  mustOrder?: string[];
  bookingRequired?: boolean;
  phone?: string;
  location?: string;
  tags?: string[];
  gallery?: string[];
};

export type RestaurantFilters = {
  locations: string[];
  budgets: string[];
  cuisines: string[];
};

export async function fetchRestaurants(params: Record<string, unknown> = {}): Promise<RestaurantItem[]> {
  const response = await getRestaurants(params as never);
  return extractList<RestaurantItem>(response.data);
}

export async function fetchRestaurant(slug: string): Promise<RestaurantItem | null> {
  const response = await getRestaurant(slug);
  return extractItem<RestaurantItem>(response.data);
}

export async function fetchRestaurantFilters(): Promise<RestaurantFilters> {
  const response = await api.get("/api/restaurants/filters/");
  const payload = (response.data || {}) as Partial<RestaurantFilters>;
  return {
    locations: payload.locations || [],
    budgets: payload.budgets || [],
    cuisines: payload.cuisines || [],
  };
}
