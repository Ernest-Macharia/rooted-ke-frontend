import { notFound } from "next/navigation";
import EventDetailPage from "@/components/events/EventDetailPage";
import { EVENT_DATA } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(EVENT_DATA).map((slug) => ({ slug }));
}

export default function EventDetailRoute({ params }: { params: { slug: string } }) {
  if (!EVENT_DATA[params.slug as keyof typeof EVENT_DATA]) {
    notFound();
  }

  return <EventDetailPage slug={params.slug} />;
}
