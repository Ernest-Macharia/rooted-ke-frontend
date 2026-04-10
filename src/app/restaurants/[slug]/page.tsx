import { notFound } from "next/navigation";
import RestaurantDetailPage from "@/components/restaurants/RestaurantDetailPage";
import { RESTAURANT_DATA } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(RESTAURANT_DATA).map((slug) => ({ slug }));
}

export default function RestaurantDetailRoute({ params }: { params: { slug: string } }) {
  if (!RESTAURANT_DATA[params.slug as keyof typeof RESTAURANT_DATA]) {
    notFound();
  }

  return <RestaurantDetailPage slug={params.slug} />;
}
