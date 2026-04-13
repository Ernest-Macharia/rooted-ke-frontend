import PackageDetailPage from "@/components/packages/PackageDetailPage";

export default function PackageDetailRoute({ params }: { params: { slug: string } }) {
  return <PackageDetailPage slug={params.slug} />;
}
