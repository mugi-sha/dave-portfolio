import {
  SiReact, SiJavascript, SiTailwindcss, SiNodedotjs, SiMongodb,
  SiFirebase, SiVite, SiPython, SiGit, SiGithub, SiFigma, SiVercel,
} from "react-icons/si";

const skills = [
  { icon: <SiReact />, name: "React" },
  { icon: <SiJavascript />, name: "JavaScript" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <SiNodedotjs />, name: "Node.js" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiFirebase />, name: "Firebase" },
  { icon: <SiVite />, name: "Vite" },
  { icon: <SiPython />, name: "Python" },
  { icon: <SiGit />, name: "Git" },
  { icon: <SiGithub />, name: "GitHub" },
  { icon: <SiFigma />, name: "Figma" },
  { icon: <SiVercel />, name: "Vercel" },
];

export default function TechMarquee() {
  const row = [...skills, ...skills];

  return (
    <div className="marquee-mask w-full border-y border-white/10 bg-black/40 py-4 sm:py-5 backdrop-blur-sm">
      <div className="marquee-track">
        {row.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-2 sm:gap-3 text-white/60 transition-colors duration-200 hover:text-[#80db66]"
            aria-hidden={i >= skills.length}
          >
            <span className="text-xl sm:text-2xl">{skill.icon}</span>
            <span className="font-display text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">
              {skill.name}
            </span>
            <span className="ml-6 sm:ml-9 h-1 w-1 rounded-full bg-[#80db66]/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
