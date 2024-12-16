"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageLoad, setIsPageLoad] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      setIsPageLoad(false);
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  const shouldBeTransparent = (isPageLoad || !isScrolled) && pathname === "/";

  return (
    <header
      className={`fixed  top-0 left-0 right-0 z-50 transition-colors duration-300 text-black ${
        shouldBeTransparent ? "bg-transparent" : "bg-white shadow-sm"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold font-mono ${
            shouldBeTransparent ? "opacity-0" : "opacity-100"
          }`}
        >
          SH
        </Link>
        <div className="space-x-6">
          <Link
            href="/"
            className={`hover:text-gray-600 font-sans ${
              shouldBeTransparent ? "text-white" : "text-black"
            } ${pathname === "/" && "font-bold"}`}
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className={`hover:text-gray-600 font-sans ${
              shouldBeTransparent ? "text-white" : "text-black"
            } ${pathname === "/portfolio" && "font-bold"}`}
          >
            Portfolio
          </Link>
          <Link
            href="/contato"
            className={`hover:text-gray-600 font-sans ${
              shouldBeTransparent ? "text-white" : "text-black"
            } ${pathname === "/contato" && "font-bold"}`}
          >
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
}
