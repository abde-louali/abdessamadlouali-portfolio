"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaArrowLeft } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

export default function LaundryProjectPage() {
  const t = useTranslations("laundry");
  const locale = useLocale();

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white">
      {/* Top navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#0e0e0e]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <Link href={`/${locale}/#work`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <FaArrowLeft className="text-xs" /> {t("backToPortfolio")}
        </Link>
        <a href="https://github.com/abde-louali/laundry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/10 transition-all">
          <FaGithub /> {t("viewOnGitHub")}
        </a>
      </div>

      {/* Hero section */}
      <div className="pt-32 pb-16 px-6 max-w-[900px] mx-auto">
        <span className="inline-block bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
          {t("tag")}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mt-6 mb-4 leading-tight">
          {t("title")}
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-8">
          {t("description")}
        </p>
        <div className="flex flex-wrap gap-2">
          {["Spring Boot", "React", "MySQL", "JWT", "Tailwind CSS"].map((tech) => (
            <span key={tech} className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-full text-xs text-gray-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Screenshots grid */}
      <div className="py-16 px-6 max-w-[1200px] mx-auto">
        <h2 className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-8">
          {t("screenshotsLabel")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
          {[
            { file: "admin_page.webp", alt: t("adminAlt"), role: t("adminView") },
            { file: "employee_page.webp", alt: t("employeeAlt"), role: t("employeeView") },
            { file: "livreur_page.webp", alt: t("livreurAlt"), role: t("livreurView") }
          ].map((img, idx) => (
            <div key={idx} className={`flex flex-col gap-3 ${idx === 0 ? "md:col-span-2" : ""}`}>
              <div className="text-[10px] tracking-[0.2em] text-cyan-400 font-semibold uppercase">
                {img.role}
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
                <Image
                  src={`/work/laundry/${img.file}`}
                  alt={img.alt}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works section */}
      <div className="py-16 px-6 max-w-[900px] mx-auto border-t border-white/[0.06]">
        <h2 className="text-3xl font-bold mb-12">{t("howItWorksTitle")}</h2>
        <div>
          {[
            { num: 1, role: t("step1role"), desc: t("step1desc") },
            { num: 2, role: t("step2role"), desc: t("step2desc") },
            { num: 3, role: t("step3role"), desc: t("step3desc") },
            { num: 4, role: t("step4role"), desc: t("step4desc") },
          ].map(({ num, role, desc }) => (
            <div key={num} className="flex gap-6 mb-10">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-bold flex items-center justify-center text-sm">
                {num}
              </div>
              <div>
                <div className="text-[10px] tracking-[0.2em] text-cyan-400 uppercase mb-1">{role}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack section */}
      <div className="py-16 px-6 max-w-[900px] mx-auto border-t border-white/[0.06]">
        <h2 className="text-3xl font-bold mb-12">{t("techStackTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-4">{t("frontendLabel")}</div>
            <div className="flex flex-col">
              {["React (Vite)", "Redux Toolkit", "Tailwind CSS", "React Leaflet", "Recharts", "Axios"].map((item) => (
                <div key={item} className="flex items-center gap-3 py-3 border-b border-white/[0.05] text-gray-300 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-4">{t("backendLabel")}</div>
            <div className="flex flex-col">
              {["Java 23 & Spring Boot", "MySQL + Flyway", "Spring Security + JWT", "Bucket4j", "MapStruct & Lombok", "OpenAPI / Swagger"].map((item) => (
                <div key={item} className="flex items-center gap-3 py-3 border-b border-white/[0.05] text-gray-300 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-16 px-6 max-w-[900px] mx-auto text-center border-t border-white/[0.06]">
        <h3 className="text-2xl font-bold mb-4">{t("ctaTitle")}</h3>
        <p className="text-gray-400 mb-8 text-sm">{t("ctaSubtitle")}</p>
        <div className="flex items-center justify-center gap-4">
          <a href="https://github.com/abde-louali/laundry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full text-sm hover:bg-gray-100 transition-all">
            <FaGithub /> {t("viewOnGitHub")}
          </a>
          <Link href={`/${locale}/#contact`} className="px-6 py-3 border border-white/20 rounded-full text-sm text-gray-300 hover:bg-white/5 transition-all">
            {t("contactMe")}
          </Link>
        </div>
      </div>
    </div>
  );
}
