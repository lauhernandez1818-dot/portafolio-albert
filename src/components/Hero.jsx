import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const roles = ["Desarrollador web", "Creador de sitios", "Front-end Dev"];
const techStack = ["HTML", "CSS", "JavaScript", "React", "Tailwind", "Supabase", "Firebase", "Backend"];

function Typewriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && displayed === current) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
      return;
    }
    const speed = deleting ? 45 : 80;
    const t = setTimeout(() => {
      setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, texts]);

  return (
    <span>
      {displayed}
      <span className="border-r-2 border-cyan ml-0.5 animate-pulse"> </span>
    </span>
  );
}

const stats = [
  { value: "8+", label: "meses" },
  { value: "4", label: "proyectos" },
  { value: "2", label: "ciudades" },
];

// Estrella individual con su propio parallax
function Star({ star, mouseX, mouseY }) {
  const range = star.depth * 7;
  const sx = useTransform(mouseX, [-1, 1], [-range, range]);
  const sy = useTransform(mouseY, [-1, 1], [-range, range]);

  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: star.size,
        height: star.size,
        opacity: star.opacity,
        x: sx,
        y: sy,
      }}
    />
  );
}

// Estrellas: 40 en desktop, 20 en mobile
const STARS_DESKTOP = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.5 + 0.1,
  depth: Math.random() * 0.8 + 0.2,
}));
const STARS_MOBILE = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5,
  opacity: Math.random() * 0.3 + 0.05,
  depth: 0,
}));

export default function Hero() {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);
  }, []);

  const STARS = isDesktop ? STARS_DESKTOP : STARS_MOBILE;

  // Valores crudos del mouse
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Suavizados tipo agua
  const mouseX = useSpring(rawX, { stiffness: 35, damping: 18 });
  const mouseY = useSpring(rawY, { stiffness: 35, damping: 18 });

  // Orbes
  const orb1X = useTransform(mouseX, [-1, 1], ["-5%", "5%"]);
  const orb1Y = useTransform(mouseY, [-1, 1], ["-5%", "5%"]);
  const orb2X = useTransform(mouseX, [-1, 1], ["8%", "-8%"]);
  const orb2Y = useTransform(mouseY, [-1, 1], ["8%", "-8%"]);
  const orb3X = useTransform(mouseX, [-1, 1], ["-12%", "12%"]);
  const orb3Y = useTransform(mouseY, [-1, 1], ["-12%", "12%"]);
  const gridX = useTransform(mouseX, [-1, 1], ["-1.5%", "1.5%"]);
  const gridY = useTransform(mouseY, [-1, 1], ["-1.5%", "1.5%"]);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) / (rect.width / 2));
      rawY.set((e.clientY - cy) / (rect.height / 2));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY, isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="min-h-screen min-h-[100dvh] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4 sm:px-6 pt-20 sm:pt-24 pb-40 sm:pb-32 relative overflow-hidden"
    >
      {/* Grid con parallax */}
      <motion.div
        className="absolute inset-0 bg-grid pointer-events-none"
        style={{ x: gridX, y: gridY }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Estrellas con parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STARS.map((star) => (
          <Star key={star.id} star={star} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Orbe azul */}
      <motion.div
        className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          x: orb1X,
          y: orb1Y,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Orbe morado */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-[28rem] h-[28rem] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          x: orb2X,
          y: orb2Y,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Orbe cyan */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[16rem] h-[16rem] rounded-full blur-[90px] pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, #22D3EE 0%, transparent 70%)",
          x: orb3X,
          y: orb3Y,
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* ── TEXTO ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 max-w-2xl relative z-10 order-2 lg:order-1"
      >
        <div className="mb-4 h-7 flex items-center">
          <span className="text-accent text-sm sm:text-base font-semibold uppercase tracking-widest">
            <Typewriter texts={roles} />
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-primary leading-[1.05] tracking-tight">
          Hola, soy
          <br />
          <span className="gradient-text">Albert Rodriguez</span>
        </h1>

        <div className="section-line my-6 w-48" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg text-text-secondary max-w-lg leading-relaxed"
        >
          Convierto ideas en sitios web que{" "}
          <span className="text-text-primary font-semibold">funcionan, se ven bien</span>
          {" "}y{" "}
          <span className="text-cyan font-semibold">generan resultados</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex gap-6 mt-8"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black gradient-text">{s.value}</span>
              <span className="text-xs text-text-secondary uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.06 }}
              whileHover={{ scale: 1.1, y: -3, boxShadow: "0 0 20px rgba(34,211,238,0.25)" }}
              className="px-3 py-1.5 text-xs font-semibold bg-surface/80 text-cyan rounded-full border border-cyan/30 backdrop-blur-sm cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.a
            href="#proyectos"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-cyan-dark text-white font-bold rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.35)] text-sm sm:text-base"
          >
            Ver proyectos
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(167,139,250,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple/50 hover:border-purple text-text-primary font-semibold rounded-xl backdrop-blur-sm text-sm sm:text-base transition-colors"
          >
            Contactar
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── IMAGEN ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex justify-center lg:justify-end relative z-10 order-1 lg:order-2 w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -inset-6 rounded-3xl opacity-50"
               style={{ background: "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #22D3EE, #3B82F6)", filter: "blur(40px)" }} />
          <motion.img
            src="/inicio.webp"
            alt="Albert Rodriguez"
            className="relative w-full rounded-2xl border border-white/10 shadow-2xl object-contain"
            style={{ imageRendering: "pixelated" }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -right-2 bottom-4 sm:right-4 sm:bottom-6 flex items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-md rounded-xl border border-accent/30 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse flex-shrink-0" />
            <span className="text-xs text-text-primary font-semibold whitespace-nowrap">La Guaira · Caracas</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.a
        href="#proyectos"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-4 sm:bottom-8 left-0 right-0 mx-auto w-fit flex flex-col items-center gap-3 z-10 lg:bottom-8"
      >
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="text-xs text-text-secondary/60 uppercase text-center"
          style={{ letterSpacing: "0.3em" }}
        >
          descubre mi trabajo
        </motion.p>

        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.svg
              key={i}
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.18 }}
            >
              <path
                d="M1 1L10 10L19 1"
                stroke="url(#chev)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="chev" x1="0" y1="0" x2="20" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
            </motion.svg>
          ))}
        </div>

        <motion.div
          className="w-px h-8 bg-gradient-to-b from-cyan/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
          style={{ transformOrigin: "top" }}
        />
      </motion.a>
    </section>
  );
}
