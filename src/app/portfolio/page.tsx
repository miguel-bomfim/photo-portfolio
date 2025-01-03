import PortfolioGrid from "@/components/PortfolioGrid";
import { fetchPortfolio } from "@/services/hygraphApi";

export default async function Portfolio() {
  const portfolio = await fetchPortfolio();

  const shouldNotTransition = true;

  return (
    <main className="my-20">
      <PortfolioGrid portfolio={portfolio} mobile={shouldNotTransition} />
    </main>
  );
}
