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

const portfolioItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1731323036230-fb37b4d9ed71?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portfolio item 1",
    width: 1200,
    height: 800,
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1731329153355-1015daf2cb92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portfolio item 2",
    width: 800,
    height: 1200,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1734000402740-dc480cbbaeb6?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portfolio item 3",
    width: 1600,
    height: 900,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1732525830182-b0e1a93f3679?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portfolio item 4",
    width: 900,
    height: 900,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1732254721629-bf8275f694e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portfolio item 5",
    width: 1200,
    height: 1600,
  },
  {
    id: 6,
    src: "https://plus.unsplash.com/premium_photo-1733922312592-5424a3ffdff6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portfolio item 6",
    width: 1600,
    height: 1200,
  },
];

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
