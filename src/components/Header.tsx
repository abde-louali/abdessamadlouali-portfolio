"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegFileAlt, FaGithub, FaLinkedinIn } from "react-icons/fa";

export interface NavLink {
  id: string;
  name: string;
}

const navLinks: NavLink[] = [
  { id: "services", name: "Services" },
  { id: "work", name: "Work" },
  { id: "about", name: "About" },
  { id: "experience", name: "Experience" },
  { id: "testimonials", name: "Testimonials" },
  { id: "contact", name: "Contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    // Check if it already loaded (e.g., hot reload)
    if (document.body.classList.contains("portfolio-loaded")) {
      setIsAppLoaded(true);
    }
    const handleLoaded = () => setIsAppLoaded(true);
    window.addEventListener("portfolio-loaded", handleLoaded);
    return () => window.removeEventListener("portfolio-loaded", handleLoaded);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      const progress = scrollY / (documentHeight - windowHeight);
      setScrollProgress(progress);
      // Keep header completely transparent while the 500vh image sequence plays.
      // Darken it only when the user scrolls down to the 'about' section.
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        setIsScrolled(scrollY > aboutSection.offsetTop - 100);
      } else {
        setIsScrolled(scrollY > window.innerHeight * 4.5);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculate on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* ✅ fixed instead of sticky — floats above hero with no background interference */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        !isAppLoaded
          ? "-translate-y-full opacity-0 pointer-events-none"
          : isScrolled
            ? "translate-y-0 opacity-100 bg-[#0a0a0a]/75 backdrop-blur-xl"
            : "translate-y-0 opacity-100 bg-transparent backdrop-blur-none"
      }`}>

        {/* Scroll Progress Line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] z-50 rounded-full"
          animate={{ width: `${Math.max(0, Math.min(100, scrollProgress * 100))}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative flex items-center justify-between h-16">

            <div className="md:hidden text-lg font-bold text-white">Portfolio</div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-[12px] tracking-wider transition-colors duration-300 ${
                      isActive ? "text-white font-semibold" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Right Buttons */}
            <div className="hidden md:flex items-center space-x-3 ml-auto">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/[0.08] px-3.5 py-2 rounded-[14px] text-xs font-medium text-gray-200 transition-all duration-300 backdrop-blur-md"
              >
                <FaRegFileAlt className="text-gray-400 text-sm" />
                <span>Resume</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-[12px] border border-white/[0.08] transition-all duration-300 backdrop-blur-md">
                <FaGithub className="text-gray-300 text-sm" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-[12px] border border-white/[0.08] transition-all duration-300 backdrop-blur-md">
                <FaLinkedinIn className="text-gray-300 text-sm" />
              </a>
            </div>

            {/* Hamburger */}
            <button className="md:hidden text-white p-2 ml-auto focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-2xl absolute top-16 inset-x-0 overflow-hidden shadow-2xl">
            <div className="flex flex-col px-8 py-6 space-y-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button key={link.id} onClick={() => handleNavClick(link.id)}
                    className={`text-left text-lg font-medium tracking-tight transition-colors ${isActive ? "text-white" : "text-gray-500 hover:text-white"
                      }`}>
                    {link.name}
                  </button>
                );
              })}
              <div className="pt-6 border-t border-white/10">
                <a href="/resume.pdf" className="flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 rounded-full text-sm font-bold w-full">
                  <FaRegFileAlt /><span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
