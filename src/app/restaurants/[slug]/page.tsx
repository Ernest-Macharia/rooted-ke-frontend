import RestaurantDetailPage from "@/components/restaurants/RestaurantDetailPage";

export default function RestaurantDetailRoute({ params }: { params: { slug: string } }) {
  return <RestaurantDetailPage slug={params.slug} />;
}
