import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const springX = useSpring(dotX, { stiffness: 400, damping: 28 });
  const springY = useSpring(dotY, { stiffness: 400, damping: 28 });
  const ringX = useSpring(dotX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(dotY, { stiffness: 150, damping: 20 });
  const isHover = useRef(false);

  useEffect(() => {
    const move = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const onEnter = () => { isHover.current = true; };
    const onLeave = () => { isHover.current = false; };

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => window.removeEventListener("mousemove", move);
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ left: springX, top: springY }}
      />
      <motion.div
        className="cursor-ring"
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
