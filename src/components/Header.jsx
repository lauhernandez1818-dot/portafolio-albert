import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "inicio", label: "Inicio" },
  { href: "proyectos", label: "Proyectos" },
  { href: "sobre-mi", label: "Sobre mí" },
  { href: "contacto", label: "Contacto" },
];

function scrollToSection(id) {
  if (id === "inicio") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(id), 50);
  };

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

        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleNav("inicio"); }}
          className="text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity"
        >
          <span className="gradient-text">Albert Rodriguez</span>
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.href} className="group">
              <a
                href={`#${link.href}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="relative text-text-secondary hover:text-accent transition-colors duration-300 py-2 block"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-cyan group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); handleNav("contacto"); }}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-accent to-cyan-dark rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
          Contrátame
        </a>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 -mr-2 text-text-primary rounded-lg hover:bg-surface/50 active:bg-surface/70 transition-colors relative z-50"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6 transition-transform duration-200"
            style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menú mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-surface/95 backdrop-blur-md border-t border-accent/10 relative z-[60] overflow-hidden"
            style={{ touchAction: "manipulation" }}
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="px-4 pt-3 pb-2 flex flex-col gap-0"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 + i * 0.03 }}
                >
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="block w-full text-left py-4 px-4 min-h-[44px] flex items-center rounded-lg text-text-secondary hover:text-accent active:bg-accent/20 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="px-4 pb-4"
            >
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); handleNav("contacto"); }}
                className="block w-full flex items-center justify-center gap-2 py-4 min-h-[48px] text-sm font-bold text-white bg-gradient-to-r from-accent to-cyan-dark rounded-xl active:opacity-90 transition-opacity"
              >
                <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
                Contrátame
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
