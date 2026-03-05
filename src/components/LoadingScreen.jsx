import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const word = "Bienvenido";

const funMessages = [
  "Cargando café virtual...",
  "Compilando genialidad...",
  "Subiendo al servidor del sabor...",
  "Calentando motores...",
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 40;
    const step = (100 / duration) * interval;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(onComplete, 500);
      } else {
        setProgress(Math.min(current, 100));
      }
    }, interval);

    // Rotar mensajes
    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % funMessages.length);
    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-purple/5 to-cyan/10 pointer-events-none" />
      <motion.div
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2), transparent)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Letras */}
      <div className="relative inline-block">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight select-none flex">
          {word.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -30, rotate: -15, scale: 0.4 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.09,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{
                y: -8,
                scale: 1.2,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 },
              }}
              className="inline-block gradient-text cursor-default"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Barra = subrayado */}
        <div className="relative mt-3 h-[3px] w-full bg-surface/50 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-accent via-cyan to-purple rounded-full origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.04 }}
            style={{ boxShadow: "0 0 25px rgba(59,130,246,0.6)" }}
          />
        </div>
      </div>

      {/* Porcentaje + mensaje rotativo */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl font-black gradient-text tabular-nums"
        >
          {Math.round(progress)}%
        </motion.span>

        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-text-secondary/60 text-center"
            >
              {funMessages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
