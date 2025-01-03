import { fetchSinglePortfolio } from "@/services/hygraphApi";
import { PortfolioThumbnailType } from "@/types";
import LazyImage from "@/components/LazyImage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const portfolio = await fetchSinglePortfolio(slug);

  return (
    <main className="mt-12">
      {portfolio.map((item: PortfolioThumbnailType) => (
        <LazyImage
          width={item.width}
          height={item.height}
          alt=""
          src={item.url}
        />
      ))}
    </main>
  );
}
