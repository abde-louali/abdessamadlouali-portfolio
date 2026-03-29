"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ progress }: { progress: MotionValue<number> }) {
  // Section 1: 0% to 20%
  const opacity1 = useTransform(progress, [0.15, 0.2], [1, 0]);
  const y1 = useTransform(progress, [0, 0.2], [0, -100]);
  // Use display none to absolutely prevent visual persistence overlapping
  const display1 = useTransform(progress, (p) => (p > 0.21 ? "none" : "block"));

  // Section 2: 25% to 50%
  const opacity2 = useTransform(progress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.25, 0.5], [50, -100]);
  const display2 = useTransform(progress, (p) => (p < 0.24 || p > 0.51 ? "none" : "block"));

  // Section 3: 55% to 80%
  const opacity3 = useTransform(progress, [0.55, 0.6, 0.8, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.55, 0.85], [50, -100]);
  const display3 = useTransform(progress, (p) => (p < 0.54 ? "none" : "block"));

  return (
    <div className="absolute inset-0 pointer-events-none container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
      {/* Section 1 */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none px-4">
        <motion.div style={{ opacity: opacity1, y: y1, display: display1 }} className="text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-2 md:mb-4 uppercase break-words w-full">
            Abdessamad<span className="text-cyan-400">.</span>
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white font-semibold tracking-[0.15em] sm:tracking-[0.3em] uppercase drop-shadow-md">
            Full Stack Web Developer
          </p>
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="absolute inset-x-0 md:inset-x-auto md:left-12 lg:left-24 top-1/2 -translate-y-1/2 w-full md:max-w-xl pointer-events-none px-6">
        <motion.div style={{ opacity: opacity2, y: y2, display: display2 }} className="text-center md:text-left w-full">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6">
            I build digital<br className="hidden sm:block md:hidden" /> experiences.
          </h2>
        </motion.div>
      </div>

      {/* Section 3 */}
      <div className="absolute inset-x-0 md:inset-x-auto md:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-full md:max-w-xl flex justify-center md:justify-end pointer-events-none px-6">
        <motion.div style={{ opacity: opacity3, y: y3, display: display3 }} className="text-center md:text-right w-full">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6">
            Architecting Solutions.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-sm sm:max-w-md mx-auto md:mx-0 md:ml-auto">
            Turning complex problems into elegant, high-performance interfaces. My focus is on writing clean, scalable code that elevates the user experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
