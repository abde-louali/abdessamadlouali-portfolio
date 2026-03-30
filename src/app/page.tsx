"use client";

import Header from "@/components/Header";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";
import ContactForm from "@/components/ContactForm";
import { FaLayerGroup, FaCodeBranch, FaBolt, FaPaintBrush } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-[#121212] min-h-screen text-white selection:bg-white/30 font-sans">
        {/* Hero / Frames */}
        <div id="work">
          <ScrollyCanvas>
            {(progress) => <Overlay progress={progress} />}
          </ScrollyCanvas>
        </div>

        {/* Services */}
        <section id="services" className="bg-[#121212] py-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">What I Do</h2>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">CORE CAPABILITIES</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaLayerGroup style={{ color: "#4A9EFF" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Frontend Architecture</h3>
                <p className="text-gray-300 text-base leading-relaxed">Designing scalable, maintainable, and high-performance frontend systems for enterprise applications using React, Next.js, and TypeScript.</p>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaCodeBranch style={{ color: "#4AFF9E" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Full-Stack Development</h3>
                <p className="text-gray-300 text-base leading-relaxed">Building scalable and high-performance end-to-end applications with Laravel, Express.js, and Spring Boot backends, paired with modern, user-focused interfaces.</p>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaBolt style={{ color: "#FFD84A" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Performance Optimization</h3>
                <p className="text-gray-300 text-base leading-relaxed">Identifying bottlenecks and implementing strategies across the stack to ensure lightning-fast load times and smooth rendering.</p>
              </div>

              <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-8">
                  <FaPaintBrush style={{ color: "#FF4A6E" }} className="text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">UI/UX Engineering</h3>
                <p className="text-gray-300 text-base leading-relaxed">Translating complex design systems into pixel-perfect, accessible, and responsive digital experiences.</p>
              </div>
            </div>
          </div>
          <TechMarquee />
        </section>

        {/* About */}
        <section id="about" className="bg-[#121212] py-32 px-6 border-t border-white/[0.05]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              className="relative aspect-square rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="h-[1px] bg-white/10 mb-6" />
                <p className="text-[10px] tracking-[0.3em] text-gray-600 uppercase">ISTA · Ifrane · Morocco</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                About <span className="font-light italic text-gray-400">Me</span>
              </h2>
              <div className="space-y-6 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>
                  I am a Full Stack Developer and Digital Craftsman with hands-on experience building scalable, high-performance web applications for real-world use cases. I bridge the gap between aesthetic design and robust engineering.
                </p>
                <p>
                  Strong expertise in React.js, Spring Boot, and Laravel, with hands-on experience designing RESTful APIs, integrating backend services, and solving complex technical challenges including OCR integration with Python.
                </p>
                <p>
                  Trained at ISTA Ifrane in Full Stack Web Development, delivering end-to-end projects with clean, maintainable code. Solid foundation in Agile/Scrum methodologies and experienced in collaborating closely with product and business stakeholders.
                </p>
                <p>
                  Currently open to junior full-stack roles with a focus on product-driven teams, long-term growth, and impactful digital experiences.
                </p>
              </div>
              <div className="flex items-center gap-12 mt-12 pt-8 border-t border-white/10">
                <div>
                  <span className="text-4xl font-black text-cyan-400">3+</span>
                  <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mt-1">Projects Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <div id="testimonials" className="py-24 bg-zinc-900/50 border-t border-white/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-12 text-center uppercase tracking-[0.1em]">Client Feedback</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-all">
                <p className="text-gray-300 italic mb-6 leading-relaxed">&quot;An absolute professional. Delivered our complex web infrastructure with flawless execution and stunning UI animations.&quot;</p>
                <h4 className="text-white font-semibold text-sm tracking-widest uppercase">- Agency Director</h4>
              </div>
              <div className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-all">
                <p className="text-gray-300 italic mb-6 leading-relaxed">&quot;Bridged the gap between our design prototypes and a scalable React architecture perfectly.&quot;</p>
                <h4 className="text-white font-semibold text-sm tracking-widest uppercase">- Product Manager</h4>
              </div>
            </div>
          </div>
        </div>

        <div id="projects" className="hidden">
          <Projects />
        </div>

        <ContactForm />
      </main>
    </>
  );
}