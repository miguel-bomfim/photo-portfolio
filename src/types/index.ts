export type PortfolioThumbnailType = {
  width: number;
  url: string;
  height: number;
};

type PortfolioType = {
  slug: string;
  title: string;
  portfolioThumbnail: PortfolioThumbnailType;
};

export type PortfolioGridType = {
  portfolio?: PortfolioType[];
  mobile: boolean;
};

export type LazyImageType = {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
};
