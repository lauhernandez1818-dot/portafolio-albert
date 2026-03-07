import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

const socialLinks = [
  { name: "WhatsApp", href: "https://wa.me/584129983853", icon: "whatsapp" },
  { name: "GitHub", href: "https://github.com/lauhernandez1818-dot", icon: "github" },
];

const perks = [
  { icon: "⚡", text: "Respuesta en menos de 24h" },
  { icon: "🎯", text: "Proyectos a medida, sin plantillas genéricas" },
  { icon: "📱", text: "Diseño responsive desde el primer día" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "albertjavier.trabajo@gmail.com";
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contacto" className="py-24 md:py-36 px-4 sm:px-6 relative overflow-hidden">
      {/* Fondo */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #22D3EE, #3B82F6)" }}
        animate={
          prefersReducedMotion || isMobile
            ? { rotate: 0 }
            : { rotate: [0, 360] }
        }
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/60" />
            <span className="text-cyan text-xs font-bold uppercase tracking-[4px]">Hablemos</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-text-primary">¿Tienes un proyecto?</span>
            <br />
            <span className="gradient-text">Hagámoslo realidad.</span>
          </h2>
          <p className="mt-6 text-text-secondary text-sm sm:text-base max-w-xl mx-auto">
            No esperes más. Cada día sin un sitio web es un cliente que no te conoce.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {perks.map((p, i) => (
            <motion.div
              key={p.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 px-4 py-3 bg-surface/50 border border-white/5 rounded-xl backdrop-blur-sm text-sm text-text-secondary"
            >
              <span className="text-lg">{p.icon}</span>
              <span>{p.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Card central */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-6 sm:p-8 bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl">
            {/* Borde degradado */}
            <div className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                 style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.3), transparent 50%, rgba(34,211,238,0.2))" }} />

            <p className="text-center text-text-secondary text-sm mb-6">Escríbeme directamente:</p>

            {/* Email copy */}
            <motion.button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-background/60 border border-accent/20 hover:border-cyan/50 rounded-xl text-sm font-medium transition-all duration-300 group"
              whileHover={{ boxShadow: "0 0 30px rgba(34,211,238,0.15)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-text-primary truncate">{email}</span>
              </div>
              <motion.span
                className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  copied ? "bg-emerald/20 text-emerald" : "bg-cyan/20 text-cyan"
                }`}
                animate={copied ? { scale: [1, 1.15, 1] } : {}}
              >
                {copied ? "✓ Copiado" : "Copiar"}
              </motion.span>
            </motion.button>

            <div className="flex items-center gap-4 mt-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-text-secondary/40 text-xs">o</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 py-3 bg-background/60 border rounded-xl text-sm font-semibold transition-all duration-300 ${
                    link.icon === "whatsapp"
                      ? "border-green-500/20 text-green-400 hover:border-green-500/50 hover:text-green-300"
                      : "border-white/5 text-text-secondary hover:border-accent/40 hover:text-accent"
                  }`}
                  whileHover={{
                    y: -3,
                    boxShadow: link.icon === "whatsapp"
                      ? "0 10px 30px -10px rgba(34,197,94,0.25)"
                      : "0 10px 30px -10px rgba(59,130,246,0.2)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {link.icon === "whatsapp" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  )}
                  {link.icon === "github" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
