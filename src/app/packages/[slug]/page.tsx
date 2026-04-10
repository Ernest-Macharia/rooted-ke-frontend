import { notFound } from "next/navigation";
import PackageDetailPage from "@/components/packages/PackageDetailPage";
import { PACKAGE_DATA } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(PACKAGE_DATA).map((slug) => ({ slug }));
}

export default function PackageDetailRoute({ params }: { params: { slug: string } }) {
  if (!PACKAGE_DATA[params.slug as keyof typeof PACKAGE_DATA]) {
    notFound();
  }

  return <PackageDetailPage slug={params.slug} />;
}
