import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "inicio",    label: "Inicio" },
  { href: "proyectos", label: "Proyectos" },
  { href: "sobre-mi",  label: "Sobre mí" },
  { href: "contacto",  label: "Contacto" },
];

function scrollToSection(id) {
  if (id === "inicio") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(7,7,17,0.93)"
          : "rgba(7,7,17,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(99,102,241,0.15)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 8px 40px -12px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleNav("inicio"); }}
          className="text-lg sm:text-xl font-black hover:opacity-80 transition-opacity tracking-tight"
        >
          <span className="gradient-text">Albert</span>
          <span className="text-white/60 font-light"> Rodriguez</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={`#${link.href}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="relative px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 block"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contacto"
          onClick={(e) => { e.preventDefault(); handleNav("contacto"); }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl btn-glow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          Contrátame
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 -mr-2 rounded-lg transition-colors"
          style={{ color: "rgba(255,255,255,0.7)" }}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6 transition-transform duration-200"
            style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(10,10,22,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(99,102,241,0.12)",
            }}
          >
            <ul className="px-4 pt-3 pb-2 flex flex-col gap-0">
              {navLinks.map((link, i) => (
                <motion.li key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.04 + i * 0.03 }}>
                  <a
                    href={`#${link.href}`}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="block w-full py-4 px-4 min-h-[44px] flex items-center rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-4 pb-5 pt-1">
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); handleNav("contacto"); }}
                className="block w-full flex items-center justify-center gap-2 py-4 min-h-[48px] text-sm font-bold text-white rounded-xl btn-glow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                Contrátame
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
