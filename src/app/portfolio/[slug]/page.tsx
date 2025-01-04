import { fetchSinglePortfolio } from "@/services/hygraphApi";
import { PortfolioThumbnailType } from "@/types";
import PortfolioImages from "@/components/PortolioImages";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const portfolio: PortfolioThumbnailType[] = await fetchSinglePortfolio(slug);

  return (
    <main>
      <PortfolioImages images={portfolio} />
    </main>
  );
}
