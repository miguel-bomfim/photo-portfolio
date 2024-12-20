"use client";

import LazyImage from "@/components/LazyImage";
import { useState, useEffect } from "react";
import { shuffle } from "lodash";

interface Portfolio {
  url: string;
  width: number;
  height: number;
}

interface PortfolioGrid {
  portfolio: Portfolio[];
  mobile: boolean;
}

export default function PortfolioGrid({ portfolio, mobile }: PortfolioGrid) {
  const [portfolioImages, setPortfolioImages] = useState(portfolio);

  useEffect(() => {
    !mobile &&
      setTimeout(() => setPortfolioImages(shuffle(portfolioImages)), 4000);
  }, [portfolioImages]);

  return (
    <div className="container mx-auto px-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {portfolioImages.slice(0, 6).map((item, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out break-inside-avoid"
          >
            <LazyImage
              src={item.url}
              alt=""
              width={item.width}
              height={item.height}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ease-in-out" />
          </div>
        ))}
      </div>
    </div>
  );
}
