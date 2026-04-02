"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegFileAlt, FaGithub } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export interface NavLink {
  id: string;
  labelKey: string;
}

const navLinks: NavLink[] = [
  { id: "services", labelKey: "services" },
  { id: "work", labelKey: "work" },
  { id: "about", labelKey: "about" },
  { id: "testimonials", labelKey: "testimonials" },
  { id: "contact", labelKey: "contact" },
];

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      const progress = scrollY / (documentHeight - windowHeight);
      setScrollProgress(progress);
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        setIsScrolled(scrollY > aboutSection.offsetTop - 100);
      } else {
        setIsScrolled(scrollY > window.innerHeight * 4.5);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "work" || entry.target.id === "services") return;
            setActiveSection(entry.target.id);
          }
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

  useEffect(() => {
    const handleWorkServicesSpy = () => {
      const servicesEl = document.getElementById("services");
      const aboutEl = document.getElementById("about");
      if (!servicesEl) return;

      const scrollY = window.scrollY;
      const servicesTop = servicesEl.offsetTop;
      const aboutTop = aboutEl ? aboutEl.offsetTop : Infinity;

      if (scrollY >= aboutTop - window.innerHeight * 0.5) return;
      if (scrollY >= servicesTop - window.innerHeight * 0.5) {
        setActiveSection("services");
      } else {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleWorkServicesSpy, { passive: true });
    handleWorkServicesSpy();
    return () => window.removeEventListener("scroll", handleWorkServicesSpy);
  }, []);

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "bg-[#0a0a0a]/75 backdrop-blur-xl"
        : "bg-transparent backdrop-blur-none"
        }`}>

        {/* Scroll Progress Line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] z-50 rounded-full"
          animate={{ width: `${Math.max(0, Math.min(100, scrollProgress * 100))}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />

        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative flex items-center justify-between h-16">

            <div className="md:hidden text-lg font-bold text-white">{t("mobileTitle")}</div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-[12px] tracking-wider transition-colors duration-300 ${isActive ? "text-white font-semibold" : "text-gray-400 hover:text-gray-200"
                      }`}
                  >
                    {t(link.labelKey)}
                  </button>
                );
              })}
            </nav>

            {/* Right Buttons */}
            <div className="hidden md:flex items-center space-x-3 ml-auto">
              <a
                href="/CV_ABDESSAMAD_LOUALI.pdf"
                download="CV_ABDESSAMAD_LOUALI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/[0.08] px-3.5 py-2 rounded-[14px] text-xs font-medium text-gray-200 transition-all duration-300 backdrop-blur-md"
              >
                <FaRegFileAlt className="text-gray-400 text-sm" />
                <span>{t("resume")}</span>
              </a>
              <a href="https://github.com/abde-louali" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-[12px] border border-white/[0.08] transition-all duration-300 backdrop-blur-md">
                <FaGithub className="text-gray-300 text-sm" />
              </a>

              {/* Locale Switcher — Desktop */}
              <div className="hidden md:flex items-center bg-white/5 border border-white/[0.08] rounded-full overflow-hidden">
                <button
                  onClick={() => switchLocale("en")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium transition-all duration-300 ${locale === "en" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <span>🇬🇧</span> {t("en")}
                </button>
                <div className="w-[1px] h-4 bg-white/10" />
                <button
                  onClick={() => switchLocale("fr")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium transition-all duration-300 ${locale === "fr" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <span>🇫🇷</span> {t("fr")}
                </button>
              </div>
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
                    className={`text-left text-lg font-medium tracking-tight transition-colors ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`}>
                    {t(link.labelKey)}
                  </button>
                );
              })}

              {/* Mobile Locale Switcher */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => switchLocale("en")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-medium transition-all duration-300 ${locale === "en" ? "bg-white/10 border-white/20 text-white" : "bg-white/[0.03] border-white/[0.08] text-gray-500"}`}
                >
                  <span>🇬🇧</span> {t("english")}
                </button>
                <button
                  onClick={() => switchLocale("fr")}
                  className={`flex items-center justify-center gap-2 py-3 rounded-2xl border text-sm font-medium transition-all duration-300 ${locale === "fr" ? "bg-white/10 border-white/20 text-white" : "bg-white/[0.03] border-white/[0.08] text-gray-500"}`}
                >
                  <span>🇫🇷</span> {t("french")}
                </button>
              </div>

              <div className="pt-6 border-t border-white/10">
                <a href="/cv.pdf" download="CV.pdf" className="flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 rounded-full text-sm font-bold w-full">
                  <FaRegFileAlt /><span>{t("downloadResume")}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
