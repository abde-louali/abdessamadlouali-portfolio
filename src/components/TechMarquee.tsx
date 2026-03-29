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
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-sm uppercase tracking-widest text-center text-gray-400 font-semibold">
          Compétences Techniques
        </h2>
      </div>

      {/* Marquee Container with fade masks */}
      <div className="relative flex w-full max-w-7xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Animated Track - duplicated to achieve seamless loop */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {/* Render the array twice for the seamless loop */}
          {[...techStack, ...techStack].map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div 
                key={index} 
                className="flex items-center space-x-3 mx-8 px-6 py-4 rounded-xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm transition-colors hover:bg-white/[0.05]"
              >
                <Icon className={`w-8 h-8 ${tech.color}`} />
                <span className="text-xl font-medium text-gray-200 tracking-tight">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
