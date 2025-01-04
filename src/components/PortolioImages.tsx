"use client";

import { useState } from "react";
import Image from "next/image";
import FullscreenCarousel from "./FullscreenCarousel";
import { PortfolioThumbnailType } from "@/types";

export default function ImageList({
  images,
}: {
  images: PortfolioThumbnailType[];
}) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="md:grid md:grid-cols-3 flex flex-col gap-2 md:p-2 mt-16">
      {images.map((image, idx) => (
        <Image
          onClick={() => setSelectedImage(idx)}
          key={idx}
          src={image.url}
          alt=""
          fill
          className="flex-1 !relative cursor-pointer object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      ))}
      {selectedImage !== null && (
        <FullscreenCarousel
          images={images}
          initialIndex={images.findIndex((img, idx) => idx === selectedImage)}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
