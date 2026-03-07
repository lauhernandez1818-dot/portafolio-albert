import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

// level: 'poco' | 'medio' | 'alto'
const skills = [
  { name: "HTML & CSS",    level: "alto"  },
  { name: "JavaScript",    level: "alto"  },
  { name: "React",         level: "alto"  },
  { name: "Tailwind CSS",  level: "alto"  },
  { name: "Supabase",      level: "medio" },
  { name: "Firebase",      level: "medio" },
  { name: "Backend & APIs",level: "medio" },
];

const LEVEL_CONFIG = {
  poco:  { label: "Iniciando", dots: 1, color: "rgba(251,191,36,0.9)",  bg: "rgba(251,191,36,0.10)",  border: "rgba(251,191,36,0.3)"  },
  medio: { label: "Medio",     dots: 2, color: "rgba(34,211,238,0.9)",  bg: "rgba(34,211,238,0.10)",  border: "rgba(34,211,238,0.3)"  },
  alto:  { label: "Alto",      dots: 3, color: "rgba(99,102,241,0.95)", bg: "rgba(99,102,241,0.13)",  border: "rgba(99,102,241,0.38)" },
};

const highlights = [
  { num: "8+", label: "Meses", sub: "de experiencia activa" },
  { num: "4",  label: "Proyectos", sub: "entregados al cliente" },
  { num: "2",  label: "Ciudades",  sub: "La Guaira · Caracas" },
];

/* ── Skill badge component ── */
function SkillBadge({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const cfg = LEVEL_CONFIG[level];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span className="text-sm font-semibold text-white/80">{name}</span>
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((dot) => (
            <motion.span
              key={dot}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: delay + dot * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block w-2.5 h-2.5 rounded-full"
              style={{
                background: dot <= cfg.dots ? cfg.color : "rgba(255,255,255,0.1)",
                boxShadow: dot <= cfg.dots ? `0 0 8px ${cfg.color}` : "none",
              }}
            />
          ))}
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
          {cfg.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="sobre-mi" className="py-24 md:py-36 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent pointer-events-none" />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)" }}
        animate={prefersReducedMotion || isMobile ? { opacity: 0.15 } : { opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/60" />
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-[4px]">Sobre mí</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-white">El dev</span>
            <br />
            <span className="gradient-text">detrás del código</span>
          </h2>
          <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-white/40">
            Conóceme —{" "}
            <span className="text-white/80 font-bold">Albert Rodriguez</span>
          </h3>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-3 sm:gap-6 mb-16"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(99,102,241,0.25)" }}
              className="p-4 sm:p-6 rounded-2xl text-center transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="block text-2xl sm:text-4xl font-black gradient-text">{item.num}</span>
              <span className="block text-sm sm:text-base font-bold text-white/80 mt-1">{item.label}</span>
              <span className="block text-xs text-white/35 mt-0.5">{item.sub}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main layout: photo + text + skills */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <motion.div className="relative" whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <div className="absolute -inset-3 rounded-2xl opacity-55"
                style={{ background: "conic-gradient(from 180deg, #6366f1, #8B5CF6, #22D3EE, #6366f1)", filter: "blur(22px)" }} />
              <img
                src="/Albert.webp"
                alt="Albert Rodriguez programando"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.onerror = null; e.target.src = "/Albert.png"; }}
                className="relative w-56 sm:w-64 md:w-72 rounded-2xl border border-white/10 shadow-2xl object-cover"
              />
              {/* Available badge */}
              <motion.div
                className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)", backdropFilter: "blur(8px)" }}
                animate={prefersReducedMotion || isMobile ? { scale: 1 } : { scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Disponible</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Text + Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full"
          >
            <p className="text-white font-semibold text-base sm:text-lg leading-relaxed mb-4">
              Desarrollador enfocado en crear{" "}
              <span className="gradient-text">experiencias web con propósito.</span>
            </p>
            <p className="text-white/45 leading-relaxed mb-4 text-sm sm:text-base">
              En estos 8 meses he ayudado a empresas de logística y servicios a digitalizarse,
              integrando interfaces atractivas con{" "}
              <span className="text-indigo-400 font-medium">backends robustos</span> y{" "}
              <span className="text-cyan-400 font-medium">APIs eficientes</span>.
            </p>
            <p className="text-white/45 leading-relaxed mb-8 text-sm sm:text-base">
              No solo construyo sitios web, conecto{" "}
              <span className="text-white/80 font-medium">marcas con sus usuarios</span>
              {" "}a través de tecnología y diseño de calidad.
            </p>

            {/* Skills */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[3px] mb-5">Nivel de habilidades</p>
              {skills.map((skill, i) => (
                <SkillBadge key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
