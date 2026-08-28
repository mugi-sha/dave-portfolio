import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaGithub, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa6";
import TiltCard from "./TiltCard";
import HeroScene from "./three/HeroScene";

const socials = [
  { href: "https://github.com/mugi-sha", label: "GitHub", icon: <FaGithub /> },
  { href: "https://instagram.com/davidmenelik", label: "Instagram", icon: <FaInstagram /> },
  { href: "https://wa.me/250796888684", label: "WhatsApp", icon: <FaWhatsapp /> },
  { href: "mailto:mugishadavid910@gmail.com", label: "Email", icon: <FaEnvelope /> },
];

const roles = [
  "Frontend Developer",
  "Full-Stack Developer",
  "Software Developer",
  "Creative Technologist",
];

/* ── Profile image with layered glow ──────────────────────────── */
const ProfilePhoto = ({ size }) => (
  <div className="profile-ring relative">
    <img
      src="/WhatsApp Image 2026-08-02 at 11.06.47 AM.jpeg"
      alt="mugisha david"
      className={`profile-photo brightness-90 ${size}`}
    />
    <div className="profile-glow" aria-hidden="true" />
  </div>
);

/* ── Staggered text animation variants ────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const slideIn = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

/* ── Role rotation component ──────────────────────────────────── */
function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  if (reducedMotion) {
    return <span>{roles[0]}</span>;
  }

  return (
    <span className="role-rotator" aria-live="polite">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Scroll indicator ─────────────────────────────────────────── */
function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
    >
      <span className="text-white/40 text-xs font-display tracking-[0.2em] uppercase">Scroll</span>
      <div className="scroll-mouse">
        <div className="scroll-wheel" />
      </div>
    </motion.div>
  );
}

/* ── Hero component ───────────────────────────────────────────── */
export const Hero = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div id="home" className="w-full min-h-[calc(100vh-100px)] relative">
      {/* 3D animated backdrop */}
      <HeroScene reducedMotion={reducedMotion} />

      <div className="hero-content">
        {/* ═══════════ MOBILE HERO ═══════════ */}
        <div className="md:hidden flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-8 pb-16">
          <motion.div {...scaleIn(0.3)}>
            <TiltCard maxTilt={8}>
              <ProfilePhoto size="h-44 w-44 sm:h-52 sm:w-52" />
            </TiltCard>
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="hero-tagline text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.35em] uppercase font-display mt-6 sm:mt-8">
            Hello I'm
          </motion.p>

          <motion.h1 {...scaleIn(0.6)} className="font-display text-3xl sm:text-4xl text-white font-bold mt-3 sm:mt-4 tracking-wide">
            mugisha
          </motion.h1>

          <motion.h1 {...fadeUp(0.7)} className="hero-name-accent font-display text-3xl sm:text-4xl font-bold tracking-wide">
            david
          </motion.h1>

          <motion.p {...fadeUp(0.85)} className="text-white/60 text-xs sm:text-sm mt-3 font-medium">
            A Passionate{" "}
            <span className="text-accent font-semibold">
              <RotatingRole />
            </span>
          </motion.p>

          <motion.p {...fadeUp(0.95)} className="text-white/40 text-xs sm:text-sm mt-4 leading-relaxed max-w-xs">
            I build software today with the ambition to build technology companies tomorrow.
          </motion.p>

          <motion.div {...fadeUp(1.1)} className="mt-8">
            <a href="#contact" className="cta-btn">
              Say Hello
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          <motion.div {...fadeUp(1.2)} className="flex gap-3 mt-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-icon-btn"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ═══════════ DESKTOP HERO ═══════════ */}
        <div className="hidden md:flex w-full min-h-[calc(100vh-140px)] items-center">
          {/* Left: text content */}
          <div className="w-1/2 flex flex-col justify-center ml-6 md:ml-10 lg:ml-16 xl:ml-20 pl-2">
            <motion.p {...slideIn(0.2)} className="hero-tagline text-sm md:text-base lg:text-xl tracking-[0.3em] lg:tracking-[0.35em] uppercase font-display">
              Hello I'm
            </motion.p>

            <motion.h1 {...scaleIn(0.4)} className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-wide leading-[1.05] mt-3 lg:mt-4">
              <span className="hero-name-primary">mugisha</span>
            </motion.h1>

            <motion.h1 {...fadeUp(0.55)} className="hero-name-accent font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-wide">
              david
            </motion.h1>

            <motion.div {...fadeUp(0.7)} className="flex gap-2 lg:gap-3 text-white mt-6 lg:mt-8 items-center">
              <h3 className="text-base lg:text-xl font-medium text-white/60">A Passionate</h3>
              <span className="text-accent text-lg lg:text-xl xl:text-2xl font-bold font-display role-rotator">
                <RotatingRole />
              </span>
            </motion.div>

            <motion.p {...fadeUp(0.85)} className="text-white/45 mt-4 max-w-md text-sm lg:text-base leading-relaxed">
              I build software today with the ambition to build technology companies tomorrow.
            </motion.p>

            <motion.div {...fadeUp(1.0)} className="mt-8 lg:mt-10 flex items-center gap-4 lg:gap-5 flex-wrap">
              <a href="#contact" className="cta-btn">
                Say Hello
                <svg className="cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="social-icon-btn"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: profile image in 3D space */}
          <div className="w-1/2 h-full flex items-center justify-center pr-6 relative">
            <motion.div {...scaleIn(0.5)}>
              <TiltCard maxTilt={14}>
                <ProfilePhoto size="h-72 w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96" />
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </div>
    </div>
  );
};
