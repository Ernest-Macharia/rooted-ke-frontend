import DestinationDetailPage from "@/components/destinations/DestinationDetailPage";

export default function DestinationDetailRoute({
  params,
}: {
  params: { slug: string };
}) {
  return <DestinationDetailPage slug={params.slug} />;
}
