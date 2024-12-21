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
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (!mobile) {
      const interval = setInterval(() => {
        // Trigger fade-out
        setIsFading(true);

        setTimeout(() => {
          setPortfolioImages((portfolioImages) => shuffle(portfolioImages));

          // Trigger fade-in
          setTimeout(() => setIsFading(false), 500); // Match CSS fade duration
        }, 500);
      }, 4000);

      return () => clearInterval(interval);
    }

    // if (!mobile) {
    //   setTimeout(() => setPortfolioImages(shuffle(portfolioImages)), 7000);
    // }
  }, [portfolioImages]);

  return (
    <div className="container mx-auto px-4">
      <div
        className={`columns-1 sm:columns-3 lg:columns-4 gap-4 space-y-4 grid-container `}
      >
        {portfolioImages.slice(0, 8).map((item, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out break-inside-avoid"
          >
            <LazyImage
              src={item.url}
              alt=""
              width={item.width}
              height={item.height}
              className={`${!mobile && "fade-image"} ${
                isFading ? "fade-out" : "fade-in"
              }`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ease-in-out" />
          </div>
        ))}
      </div>
    </div>
  );
}
