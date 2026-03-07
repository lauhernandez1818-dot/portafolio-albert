import { useEffect, useRef } from "react";

/* Uses direct DOM mutation + requestAnimationFrame — no React re-renders on scroll */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct   = total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct / 100})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] overflow-hidden"
      style={{ background: "rgba(255,255,255,0.05)" }}>
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "left",
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #6366f1, #22d3ee)",
          willChange: "transform",
          boxShadow: "0 0 8px rgba(99,102,241,0.7)",
        }}
      />
    </div>
  );
}
