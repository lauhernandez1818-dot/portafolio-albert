import { useEffect, useState } from "react";

// Devuelve true en pantallas pequeñas (por defecto <= 768px)
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return;
    }

    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const update = (event) => {
      setIsMobile(event.matches);
    };

    // Estado inicial
    update(mq);

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

