"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

type ScrollContextType = {
    scrollYProgress: MotionValue<number>;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollProgress = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollProgress must be used within a SmoothScrollProvider');
    }
    return context.scrollYProgress;
};

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const scrollYProgress = useMotionValue(0);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,               // adjust smoothness (higher = slower)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // nice easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Sync Lenis scroll progress with Framer Motion value
        lenis.on('scroll', (e: any) => {
            scrollYProgress.set(e.progress);
        });

        // Animation frame loop
        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [scrollYProgress]);

    return (
        <ScrollContext.Provider value={{ scrollYProgress }}>
            {children}
        </ScrollContext.Provider>
    );
}