"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPageLoad, setIsPageLoad] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({
    href,
    label,
    mobile = false,
  }: {
    href: string;
    label: string;
    mobile?: boolean;
  }) => (
    <Link
      href={href}
      className={`hover:text-gray-600 transition-colors ${
        shouldBeTransparent && !mobile ? "text-white" : "text-black"
      }
        ${mobile && "text-lg"}`}
      data-active={pathname === href}
      onClick={mobile ? () => setIsMenuOpen(false) : undefined}
    >
      {label}
    </Link>
  );

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
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>
        <button
          className={`md:hidden ${
            shouldBeTransparent ? "text-white" : "text-black"
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>
      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/"
              className="text-xl font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              SH
            </Link>
            <button onClick={toggleMenu} aria-label="Close menu">
              <FiX size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} mobile />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
