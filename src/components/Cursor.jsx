import { useEffect, useRef } from "react";

/* ─── Pure-RAF cursor — zero framer-motion overhead ─── */
export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const raf     = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      // dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // ring lerps behind
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ position: "fixed", top: 0, left: 0, willChange: "transform", pointerEvents: "none", zIndex: 9999 }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: "fixed", top: 0, left: 0, willChange: "transform", pointerEvents: "none", zIndex: 9998 }} />
    </>
  );
}
