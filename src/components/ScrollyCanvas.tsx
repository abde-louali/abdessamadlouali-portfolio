"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 88;

const pad = (num: number, size: number) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

export default function ScrollyCanvas({
  children,
}: {
  children?: (progress: any) => React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [fakeProgress, setFakeProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const num = pad(i, 3);
      img.src = `/sequence/frame_${num}_delay-0.066s.webp`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);

    const duration = 2500;
    const intervalTime = 25;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setFakeProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (images.length > 0 && images[0].complete && canvasRef.current) {
      renderFrame(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length === 0) return;
    const index = Math.round(latest);
    renderFrame(index);
  });

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = images[index];
    if (img && img.complete) {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }
  };

  const rawImagesProgress = (imagesLoaded / FRAME_COUNT) * 100;
  const displayProgress = Math.min(Math.round(fakeProgress), Math.round(rawImagesProgress));
  const isLoading = imagesLoaded < FRAME_COUNT || fakeProgress < 100;

  useEffect(() => {
    if (!isLoading) {
      document.body.classList.add("portfolio-loaded");
      window.dispatchEvent(new Event("portfolio-loaded"));
    }
  }, [isLoading]);

  return (
    <div ref={containerRef} className="relative min-h-[800vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] z-[100] pointer-events-none"
            >
              <div className="flex flex-col items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white uppercase"
                >
                  ABDE<span className="text-cyan-400">.</span>
                </motion.h1>
                <div className="w-full min-w-[140px] md:min-w-[180px] h-[2px] bg-white/10 my-4 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    style={{ width: `${displayProgress}%` }}
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-xs md:text-sm font-semibold tracking-[0.4em] text-gray-400 uppercase"
                >
                  PORTFOLIO
                </motion.p>
                <div className="absolute bottom-12 text-gray-500 text-xs tracking-[0.2em] font-mono">
                  LOADING ASSETS // {displayProgress}%
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {children && children(scrollYProgress)}
      </div>
    </div>
  );
}