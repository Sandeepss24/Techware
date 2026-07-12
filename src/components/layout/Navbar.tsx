"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Solution", href: "#solution" },
  { name: "Process", href: "#process" },
  { name: "Industries", href: "#who-its-for" },
  { name: "Platform", href: "#platform" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll-spy logic using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when the section reaches the upper portion of the screen
        threshold: 0,
      }
    );

    const sections = navLinks.map(link => link.href.substring(1));
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-4 py-2 flex justify-between items-center transition-all duration-300">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center md:ml-4">
          <Link href="#home" className="flex items-center justify-center w-10 h-10">
            <Image src="/assets/icons/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm transition-colors ${activeSection === link.href.substring(1)
                ? "text-amber font-bold"
                : "text-navy/50 font-medium hover:text-navy"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center md:mr-2">
          <Link
            href="#signin"
            className="px-6 py-2.5 text-white text-sm font-medium rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md cursor-pointer"
            style={{ background: 'linear-gradient(292.68deg, #0A192F 51.59%, #002966 83.21%)' }}
          >
            Sign In
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden mr-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-navy hover:text-[#0a192f] focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white rounded-3xl shadow-2xl z-40 overflow-hidden md:hidden border border-navy/5 p-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${activeSection === link.href.substring(1)
                    ? "text-amber bg-amber/5 font-bold"
                    : "text-navy/60 hover:text-navy hover:bg-navy/5"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-4 py-3 text-white text-center font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                style={{ background: 'linear-gradient(292.68deg, #0A192F 51.59%, #002966 83.21%)' }}
              >
                Sign In
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
