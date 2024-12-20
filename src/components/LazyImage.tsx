"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";

interface LazyImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

export default function LazyImage({
  src,
  alt,
  height,
  width,
  className = "",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  if (!src) {
    return null;
  }

  return (
    <div
      ref={imgRef}
      className={`relative w-full overflow-hidden bg-gray-200 rounded-lg ${className}`}
      style={{ paddingBottom: `${(height / width) * 100}%` }}
    >
      {isInView && (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-gray-200 transition-opacity duration-500 ${
              isLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <BiLoaderAlt className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        </>
      )}
    </div>
  );
}
