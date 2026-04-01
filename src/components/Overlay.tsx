"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Overlay({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("hero");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Section 1
  const opacity1 = useTransform(progress, [0.1, 0.25], [1, 0]);
  const y1 = useTransform(progress, [0, 0.25], [0, -100]);
  const display1 = useTransform(progress, (p) => (p > 0.26 ? "none" : "block"));

  // Section 2
  const start2 = isMobile ? 0.1 : 0.15;
  const end2 = isMobile ? 0.55 : 0.50;
  const opacity2 = useTransform(progress, [start2, start2 + 0.05, end2 - 0.05, end2], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [start2, end2], [50, -100]);
  const display2 = useTransform(progress, (p) => (p < start2 - 0.02 || p > end2 + 0.02 ? "none" : "block"));

  // Section 3
  const start3 = isMobile ? 0.15 : 0.35;
  const end3 = 0.955;
  const opacity3 = useTransform(progress, [start3, start3 + 0.1, end3 - 0.1, end3], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [start3, end3], [50, -100]);
  const display3 = useTransform(progress, (p) => (p < start3 - 0.02 || p > end3 + 0.02 ? "none" : "block"));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full overflow-hidden">
      {/* Section 1 */}
      <div className="absolute inset-x-0 top-[45%] -translate-y-1/2 flex justify-center pointer-events-none px-6">
        <motion.div style={{ opacity: opacity1, y: y1, display: display1 }} className="text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-3 uppercase leading-none">
            {t("name")}<span className="text-cyan-400">.</span>
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-medium tracking-[0.4em] uppercase">
            {t("tagline")}
          </p>
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="absolute inset-x-0 md:inset-x-auto md:left-12 lg:left-24 top-1/2 -translate-y-1/2 w-full md:max-w-xl pointer-events-none px-8">
        <motion.div style={{ opacity: opacity2, y: y2, display: display2 }} className="text-center md:text-left w-full">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            {t("section2")}
          </h2>
        </motion.div>
      </div>

      {/* Section 3 */}
      <div className="absolute inset-x-0 md:inset-x-auto md:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-full md:max-w-2xl flex justify-center md:justify-end pointer-events-none px-8">
        <motion.div style={{ opacity: opacity3, y: y3, display: display3 }} className="text-center md:text-right w-full">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6">
            {t("section3title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-sm sm:max-w-md mx-auto md:mx-0 md:ml-auto">
            {t("section3body")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}