import React from "react";

const projects = [
  {
    title: "Neon Horizon",
    description: "A high-performance WebGL product configurator with dynamic lighting.",
    link: "#",
  },
  {
    title: "Aura Frame",
    description: "An immersive digital exhibition space built with Next.js and Three.js.",
    link: "#",
  },
  {
    title: "Lumina Engine",
    description: "A futuristic e-commerce experience with fluid page transitions.",
    link: "#",
  },
  {
    title: "Nova Interface",
    description: "Award-winning creative portfolio designed for a top-tier design agency.",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section className="relative z-10 bg-[#121212] py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-20 text-center">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl p-10 transition-all duration-500 hover:-translate-y-2
                         bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl 
                         hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_0_50px_rgba(255,255,255,0.03)] cursor-pointer overflow-hidden"
            >
              {/* Subtle hover glow layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed mb-10 md:text-lg">
                  {project.description}
                </p>
                <div className="inline-flex items-center text-sm uppercase tracking-widest font-medium text-white/60 group-hover:text-white transition-colors duration-300">
                  View Case Study
                  <svg
                    className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
