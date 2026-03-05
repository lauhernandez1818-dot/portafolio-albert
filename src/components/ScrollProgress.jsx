import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / total) * 100;
      setProgress(Math.min(scrolled, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-surface/80 z-[60] overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-accent via-cyan to-purple origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.1 }}
        style={{ width: "100%" }}
      />
    </div>
  );
}
