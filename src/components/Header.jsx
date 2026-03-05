import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg shadow-accent/5 border-b border-accent/10"
          : "bg-background/80 backdrop-blur-md border-b border-surface"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <motion.a
          href="#inicio"
          className="text-lg sm:text-xl font-bold text-text-primary hover:opacity-80 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="gradient-text">Albert Rodriguez</span>
        </motion.a>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, i) => (
            <li key={link.href} className="group">
              <motion.a
                href={link.href}
                className="relative text-text-secondary hover:text-accent transition-colors duration-300 py-2 block"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan group-hover:w-full transition-all duration-300" />
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <motion.a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-accent to-cyan-dark rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
          Contrátame
        </motion.a>

        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 -mr-2 text-text-primary rounded-lg hover:bg-surface/50 transition-colors"
          aria-label="Menú"
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </motion.button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface/80 backdrop-blur-sm border-t border-accent/10 overflow-hidden"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg text-text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
