import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SplashScreenProps = {
  onFinish?: () => void;
  minimumDurationMs?: number;
};

// Fullscreen splash with brand-centric reveal animation
const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, minimumDurationMs = 2200 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent background scroll while splash is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Ensure we show at least a minimum duration and also await window load if still loading
    const minTimer = setTimeout(() => {
      // Once minimum time elapsed, allow exit
      setIsVisible(false);
    }, minimumDurationMs);

    const handleLoad = () => {
      // If the page loads quickly, we still respect the minimum duration via timer above
    };
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = originalOverflow;
    };
  }, [minimumDurationMs]);

  const handleExitComplete = () => {
    if (onFinish) onFinish();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Dynamic gradient aura */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-1 blur-3xl"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(1200px 600px at 50% 60%, rgba(0, 155, 255, 0.20), transparent 60%), radial-gradient(900px 500px at 50% 40%, rgba(255, 255, 255, 0.10), transparent 60%)",
            }}
          />

          {/* Grain overlay for cinematic texture */}
          <div aria-hidden className="pointer-events-none absolute inset-0 splash-noise opacity-[0.08] mix-blend-screen" />

          {/* Central logo + tagline container */}
          <motion.div
            className="relative flex flex-col items-center gap-4 px-6 text-center"
            initial={{ scale: 0.96, opacity: 0, filter: "blur(6px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-full overflow-hidden w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 ring-1 ring-white/10 shadow-[0_0_60px_rgba(0,155,255,0.25)]">
              <img
                src="/inicioPrincipal4.webp"
                alt="Ferradas Automotores"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
              {/* Shine sweep over circular reveal */}
              <span className="pointer-events-none absolute inset-0 block splash-shine" />
            </div>
            <motion.p
              className="font-black tracking-[0.2em] text-xs text-white/80 sm:text-sm md:text-base"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              PERFORMANCE • CONFIANZA • EXCELENCIA
            </motion.p>
          </motion.div>

          {/* Split shutter panels (top/bottom) */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 bg-neutral-950/95"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-neutral-950/95"
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

