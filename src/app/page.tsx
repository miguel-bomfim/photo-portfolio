import HomeBanner from "@/components/HomeBanner";
import PortfolioGrid from "@/components/PortfolioGrid";
import Link from "next/link";
import { headers } from "next/headers";
import { FiArrowRight } from "react-icons/fi";
import { fetchHome } from "@/services/hygraphApi";
import { isMobile } from "@/utils/isMobile";
import { PortfolioThumbnailType } from "@/types";

export default async function Home() {
  const home = await fetchHome();
  const userAgent = (await headers()).get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  const thumbs = home.homePage.portfolioThumbnail.map(
    (item: PortfolioThumbnailType) => {
      return { portfolioThumbnail: item };
    }
  );

  return (
    <main>
      <HomeBanner homeBackground={home.homePage.homeBackground.url} />
      <h2 className="p-4 my-6 text-center font-mono text-xl">
        {home.homePage.bannerText}
      </h2>
      <PortfolioGrid mobile={mobileCheck} portfolio={thumbs} />
      <div className="text-center my-8">
        <Link
          href="/portfolio"
          className="font-sans inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-colors duration-300 group"
        >
          Veja mais
          <FiArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
