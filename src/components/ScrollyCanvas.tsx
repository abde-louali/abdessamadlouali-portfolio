"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const num = pad(i, 3);
      img.src = `/sequence/frame_${num}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Draw initial frame if loaded
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

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50 transition-opacity duration-500 pointer-events-none">
            <div className="text-white text-sm font-medium opacity-50 tracking-wider">
              LOADING ASSETS {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
            </div>
          </div>
        )}
        {children && children(scrollYProgress)}
      </div>
    </div>
  );
}
