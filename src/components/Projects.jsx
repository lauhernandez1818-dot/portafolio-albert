import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const processSteps = [
  { num: "01", label: "Consulta",   text: "Entiendo tu negocio" },
  { num: "02", label: "Diseño",     text: "Propuesta visual única" },
  { num: "03", label: "Desarrollo", text: "Código limpio y rápido" },
  { num: "04", label: "Entrega",    text: "Listo para generar clientes" },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="proyectos" className="py-24 md:py-36 px-4 sm:px-6 relative overflow-hidden">
      {/* BG orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
        animate={{ opacity: [0.14, 0.28, 0.14] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-indigo-500/60" />
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-[4px]">Portafolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-white">Trabajo</span>
            <br />
            <span className="gradient-text">que habla solo</span>
          </h2>
          <p className="mt-6 text-white/45 text-sm sm:text-base max-w-lg leading-relaxed">
            Cada proyecto tiene una historia. Estos son los sitios que he construido para empresas reales en Venezuela — funcionales, rápidos y orientados a resultados.
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {/* How I work strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20"
        >
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">
            Cómo trabajo
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px -12px rgba(99,102,241,0.22)" }}
                className="relative flex flex-col gap-2 p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-2xl font-black"
                  style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.5), rgba(34,211,238,0.4))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {step.num}
                </span>
                <span className="text-sm font-bold text-white/80">{step.label}</span>
                <span className="text-xs text-white/35 leading-snug">{step.text}</span>

                {/* connector arrow (not on last) */}
                {i < processSteps.length - 1 && (
                  <div className="hidden sm:block absolute -right-1.5 top-1/2 -translate-y-1/2 text-white/10 text-xs">›</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
