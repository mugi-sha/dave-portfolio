import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

const links = [
  { title: "Home", href: "#home" },
  { title: "About Me", href: "#about" },
  { title: "Services", href: "#services" },
  { title: "Resume", href: "#resume" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex justify-center items-center px-4 pt-4"
    >
      <nav className={`glass-nav h-16 flex justify-between items-center px-6 w-full max-w-6xl rounded-2xl relative z-30 transition-all duration-500 ${scrolled ? "glass-nav-scrolled" : ""}`}>
        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, "#home")}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <img src="/logo.svg" alt="M logo" className="h-9 w-9 lg:h-10 lg:w-10" />
          <span className="font-display text-white text-xl lg:text-2xl font-bold tracking-wide">
            M<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7 text-white/85 relative">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              aria-current={active === link.href ? "true" : undefined}
              className={`nav-link text-[15px] font-medium transition-colors duration-200 cursor-pointer ${
                active === link.href
                  ? "nav-active text-accent"
                  : "hover:text-accent"
              }`}
            >
              {link.title}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="nav-underline"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(event) => handleNavClick(event, "#contact")}
            className="ml-2 rounded-full bg-gradient-to-r from-electric to-accent-strong px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(77,119,255,0.3)] cursor-pointer"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Burger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden text-white text-3xl cursor-pointer"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-nav absolute top-[70px] left-0 w-full rounded-2xl md:hidden z-50"
            >
              <ul className="flex flex-col items-start gap-1 py-4 px-4 text-white">
                {links.map((link, i) => (
                  <motion.li
                    key={link.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="w-full"
                  >
                    <a
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link.href)}
                      aria-current={active === link.href ? "true" : undefined}
                      className={`block w-full rounded-lg px-3 py-3 font-medium transition-colors duration-200 cursor-pointer ${
                        active === link.href
                          ? "text-accent bg-white/10"
                          : "hover:bg-white/10 hover:text-accent"
                      }`}
                    >
                      {link.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};
