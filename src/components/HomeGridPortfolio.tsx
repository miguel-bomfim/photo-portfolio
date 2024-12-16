import LazyImage from "@/components/LazyImage";

interface PortfolioGrid {
  portfolio: [
    {
      url: string;
      width: number;
      height: number;
    }
  ];
}

export default function PortfolioGrid({ portfolio }: PortfolioGrid) {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {portfolio.map((item, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl break-inside-avoid"
          >
            <LazyImage
              src={item.url}
              alt=""
              width={item.width}
              height={item.height}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ease-in-out hover:bg-opacity-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
