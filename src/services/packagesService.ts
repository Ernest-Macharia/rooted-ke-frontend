import { getPackage, getPackages } from "@/lib/api";
import { extractItem, extractList } from "@/services/http";

export type PackageItem = {
  id?: number;
  slug: string;
  key?: string;
  name?: string;
  title: string;
  sub?: string;
  tagline?: string;
  overview?: string;
  img?: string;
  heroImg?: string;
  icon?: string;
  inclusions?: string[];
  exclusions?: string[];
  tiers?: Array<{ name: string; price: string; note?: string }>;
  destinations?: string[];
  duration?: string;
  bestFor?: string[];
};

export async function fetchPackages(params: Record<string, unknown> = {}): Promise<PackageItem[]> {
  const response = await getPackages(params as never);
  return extractList<PackageItem>(response.data);
}

export async function fetchPackage(slug: string): Promise<PackageItem | null> {
  const response = await getPackage(slug);
  return extractItem<PackageItem>(response.data);
}
