import { notFound } from "next/navigation";
import DestinationDetailPage from "@/components/destinations/DestinationDetailPage";
import { DESTINATION_DETAIL } from "@/lib/constants";

type DestinationSlug = keyof typeof DESTINATION_DETAIL;

export function generateStaticParams() {
  return Object.keys(DESTINATION_DETAIL).map((slug) => ({ slug }));
}

export default function DestinationDetailRoute({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug as DestinationSlug;

  if (!DESTINATION_DETAIL[slug]) {
    notFound();
  }

  return <DestinationDetailPage slug={slug} />;
}
