import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── tiny icon helpers ─── */
const GithubIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

/* ─── tag colour helper ─── */
const tagStyle = (tag) => {
  if (tag === "Catálogo") return "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
  if (tag === "Web")      return "bg-blue-500/15  text-blue-400  border-blue-500/30";
  return "bg-violet-500/15 text-violet-400 border-violet-500/30";
};

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const liveUrl   = project.webUrl || project.catalogUrl;
  const isCatalog = Boolean(project.catalogUrl && project.tags?.includes("Catálogo"));
  const scrollRef = useRef(null);

  /* keyboard + body scroll lock */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  /* ── animation variants ── */
  const backdropVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit:    { opacity: 0, transition: { duration: 0.2 } },
  };
  const panelVariants = {
    hidden:  { opacity: 0, scale: 0.94, y: 30 },
    visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, scale: 0.94, y: 20, transition: { duration: 0.25 } },
  };
  const listItem = (i) => ({
    hidden:  { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.18 + i * 0.07, duration: 0.35, ease: "easeOut" } },
  });

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* ── blurred backdrop ── */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-xl" />

      {/* ── panel ── */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto sm:max-h-[92vh] max-w-3xl flex flex-col overflow-hidden rounded-none sm:rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #0d0d1f 0%, #0a0a18 60%, #0d0d20 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px -20px rgba(0,0,0,0.8), 0 0 80px -30px rgba(99,102,241,0.25)",
        }}
      >
        {/* ═══════════════ HERO SECTION ═══════════════ */}
        <div className="relative flex-shrink-0 overflow-hidden"
          style={{ minHeight: "clamp(180px, 32vh, 300px)" }}>

          {/* animated background orbs */}
          <motion.div
            className="absolute -top-1/2 -left-1/4 w-[70%] aspect-square rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 65%)" }}
            animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/4 w-[60%] aspect-square rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 65%)" }}
            animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* fade to panel body */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a18] to-transparent pointer-events-none z-10" />

          {/* logo */}
          <div className="relative z-20 flex items-center justify-center h-full py-10 px-8">
            <motion.img
              src={project.image}
              alt={project.name}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                maxWidth: "clamp(140px, 30vw, 260px)",
                filter: "drop-shadow(0 0 48px rgba(99,102,241,0.35)) drop-shadow(0 4px 24px rgba(0,0,0,0.6))",
              }}
              className="object-contain"
            />
          </div>

          {/* close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ═══════════════ SCROLLABLE BODY ═══════════════ */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
          <div className="px-6 sm:px-8 pb-8 pt-4 space-y-7">

            {/* tags */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-2"
            >
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-full border ${tagStyle(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="text-center text-3xl sm:text-4xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #fff 30%, rgba(99,102,241,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {project.name}
            </motion.h2>

            {/* description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="text-center text-sm sm:text-base text-white/55 leading-relaxed max-w-xl mx-auto"
            >
              {project.detail}
            </motion.p>

            {/* ── divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* ── highlights ── */}
            {project.highlights?.length > 0 && (
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-4 text-center"
                >
                  Características del proyecto
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.highlights.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={listItem(i)}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl relative overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* accent number */}
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black"
                        style={{
                          background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(34,211,238,0.2))",
                          border: "1px solid rgba(99,102,241,0.4)",
                          color: "#a5b4fc",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/80 font-medium leading-snug">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CTA buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              {/* GitHub – ghost */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 flex items-center justify-center gap-2.5 py-[14px] px-6 rounded-2xl font-bold text-sm text-white/70 hover:text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              >
                <GithubIcon />
                Ver código
              </a>

              {/* Live – gradient accent */}
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 flex items-center justify-center gap-2.5 py-[14px] px-6 rounded-2xl font-bold text-sm text-white relative overflow-hidden transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 50px rgba(99,102,241,0.55), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
              >
                {/* shine sweep */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", transform: "skewX(-20deg)" }}
                />
                <ExternalIcon />
                {isCatalog ? "Ver catálogo" : "Ver sitio web"}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
