import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

export default function ProjectCard({ project, index = 0 }) {
  const linkUrl = project.webUrl || project.catalogUrl || "#";
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const enableHoverEffects = !(prefersReducedMotion || isMobile);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group relative"
      onHoverStart={enableHoverEffects ? () => setHovered(true) : undefined}
      onHoverEnd={enableHoverEffects ? () => setHovered(false) : undefined}
    >

      <motion.a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="card-glow block bg-surface/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 relative"
        whileHover={enableHoverEffects ? { y: -8 } : undefined}
        whileTap={{ scale: 0.98 }}
      >
        {/* Imagen / logo */}
        <div className="relative aspect-video overflow-hidden bg-[#0D0D1A] flex items-center justify-center p-8">
          {/* Efecto shine al hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none"
            initial={{ x: "-100%" }}
            animate={
              enableHoverEffects && hovered
                ? { x: "200%" }
                : { x: "-100%" }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          <motion.img
            src={project.image}
            alt={`Logo ${project.name}`}
            loading="lazy"
            decoding="async"
            className="w-4/5 h-4/5 object-contain relative z-10 drop-shadow-2xl"
            animate={
              enableHoverEffects && hovered
                ? { scale: 1.08, filter: "drop-shadow(0 0 20px rgba(59,130,246,0.5))" }
                : { scale: 1, filter: "drop-shadow(0 0 0px transparent)" }
            }
            transition={{ duration: 0.4 }}
          />

          {/* Overlay bottom */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
            animate={{ opacity: enableHoverEffects && hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* CTA al hover */}
          <motion.span
            className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-accent to-cyan-dark text-white text-xs font-bold rounded-lg z-20 shadow-xl"
            animate={{
              opacity: enableHoverEffects && hovered ? 1 : 0,
              y: enableHoverEffects && hovered ? 0 : 10,
            }}
            transition={{ duration: 0.25 }}
          >
            {project.catalogUrl ? "Ver catálogo →" : "Ver sitio →"}
          </motion.span>
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6 border-t border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-300 truncate">
                {project.name}
              </h3>
              <p className="mt-1 text-text-secondary text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {project.desc}
              </p>
            </div>
            {/* Icono externo */}
            <motion.div
              className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent"
              animate={hovered ? { backgroundColor: "rgba(59,130,246,0.25)", borderColor: "rgba(59,130,246,0.5)" }
                                : {}}
              transition={{ duration: 0.25 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                  tag === "Catálogo"
                    ? "bg-cyan/15 text-cyan border-cyan/25"
                    : "bg-accent/15 text-accent border-accent/25"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.article>
  );
}
