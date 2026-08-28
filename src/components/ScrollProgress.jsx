import { motion, useScroll, useSpring } from "framer-motion";

const MotionDiv = motion.div;

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionDiv
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-[#4d77ff] via-[#22c55e] to-[#80db66]"
    />
  );
}
