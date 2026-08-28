import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

/* Aliased per repo lint convention (core no-unused-vars can't see JSX usage) */
const MotionDiv = motion.div;
const MotionArticle = motion.article;
const MotionH1 = motion.h1;
const MotionUl = motion.ul;
const MotionLi = motion.li;
const MotionSpan = motion.span;

const projects = [
  {
    id: 1,
    number: "01",
    title: "Supply Chain Management",
    category: "Client",
    description:
      "End-to-end supply chain platform with real-time inventory tracking, order workflows and analytics dashboards.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    github: null,
    demo: "#",
    col1Image1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1Image2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2Image: "/supply%20chain%20system.png",
  },
  {
    id: 2,
    number: "02",
    title: "Car Repair System",
    category: "Client",
    description:
      "Workshop management app with appointment scheduling, repair job tracking and customer notifications.",
    technologies: ["React", "Tailwind", "Firebase"],
    github: "#",
    demo: "#",
    col1Image1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1Image2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2Image: "/car%20repair%20management%20system.png",
  },
  {
    id: 3,
    number: "03",
    title: "Soda Website",
    category: "Client",
    description:
      "A modern, vibrant soda brand website featuring product showcases, brand story, and an engaging purchase experience.",
    technologies: ["React", "Tailwind", "Vite"],
    github: null,
    demo: "#",
    col1Image1: "/soda.png",
    col1Image2: "/soda.png",
    col2Image: "/soda.png",
  },
  {
    id: 4,
    number: "04",
    title: "Flower Website",
    category: "Client",
    description:
      "A beautifully designed flower shop website with elegant product galleries, delivery options and an intuitive ordering flow.",
    technologies: ["React", "Tailwind", "Vite"],
    github: null,
    demo: "#",
    col1Image1: "/loop.png",
    col1Image2: "/loop.png",
    col2Image: "/loop.png",
  },
];

/* ============ ORBIT CONFIG (all derived from project count) ============ */
const COUNT = projects.length;
const VH_PER_PROJECT = 140; // pinned viewing time per project
const TOTAL_VH = COUNT * VH_PER_PROJECT;
const STEP = 360 / COUNT;
const TOTAL_ROTATION = STEP * (COUNT - 1);
const PERSPECTIVE = 1400;

const EASE = [0.22, 1, 0.36, 1];

/*
 * Maps raw scroll progress (0..1) to wheel rotation with a dwell plateau
 * around every project so each one stays readable before the wheel turns.
 */
function rotationAt(p, count) {
  const stops = count - 1;
  const clamped = Math.min(Math.max(p, 0), 1);
  if (stops < 1) return 0;
  const seg = 1 / stops;
  const i = Math.min(Math.floor(clamped * stops), stops - 1);
  let u = (clamped - i * seg) / seg;
  const hold = 0.45; // share of each segment spent holding on a project
  u = Math.min(Math.max((u - hold / 2) / (1 - hold), 0), 1);
  const eased = u * u * (3 - 2 * u); // smoothstep
  return (i + eased) * STEP;
}

/* Responsive orbit radii as MotionValues so transforms stay live on resize */
function useOrbitRadii() {
  const rx = useMotionValue(360);
  const rz = useMotionValue(420);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw < 640) {
        rx.set(Math.min(vw * 0.36, 230));
        rz.set(Math.min(vh * 0.42, 300));
      } else {
        rx.set(Math.min(Math.max(vw * 0.28, 330), 520));
        rz.set(Math.min(Math.max(vh * 0.4, 300), 560));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [rx, rz]);

  return { rx, rz };
}

const CARD_SHADOW_BASE =
  "0 18px 50px -18px rgba(0, 0, 0, 0.75)";
const CARD_SHADOW_ACTIVE =
  "0 34px 90px -22px rgba(77, 119, 255, 0.28), 0 0 42px -10px rgba(128, 219, 102, 0.22)";

/* ============================== ORBIT CARD ============================== */
function OrbitCard({ project, index, rotation, rx, rz, fitScale, isActive }) {
  const baseAngle = index * STEP;

  const cosTheta = useTransform(rotation, (r) => {
    const theta = ((baseAngle - r) * Math.PI) / 180;
    return Math.cos(theta);
  });
  const sinTheta = useTransform(rotation, (r) => {
    const theta = ((baseAngle - r) * Math.PI) / 180;
    return Math.sin(theta);
  });

  const x = useTransform(sinTheta, (s) => s * rx.get());
  const z = useTransform(cosTheta, (c) => c * rz.get());
  const depth = useTransform(cosTheta, (c) => (c + 1) / 2);

  const depthScale = useTransform(depth, [0, 1], [0.74, 1]);
  const scale = useTransform([depthScale, fitScale], ([d, f]) => d * f);
  const opacity = useTransform(depth, [0, 1], [0.52, 1]);
  const brightness = useTransform(depth, [0, 1], [0.7, 1]);
  const blurPx = useTransform(depth, [0, 1], [1.5, 0]);
  const filter = useMotionTemplate`brightness(${brightness}) blur(${blurPx}px)`;
  const zIndex = useTransform(cosTheta, (c) => Math.round(c * 100) + 100);

  return (
    <MotionDiv
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        x,
        z,
        scale,
        opacity,
        filter,
        zIndex,
        transformTemplate: (latest, generated) => `translate(-50%, -50%) ${generated}`,
      }}
    >
      <MotionArticle
        animate={{ boxShadow: isActive ? CARD_SHADOW_ACTIVE : CARD_SHADOW_BASE }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-[min(clamp(290px,30vw,420px),calc(100vw-2rem))] rounded-[30px] sm:rounded-[40px] md:rounded-[44px] border-2 border-[#D7E2EA]/90 bg-[#101216] overflow-hidden"
      >
        <div className="h-[clamp(140px,22vh,240px)] bg-gradient-to-br from-[#1b2430] via-[#141a22] to-[#0c0f14]">
          <img
            src={project.col2Image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>

        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex justify-between items-start mb-2 gap-3">
            <span className="font-black text-4xl sm:text-5xl text-[#D7E2EA] leading-none">
              {project.number}
            </span>
            <span className="text-[#D7E2EA]/70 uppercase tracking-widest text-xs mt-1.5">
              {project.category}
            </span>
          </div>

          <h2 className="hero-heading font-black uppercase text-2xl sm:text-3xl leading-tight break-words">
            {project.title}
          </h2>

          {/* Featured details — only fully revealed on the front card */}
          <MotionDiv
            initial={false}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ pointerEvents: isActive ? "auto" : "none" }}
          >
            <p className="mt-2.5 text-sm text-[#93A6B3] leading-snug line-clamp-2">
              {project.description}
            </p>

            <MotionUl
              initial={false}
              animate={isActive ? "show" : "hide"}
              variants={{
                hide: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
              className="flex flex-wrap gap-2 mt-3 min-h-[26px]"
            >
              {project.technologies.map((tech) => (
                <MotionLi
                  key={tech}
                  variants={{
                    hide: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                  className="rounded-full border border-[#D7E2EA]/25 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#D7E2EA]/80"
                >
                  {tech}
                </MotionLi>
              ))}
            </MotionUl>

            <div className="flex gap-3 mt-4">
              {[project.col1Image1, project.col1Image2].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} thumbnail ${i + 1}`}
                  className="w-1/2 h-[clamp(44px,7vh,64px)] object-cover rounded-xl bg-gradient-to-br from-[#1b2430] to-[#0c0f14]"
                  loading="lazy"
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.visibility = "hidden";
                  }}
                />
              ))}
            </div>

            <div className="flex gap-3 mt-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${project.title} source code on GitHub`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-4 py-1 text-xs uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                >
                  <FiGithub size={14} aria-hidden="true" />
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${project.title} live demo`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D7E2EA] px-4 py-1 text-xs uppercase tracking-widest text-[#0C0C0C] font-semibold hover:bg-white transition-colors cursor-pointer"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  Live Demo
                </a>
              )}
            </div>
          </MotionDiv>
        </div>
      </MotionArticle>
    </MotionDiv>
  );
}

/* ============================== COUNTER ============================== */
function ProjectCounter({ active, progress }) {
  const scaleX = useSpring(progress, { stiffness: 90, damping: 25 });

  return (
    <div className="absolute bottom-6 left-6 sm:left-10 z-20 select-none pointer-events-none">
      <div className="flex items-baseline gap-1 font-black text-2xl sm:text-3xl text-[#D7E2EA] tracking-wider tabular-nums">
        <span className="inline-flex overflow-hidden h-[1.1em] items-baseline">
          <AnimatePresence mode="popLayout" initial={false}>
            <MotionSpan
              key={active}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {String(active + 1).padStart(2, "0")}
            </MotionSpan>
          </AnimatePresence>
        </span>
        <span className="opacity-40">/</span>
        <span className="opacity-40">{String(COUNT).padStart(2, "0")}</span>
      </div>
      <div className="mt-2 h-px w-24 bg-[#D7E2EA]/15 overflow-hidden">
        <MotionDiv
          className="h-full w-full origin-left bg-gradient-to-r from-[#4d77ff] to-[#80db66]"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
}

/* ====================== REDUCED-MOTION FALLBACK ====================== */
function StaticShowcase() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-5 sm:px-8"
    >
      <h1 className="font-display font-bold text-white text-center text-5xl md:text-6xl mb-10 sm:mb-14">
        My <span className="text-[#80db66]">Projects</span>
      </h1>
      <div className="w-full max-w-7xl grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-[28px] border-2 border-[#D7E2EA]/90 bg-[#101216] overflow-hidden shadow-2xl"
          >
            <img
              src={project.col2Image}
              alt={`${project.title} preview`}
              className="w-full h-40 object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className="font-black text-3xl text-[#D7E2EA] leading-none">
                  {project.number}
                </span>
                <span className="text-[#D7E2EA]/70 uppercase tracking-widest text-xs mt-1">
                  {project.category}
                </span>
              </div>
              <h2 className="hero-heading font-black uppercase text-xl leading-tight">
                {project.title}
              </h2>
              <p className="mt-2 text-sm text-[#93A6B3] leading-snug">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2 mt-3">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-[#D7E2EA]/25 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#D7E2EA]/80"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-4 py-1.5 text-xs uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
                  >
                    <FiGithub size={14} aria-hidden="true" />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#D7E2EA] px-4 py-1.5 text-xs uppercase tracking-widest text-[#0C0C0C] font-semibold hover:bg-white transition-colors cursor-pointer"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================ MAIN SECTION ============================ */
export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Smoothed scrub — lerp-like physical feel, settles into each project */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  const rotation = useTransform(smooth, (p) => rotationAt(p, COUNT));
  const { rx, rz } = useOrbitRadii();

  /* Scale-to-fit: shrink the ring uniformly until the tallest card fits
     the available stage height — INCLUDING perspective magnification,
     since the front card's translateZ visually enlarges it by
     P / (P - z). This guarantees the full card (bottom edge included)
     stays inside the viewport. */
  const fitScale = useMotionValue(1);
  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const card = stage?.querySelector("article");
      if (!stage || !card) return;
      const natural = card.offsetHeight; // layout height, ignores transforms
      if (!natural) return;
      const zFront = Math.max(rz.get(), 1);
      const magnification = PERSPECTIVE / (PERSPECTIVE - zFront);
      fitScale.set(
        Math.min(1, (stage.clientHeight * 0.93) / (natural * magnification))
      );
    };
    measure();
    const t = setTimeout(measure, 350); // re-check after fonts/layout settle
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [fitScale, rz]);

  const [active, setActive] = useState(() =>
    Math.round(rotationAt(scrollYProgress.get(), COUNT))
  );
  useMotionValueEvent(smooth, "change", (v) => {
    const next = Math.min(
      Math.max(Math.round(rotationAt(v, COUNT)), 0),
      COUNT - 1
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  /* Subtle mouse parallax on the whole ring — never overrides scroll */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 55,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 55,
    damping: 18,
  });

  const handleMouseMove = (e) => {
    if (!stageRef.current || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (prefersReducedMotion) return <StaticShowcase />;

  return (
    <section
      id="projects"
      ref={containerRef}
      aria-label="Projects showcase"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10"
      style={{ height: `${TOTAL_VH}vh` }}
    >
      <MotionDiv
        className="sticky top-0 h-svh overflow-hidden flex flex-col items-center pt-10 sm:pt-12 md:pt-14 pb-14 sm:pb-20 md:pb-24 px-5 sm:px-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
        }}
      >
        <MotionH1
          variants={{
            hidden: { opacity: 0, y: 36 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
          className="font-display font-bold text-white text-center text-[clamp(2.5rem,6vw,60px)] sm:text-5xl md:text-6xl mb-4 sm:mb-6 shrink-0"
        >
          My <span className="text-[#80db66]">Projects</span>
        </MotionH1>

        <MotionDiv
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          variants={{
            hidden: { opacity: 0, scale: 0.94 },
            show: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: EASE },
            },
          }}
          className="relative flex-1 w-full [perspective:1400px]"
        >
          <MotionDiv
            style={{ rotateX, rotateY }}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            {projects.map((project, index) => (
              <OrbitCard
                key={project.id}
                project={project}
                index={index}
                rotation={rotation}
                rx={rx}
                rz={rz}
                fitScale={fitScale}
                isActive={index === active}
              />
            ))}
          </MotionDiv>
        </MotionDiv>

        <ProjectCounter active={active} progress={scrollYProgress} />
      </MotionDiv>
    </section>
  );
}
