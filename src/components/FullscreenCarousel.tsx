"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { PortfolioThumbnailType } from "@/types";

interface FullscreenCarouselProps {
  images: PortfolioThumbnailType[];
  initialIndex: number;
  onClose: () => void;
}

export default function FullscreenCarousel({
  images,
  initialIndex,
  onClose,
}: FullscreenCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const currentScale = 1;
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : images.length - 1;
      return newIndex;
    });
    setScale(1);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < images.length - 1 ? prevIndex + 1 : 0;
      return newIndex;
    });
    setScale(1);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      setScale((currentScale) => {
        const newScale = currentScale - event.deltaY * 0.01;
        return Math.min(Math.max(newScale, 0.5), 3);
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handlePrevious, handleNext, onClose]);

  const handleDragStart = useCallback(
    (clientX: number) => {
      if (currentScale === 1) {
        setIsDragging(true);
        setStartX(clientX);
      }
    },
    [currentScale]
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging || currentScale !== 1) return;

      const deltaX = clientX - startX;
      if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
          handlePrevious();
        } else {
          handleNext();
        }
        setIsDragging(false);
      }
    },
    [isDragging, startX, handlePrevious, handleNext, currentScale]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <button
        className="absolute z-10 top-4 right-4 text-white hover:text-gray-300"
        onClick={onClose}
        aria-label="Close"
      >
        <FiX size={24} />
      </button>
      <button
        className="absolute left-4 z-20 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        onClick={handlePrevious}
        aria-label="Previous image"
      >
        <FiArrowLeft size={24} />
      </button>
      <div className="relative w-full h-full max-w-4xl max-h-full overflow-hidden">
        <Image
          src={images[currentIndex].url}
          alt=""
          fill
          sizes="100vw"
          className="object-contain transition-transform duration-200 ease-in-out"
          style={{ transform: `scale(${scale})` }}
          priority
        />
      </div>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        onClick={handleNext}
        aria-label="Next image"
      >
        <FiArrowRight size={24} />
      </button>
    </div>
  );
}
