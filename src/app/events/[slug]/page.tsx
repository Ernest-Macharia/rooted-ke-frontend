import EventDetailPage from "@/components/events/EventDetailPage";

export default function EventDetailRoute({ params }: { params: { slug: string } }) {
  return <EventDetailPage slug={params.slug} />;
}
