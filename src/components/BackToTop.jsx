import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";

const MotionButton = motion.button;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionButton
          initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 24, scale: 0.85 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollTop}
          aria-label="Back to top"
          className="glass-nav fixed bottom-6 right-6 z-[60] h-12 w-12 rounded-full flex items-center justify-center text-[#80db66] text-lg cursor-pointer transition-colors duration-200 hover:bg-[#80db66] hover:text-black"
        >
          <FaArrowUp />
        </MotionButton>
      )}
    </AnimatePresence>
  );
}
