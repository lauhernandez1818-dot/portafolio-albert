import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

const roles = ["Desarrollador Web", "Front-end Developer", "Creador de Sitios", "React Developer"];
const techStack = ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Supabase", "Firebase", "Backend"];

/* ── Typewriter ── */
function Typewriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed === current) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
      return;
    }
    const speed = deleting ? 40 : 75;
    const t = setTimeout(() => {
      setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, texts]);

  return (
    <span>
      {displayed}
      <span className="border-r-2 border-cyan-400 ml-0.5 animate-pulse"> </span>
    </span>
  );
}

/* ── Stats ── */
const stats = [
  { value: "8+", label: "Meses", sub: "de experiencia" },
  { value: "4",  label: "Proyectos", sub: "lanzados" },
  { value: "2",  label: "Ciudades", sub: "VE" },
];

/* ── Static stars (plain divs — no framer-motion per star) ── */
const STARS_DESKTOP = Array.from({ length: 20 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.5 + 0.08,
}));
const STARS_MOBILE = Array.from({ length: 8 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.25 + 0.05,
}));

export default function Hero() {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const fx = !prefersReducedMotion && !isMobile;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);
  }, []);

  const STARS = isDesktop ? STARS_DESKTOP : STARS_MOBILE;

  const transition = isMobile 
    ? { duration: 0.3, ease: "easeOut" }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="min-h-screen min-h-[100dvh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-6 pt-20 sm:pt-24 pb-40 sm:pb-32 relative overflow-hidden will-change-transform"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070711] via-transparent to-[#070711] pointer-events-none" />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STARS.map((star) => (
          <div key={star.id} className="absolute rounded-full bg-white"
            style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, opacity: star.opacity }} />
        ))}
      </div>

      {/* Orbs */}
      <motion.div className="absolute top-1/4 right-0 w-[35rem] h-[35rem] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", opacity: 0.28 }}
        animate={prefersReducedMotion || isMobile ? { opacity: 0.15, scale: 1 } : { scale: [1, 1.15, 1], opacity: [0.22, 0.38, 0.22] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />

      <motion.div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", opacity: 0.22 }}
        animate={prefersReducedMotion || isMobile ? { opacity: 0.12, scale: 1 } : { scale: [1, 1.2, 1], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }} />

      <motion.div className="absolute top-1/3 left-1/3 w-[18rem] h-[18rem] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)", opacity: 0.15 }}
        animate={prefersReducedMotion || isMobile ? { opacity: 0.1, scale: 1 } : { scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
      {/* ══ TEXT COLUMN ══ */}
      <motion.div
        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="flex-1 max-w-2xl relative z-10 order-2 lg:order-1"
      >
        {/* Availability badge */}
        <motion.div
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 text-xs font-bold"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(34,197,94,0.3)",
            color: "rgb(74,222,128)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Disponible para proyectos
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.04] tracking-tight">
          Hola, soy
          <br />
          <span className="gradient-text">Albert Rodriguez</span>
        </h1>

        <div className="section-line my-6 w-48" />

        {/* Tagline */}
        <motion.p
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.4 }}
          className="text-base sm:text-lg text-white/55 max-w-lg leading-relaxed"
        >
          Desarrollo web moderno. Interfaces rápidas, código limpio y{" "}
          <span className="text-cyan-400 font-semibold">experiencias de alto impacto</span>.
        </motion.p>

        {/* Mini stats */}
        <motion.div
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.52 }}
          className="flex gap-6 mt-8"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black gradient-text">{s.value}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Tech stack pills */}
        <motion.div
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.62 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.68 + i * 0.055 }}
              whileHover={fx ? { scale: 1.12, y: -3, boxShadow: "0 0 20px rgba(34,211,238,0.3)" } : undefined}
              className="px-3 py-1.5 text-xs font-semibold rounded-full cursor-default"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(34,211,238,0.25)",
                color: "rgba(34,211,238,0.9)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.82 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.a
            href="#proyectos"
            className="btn-glow inline-flex items-center gap-2.5 px-7 py-3.5 text-white font-bold rounded-xl text-sm sm:text-base"
            whileTap={{ scale: 0.97 }}
          >
            Ver mis proyectos
            {!prefersReducedMotion && !isMobile && (
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span>
            )}
            {(prefersReducedMotion || isMobile) && <span>→</span>}
          </motion.a>
          <motion.a
            href="#contacto"
            whileHover={fx ? { scale: 1.04, boxShadow: "0 0 28px rgba(139,92,246,0.3)" } : undefined}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl text-sm sm:text-base transition-all duration-300"
            style={{
              border: "1px solid rgba(139,92,246,0.4)",
              color: "rgba(255,255,255,0.8)",
              background: "rgba(139,92,246,0.08)",
            }}
          >
            Contáctame
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ══ IMAGE COLUMN ══ */}
      <motion.div
        initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.9, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ ...transition, delay: 0.2 }}
        className="flex-1 flex justify-center lg:justify-end relative z-10 order-1 lg:order-2 w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <motion.div
          className="relative"
          style={isMobile ? { transform: "scale(1.12)", transformOrigin: "center center" } : undefined}
          animate={fx ? { y: [0, -12, 0] } : { y: 0 }}
          transition={fx ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          {/* Glow ring behind image */}
          <div className="absolute -inset-6 rounded-3xl opacity-55"
            style={{ background: "conic-gradient(from 0deg, #6366f1, #8B5CF6, #22D3EE, #6366f1)", filter: "blur(44px)" }} />

          <img
            src="/inicio.webp"
            alt="Albert Rodriguez"
            fetchpriority="high"
            decoding="sync"
            className="relative w-full rounded-2xl border border-white/10 shadow-2xl object-contain"
          />

          {/* Location chip */}
          <motion.div
            className="absolute right-3 bottom-4 flex items-center gap-2 px-3 py-2 rounded-xl border shadow-lg"
            style={{ background: "rgba(7,7,17,0.85)", backdropFilter: "blur(12px)", borderColor: "rgba(99,102,241,0.3)" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-xs text-white/80 font-semibold whitespace-nowrap">La Guaira · Caracas</span>
          </motion.div>

          {/* Projects done chip */}
          <motion.div
            className="absolute left-3 top-4 flex items-center gap-2 px-3 py-2 rounded-xl border shadow-lg"
            style={{ background: "rgba(7,7,17,0.85)", backdropFilter: "blur(12px)", borderColor: "rgba(34,211,238,0.25)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
          >
            <span className="text-base">🚀</span>
            <span className="text-xs text-white/80 font-semibold">4 sitios lanzados</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#proyectos"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-4 sm:bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center gap-3 z-10"
      >
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-[10px] text-white/40 uppercase text-center"
          style={{ letterSpacing: "0.3em" }}
        >
          Descubre mi trabajo
        </motion.p>
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.svg key={i} width="18" height="11" viewBox="0 0 20 12" fill="none"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.18 }}>
              <path d="M1 1L10 10L19 1" stroke="url(#chev)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="chev" x1="0" y1="0" x2="20" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </motion.svg>
          ))}
        </div>
        <motion.div className="w-px h-8 bg-gradient-to-b from-indigo-500/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
          style={{ transformOrigin: "top" }} />
      </motion.a>
    </section>
  );
}
