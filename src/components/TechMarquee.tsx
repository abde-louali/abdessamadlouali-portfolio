import React from "react";
import { 
  FaHtml5, FaCss3Alt, FaPhp, FaLaravel, 
  FaJava, FaReact, FaGitAlt, FaGithub 
} from "react-icons/fa";
import { 
  SiJavascript, SiMysql, SiSpringboot, 
  SiExpress, SiTailwindcss 
} from "react-icons/si";

const techStack = [
  { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
  { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "PHP", icon: FaPhp, color: "text-indigo-400" },
  { name: "MySQL", icon: SiMysql, color: "text-blue-600" },
  { name: "Laravel", icon: FaLaravel, color: "text-red-500" },
  { name: "Java", icon: FaJava, color: "text-red-600" },
  { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
  { name: "Express.js", icon: SiExpress, color: "text-gray-300" },
  { name: "React.js", icon: FaReact, color: "text-cyan-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" },
  { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
  { name: "GitHub", icon: FaGithub, color: "text-white" },
];

export default function TechMarquee() {
  return (
    <section className="relative z-20 bg-zinc-950 py-24 overflow-hidden border-t border-white/5">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-[10px] tracking-[0.25em] text-gray-500 uppercase text-center mb-2">Technologies &amp; Tools</p>
        <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-12">My Arsenal</h2>
      </div>

      {/* Marquee Container with fade masks */}
      <div className="relative flex w-full max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Animated Track - duplicated to achieve seamless loop */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {[...techStack, ...techStack].map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.12] backdrop-blur-md hover:bg-white/[0.08] transition-all duration-300 cursor-default mx-1.5"
              >
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <Icon className={`w-full h-full ${tech.color}`} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[11px] font-semibold text-white/90">{tech.name}</span>
                  <span className="text-[11px] font-semibold text-white/40">{tech.name}</span>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
