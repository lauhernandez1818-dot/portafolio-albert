import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

const skills = [
  { name: "HTML & CSS", level: 90 },
  { name: "JavaScript", level: 75 },
  { name: "React", level: 70 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Supabase", level: 70 },
  { name: "Firebase", level: 65 },
  { name: "Backend & APIs", level: 60 },
];

const highlights = [
  { num: "8+", label: "Meses", sub: "de experiencia activa" },
  { num: "4", label: "Proyectos", sub: "entregados al cliente" },
  { num: "2", label: "Ciudades", sub: "La Guaira · Caracas" },
];

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">{name}</span>
        <motion.span
          className="text-xs font-bold text-cyan tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.8 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-surface/80 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent via-cyan to-purple"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="sobre-mi" className="py-24 md:py-36 px-4 sm:px-6 relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/5 to-transparent pointer-events-none" />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)" }}
        animate={
          prefersReducedMotion || isMobile
            ? { opacity: 0.15 }
            : { opacity: [0.1, 0.2, 0.1] }
        }
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
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-accent/60" />
            <span className="text-accent text-xs font-bold uppercase tracking-[4px]">Sobre mí</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-text-primary">El dev</span>
            <br />
            <span className="gradient-text">detrás del código</span>
          </h2>
          <h3 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-text-secondary/80">
            Conóceme —{" "}
            <span className="text-text-primary font-bold">Albert Rodriguez</span>
          </h3>
        </motion.div>

        {/* Stats fila */}
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
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(59,130,246,0.2)" }}
              className="p-4 sm:p-6 bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl text-center transition-all duration-300"
            >
              <span className="block text-2xl sm:text-4xl font-black gradient-text">{item.num}</span>
              <span className="block text-sm sm:text-base font-bold text-text-primary mt-1">{item.label}</span>
              <span className="block text-xs text-text-secondary mt-0.5">{item.sub}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Layout: foto + texto + skills */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -inset-3 rounded-2xl opacity-60"
                   style={{ background: "conic-gradient(from 180deg, #3B82F6, #8B5CF6, #22D3EE, #3B82F6)", filter: "blur(20px)" }} />
              <img
                src="/Albert.webp"
                alt="Albert Rodriguez programando"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.onerror = null; e.target.src = "/Albert.png"; }}
                className="relative w-56 sm:w-64 md:w-72 rounded-2xl border border-white/10 shadow-2xl object-cover"
              />
              {/* Badge disponible */}
              <motion.div
                className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-emerald/20 border border-emerald/40 rounded-full backdrop-blur-sm"
                animate={
                  prefersReducedMotion || isMobile
                    ? { scale: 1 }
                    : { scale: [1, 1.05, 1] }
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span className="text-[10px] font-bold text-emerald uppercase tracking-wider">Disponible</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Texto + Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full"
          >
            <p className="text-text-primary font-semibold text-base sm:text-lg leading-relaxed mb-4">
              Desarrollador enfocado en crear{" "}
              <span className="gradient-text">experiencias web con propósito.</span>
            </p>
            <p className="text-text-secondary leading-relaxed mb-4 text-sm sm:text-base">
              En estos 8 meses he ayudado a empresas de logística y servicios a digitalizarse,
              integrando interfaces atractivas con{" "}
              <span className="text-accent font-medium">backends robustos</span> y{" "}
              <span className="text-cyan font-medium">APIs eficientes</span>.
            </p>
            <p className="text-text-secondary leading-relaxed mb-10 text-sm sm:text-base">
              No solo construyo sitios web, conecto{" "}
              <span className="text-text-primary font-medium">marcas con sus usuarios</span>
              {" "}a través de tecnología y diseño.
            </p>

            {/* Barras de habilidades */}
            <div className="space-y-5">
              <p className="text-xs font-bold text-text-secondary/70 uppercase tracking-[3px] mb-6">Nivel de habilidades</p>
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
