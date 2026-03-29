"use client";

import Header from "@/components/Header";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <>
      {/* ✅ Header is OUTSIDE main — floats freely over everything */}
      <Header />

      <main className="bg-[#121212] min-h-screen text-white selection:bg-white/30">

        {/* ✅ services section — no pt, no bg, just a thin observer target */}
        <div id="services" className="absolute top-0 h-1 w-full pointer-events-none" />

        {/* ✅ work/ScrollyCanvas starts at very top — header floats over it */}
        <div id="work">
          <ScrollyCanvas>
            {(progress) => <Overlay progress={progress} />}
          </ScrollyCanvas>
        </div>

        <div id="about" className="py-24 bg-[#121212] flex items-center justify-center">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">About Me</h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
              I am a specialized Full Stack Developer from ISTA, Ifrane. I blend deep technical knowledge of Laravel, Spring Boot, and Python with modern frontend aesthetics using React and Framer Motion.
            </p>
          </div>
        </div>

        <div id="experience">
          <TechMarquee />
        </div>

        <div id="testimonials" className="py-24 bg-zinc-900 border-t border-white/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-12 text-center">Client Feedback</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-gray-300 italic mb-6">&quot;An absolute professional. Delivered our complex web infrastructure with flawless execution and stunning UI animations.&quot;</p>
                <h4 className="text-white font-semibold">- Agency Director</h4>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-gray-300 italic mb-6">&quot;Bridged the gap between our design prototypes and a scalable React architecture perfectly.&quot;</p>
                <h4 className="text-white font-semibold">- Product Manager</h4>
              </div>
            </div>
          </div>
        </div>

        <div id="projects" className="hidden">
          <Projects />
        </div>

        <footer id="contact" className="bg-[#121212] py-24 text-center border-t border-white/10 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Let&apos;s Connect</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Currently available for freelance opportunities or full-time roles. Get in touch to discuss your next big idea.
          </p>
          <a href="mailto:hello@example.com" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
            Say Hello
          </a>
          <p className="mt-16 text-gray-600 text-sm">
            © {new Date().getFullYear()} Full Stack Web Developer. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}