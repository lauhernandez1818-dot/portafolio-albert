import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

const tagStyle = (tag) => {
  if (tag === "Catálogo") return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
  if (tag === "Web")      return "bg-blue-500/15  text-blue-400  border-blue-500/30";
  return "bg-violet-500/15 text-violet-400 border-violet-500/30";
};

export default function ProjectCard({ project, index = 0, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const fx = !(prefersReducedMotion || isMobile);

  const transition = isMobile 
    ? { duration: 0.3, ease: "easeOut" } // tween-like for mobile
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }; // spring-like for desktop

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
        show:   { opacity: 1, y: 0, transition },
      }}
      className="group relative will-change-transform"
      onHoverStart={fx ? () => setHovered(true) : undefined}
      onHoverEnd={fx   ? () => setHovered(false) : undefined}
    >
      <motion.button
        type="button"
        onClick={onSelect}
        whileHover={fx ? { y: -10 } : undefined}
        whileTap={{ scale: 0.975 }}
        className="w-full text-left block rounded-2xl overflow-hidden cursor-pointer relative"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
          border: isMobile ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
          boxShadow: hovered && !isMobile && !prefersReducedMotion
            ? "0 20px 60px -12px rgba(99,102,241,0.25), 0 0 0 1px rgba(99,102,241,0.2)"
            : isMobile ? "none" : "0 4px 24px -6px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.4s ease, border 0.4s ease",
        }}
      >
        {/* ── IMAGE AREA ── */}
        <div className="relative aspect-video overflow-hidden flex items-center justify-center p-8"
          style={{ background: "linear-gradient(150deg, #0d0d22 0%, #080814 100%)" }}>

          {/* animated background orb */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={fx && hovered
              ? { opacity: 1 }
              : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 70%)",
            }}
          />

          {/* subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* shine sweep on hover */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none -skew-x-12"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
              initial={{ x: "-120%" }}
              animate={fx && hovered ? { x: "220%" } : { x: "-120%" }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            />
          )}

          {/* project logo */}
          <motion.img
            src={project.image}
            alt={`Logo ${project.name}`}
            loading="lazy"
            decoding="async"
            className="w-4/5 h-4/5 object-contain relative z-10"
            animate={fx && hovered && !prefersReducedMotion
              ? { scale: 1.1, filter: "drop-shadow(0 0 28px rgba(99,102,241,0.55))" }
              : { scale: 1,   filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.5))" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* bottom overlay + CTA */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(8,8,20,0.9), transparent)" }}
            animate={{ opacity: fx && hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white pointer-events-none"
            style={{
              background: "linear-gradient(135deg, #6366f1, #22d3ee)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            }}
            animate={{ opacity: fx && hovered ? 1 : 0, y: fx && hovered && !prefersReducedMotion ? 0 : 8 }}
            transition={{ duration: 0.25 }}
          >
            Ver detalles
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.span>
        </div>

        {/* ── INFO AREA ── */}
        <div
          className="px-5 py-4 sm:px-6 sm:py-5 space-y-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-300 truncate leading-tight">
                {project.name}
              </h3>
              <p className="mt-1 text-white/40 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* expand icon */}
            <motion.div
              className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white/40"
              animate={fx && hovered
                ? { background: "rgba(99,102,241,0.25)", borderColor: "rgba(99,102,241,0.5)", color: "#a5b4fc" }
                : { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
              transition={{ duration: 0.25 }}
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.div>
          </div>

          {/* tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest rounded-full border ${tagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.button>
    </motion.article>
  );
}
