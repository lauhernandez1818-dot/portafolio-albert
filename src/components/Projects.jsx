import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 md:py-36 px-4 sm:px-6 relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header de sección */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-accent/60" />
            <span className="text-accent text-xs font-bold uppercase tracking-[4px]">Portafolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-text-primary">Trabajo</span>
            <br />
            <span className="gradient-text">que habla solo</span>
          </h2>
          <p className="mt-6 text-text-secondary text-sm sm:text-base max-w-lg">
            Cada proyecto tiene una historia. Estos son los sitios que he construido para empresas reales en Venezuela.
          </p>
        </motion.div>

        {/* Grid de proyectos */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
