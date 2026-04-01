"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";
import ContactForm from "@/components/ContactForm";
import { FaLayerGroup, FaCodeBranch, FaBolt, FaPaintBrush } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <Header />

      <main className="bg-[#121212] min-h-screen text-white selection:bg-white/30 font-sans">

        {/* Hero / Frames */}
        <div>
          <ScrollyCanvas>
            {(progress) => <Overlay progress={progress} />}
          </ScrollyCanvas>
        </div>

        {/* Services */}
        <section id="services" className="bg-[#121212] py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">{t("services.title")}</h2>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">{t("services.label")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaLayerGroup style={{ color: "#4A9EFF" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("services.frontend.title")}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{t("services.frontend.description")}</p>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaCodeBranch style={{ color: "#4AFF9E" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("services.fullstack.title")}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{t("services.fullstack.description")}</p>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaBolt style={{ color: "#FFD84A" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("services.performance.title")}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{t("services.performance.description")}</p>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaPaintBrush style={{ color: "#FF4A6E" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("services.uiux.title")}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{t("services.uiux.description")}</p>
              </div>
            </div>
          </div>
          <TechMarquee />
        </section>

        {/* Work */}
        <section id="work" className="bg-[#121212] py-24 px-6 border-t border-white/[0.05]">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-3">{t("work.label")}</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-16">{t("work.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Laundry Project Card */}
              <Link href={`/${locale}/work/laundry`} className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1">
                <div className="bg-white/[0.02] border-b border-white/[0.08] overflow-hidden flex items-center justify-center">
                  <Image
                    src="/work/laundry/admin_page.png"
                    alt={t("work.laundry.title")}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] tracking-[0.2em] text-cyan-400 uppercase">{t("work.laundry.category")}</span>
                    <span className="text-gray-600">·</span>
                    <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">{t("work.laundry.stack")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{t("work.laundry.title")}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{t("work.laundry.description")}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-white transition-colors duration-300">
                    <span>{t("work.laundry.viewProject")}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                  </div>
                </div>
              </Link>

              {/* Coming soon card */}
              <div className="bg-white/[0.02] border border-dashed border-white/[0.08] rounded-2xl flex items-center justify-center p-8 min-h-[300px]">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">{t("work.comingSoonLabel")}</p>
                  <p className="text-gray-700 text-xs">{t("work.comingSoonSub")}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-[#121212] py-32 px-6 border-t border-white/[0.05]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.08]">
              <Image
                src="/about.png"
                alt="Abdessamad Louali"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                {t("about.title")} <span className="font-light italic text-gray-400">{t("about.titleItalic")}</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p>{t("about.p3")}</p>
                <p>{t("about.p4")}</p>
              </div>
              <div className="flex items-center gap-12 mt-12 pt-8 border-t border-white/10">
                <div>
                  <span className="text-4xl font-black text-cyan-400">{t("about.statsNumber")}</span>
                  <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mt-1">{t("about.statsLabel")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-[#0e0e0e] py-24 px-6 border-t border-white/[0.05]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl tracking-tight text-white mb-3">
                {t("testimonials.title")} <span className="font-bold">{t("testimonials.titleBold")}</span>
              </h2>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">{t("testimonials.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Card 1 */}
              <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-500">
                <span className="absolute top-6 left-8 text-6xl text-white/10 font-serif leading-none">&ldquo;</span>
                <div className="relative z-10 pt-6">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed italic mb-8">
                    &ldquo;{t("testimonials.t1quote")}&rdquo;
                  </p>
                  <div className="border-t border-white/[0.08] pt-6">
                    <p className="text-white font-semibold text-sm tracking-wide">{t("testimonials.t1author")}</p>
                    <p className="text-gray-500 text-xs tracking-[0.15em] uppercase mt-1">{t("testimonials.t1meta")}</p>
                  </div>
                </div>
              </div>
              {/* Card 2 — Coming soon */}
              <div className="bg-white/[0.01] border border-dashed border-white/[0.06] rounded-2xl p-10 flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <span className="text-5xl text-white/5 font-serif">&ldquo;</span>
                  <p className="text-gray-700 text-sm mt-4">{t("testimonials.comingSoon")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="projects" className="hidden">
          <Projects />
        </div>

        <ContactForm />

      </main>
    </>
  );
}
