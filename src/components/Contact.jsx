import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";

const socialLinks = [
  // Usamos la variable de entorno para WhatsApp
  { name: "WhatsApp", href: import.meta.env.VITE_WHATSAPP || "#", icon: "whatsapp" },
  { name: "GitHub",   href: "https://github.com/lauhernandez1818-dot", icon: "github" },
];

const perks = [
  { icon: "⚡", title: "Respuesta rápida", text: "En menos de 24 horas" },
  { icon: "🎯", title: "100% personalizado", text: "Sin plantillas genéricas" },
  { icon: "📱", title: "Responsive",         text: "Desde el primer día" },
  { icon: "🚀", title: "Resultados reales",  text: "Diseño que convierte" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  // Usamos la variable de entorno para el Email
  const email = import.meta.env.VITE_EMAIL || "tu-email-de-respaldo@gmail.com";
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section 
      id="contacto" 
      className="py-24 md:py-36 px-4 sm:px-6 relative overflow-hidden"
      style={{ contain: 'content' }} // Optimización de renderizado para scroll rápido
    >
      {/* Orb giratorio: En móviles se queda estático para ahorrar GPU */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-[0.18]"
        style={{ 
          background: "conic-gradient(from 0deg, #6366f1, #8B5CF6, #22D3EE, #6366f1)",
          willChange: "transform" // Aceleración por hardware
        }}
        animate={prefersReducedMotion || isMobile ? { rotate: 0 } : { rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} // Solo anima cuando es visible
          transition={{ 
            duration: isMobile ? 0.3 : 0.6, // Transición rápida en móviles (Tween)
            type: isMobile ? "tween" : "spring" 
          }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-[4px]">Hablemos</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-white">¿Tienes un proyecto?</span>
            <br />
            <span className="gradient-text">Hagámoslo realidad.</span>
          </h2>
        </motion.div>

        {/* Perks Grid: Optimizado para móviles */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        >
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                delay: isMobile ? 0 : i * 0.08, // Sin delay en móvil para sentirlo más rápido
                duration: 0.3 
              }}
              // Solo habilitamos el hover pesado en Desktop
              whileHover={isMobile ? {} : { y: -4, boxShadow: "0 16px 40px -12px rgba(99,102,241,0.25)" }}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="text-2xl">{p.icon}</span>
              <span className="text-sm font-bold text-white/80">{p.title}</span>
              <span className="text-xs text-white/40 leading-tight">{p.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Carta de contacto principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative p-6 sm:p-8 rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(7,7,17,0.95) 60%)",
              border: isMobile ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(99,102,241,0.15)", // Borde más visible en móvil al no haber shadow
              boxShadow: isMobile ? "none" : "0 30px 80px -20px rgba(99,102,241,0.2)", // Quitamos shadow pesada en Honor X6a
            }}
          >
            {/* Botón de Email optimizado */}
            <motion.button
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(99,102,241,0.18)",
              }}
              whileHover={isMobile ? {} : { boxShadow: "0 0 36px rgba(99,102,241,0.25)", borderColor: "rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/75 truncate">{email}</span>
              </div>
              <motion.span
                className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                  copied ? "bg-green-500/20 text-green-400" : "bg-indigo-500/20 text-indigo-300"
                }`}
                animate={copied ? { scale: [1, 1.15, 1] } : {}}
              >
                {copied ? "✓ Copiado" : "Copiar"}
              </motion.span>
            </motion.button>

            {/* Redes sociales */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold"
                  style={link.icon === "whatsapp"
                    ? { background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "rgb(74,222,128)" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }
                  }
                  whileHover={isMobile ? {} : { y: -3, boxShadow: link.icon === "whatsapp" ? "0 10px 30px -10px rgba(34,197,94,0.3)" : "0 10px 30px -10px rgba(99,102,241,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* ... (SVG icons kept from your original code) */}
                  {link.icon === "whatsapp" && (
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  )}
                  {link.icon === "github" && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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