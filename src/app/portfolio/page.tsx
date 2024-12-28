import PortfolioGrid from "@/components/PortfolioGrid";
import { fetchPortfolio } from "@/services/hygraphApi";

export default async function Portfolio() {
  const portfolio = await fetchPortfolio();

  interface Portfolio {
    url: string;
    width: number;
    height: number;
    title?: string;
  }

  const thumbnail = portfolio.map(
    (thumb: { thumbnail: Portfolio }) => thumb.thumbnail
  );

  const shouldNotTransition = true;

  return (
    <main className="my-20">
      <PortfolioGrid portfolio={thumbnail} mobile={shouldNotTransition} />
    </main>
  );
}
