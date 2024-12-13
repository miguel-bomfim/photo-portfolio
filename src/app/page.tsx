import HomeBanner from "@/components/HomeBanner";
import HomeGridPortfolio from "@/components/HomeGridPortfolio";
import { fetchHome } from "../services/hygraphApi";

export default async function Home() {
  const home = await fetchHome();
  console.log("home", home);
  return (
    <main>
      <HomeBanner homeBackground={home.homePage.homeBackground.url} />
      <HomeGridPortfolio />
    </main>
  );
}