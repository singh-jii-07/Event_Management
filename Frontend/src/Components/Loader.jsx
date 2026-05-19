import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Loader({ onComplete }) {
  const [phase, setPhase] = useState("entering"); // entering | visible | leaving
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Phase timing
    const visibleTimer = setTimeout(() => setPhase("visible"), 300);
    const leaveTimer = setTimeout(() => setPhase("leaving"), 2200);
    const completeTimer = setTimeout(() => onComplete?.(), 2700);

    return () => {
      clearInterval(interval);
      clearTimeout(visibleTimer);
      clearTimeout(leaveTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "leaving" ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0F172A" }}
        >
          {/* Background mesh */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(at 30% 30%, rgba(124,58,237,0.2) 0px, transparent 60%), radial-gradient(at 70% 70%, rgba(6,182,212,0.15) 0px, transparent 60%)",
            }}
          />

          {/* Outer rotating ring */}
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{
              border: "2px solid transparent",
              background:
                "linear-gradient(#0F172A, #0F172A) padding-box, linear-gradient(135deg, #7C3AED, #06B6D4, #F59E0B, #7C3AED) border-box",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute w-36 h-36 rounded-full"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(#0F172A, #0F172A) padding-box, linear-gradient(315deg, #7C3AED, #06B6D4) border-box",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Center content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Logo icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                boxShadow: "0 0 40px rgba(124,58,237,0.5)",
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(124,58,237,0.4)",
                  "0 0 50px rgba(124,58,237,0.7)",
                  "0 0 20px rgba(124,58,237,0.4)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  fill="white"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Brand name */}
            <div className="flex items-baseline gap-0.5">
              <span
                className="text-4xl font-black tracking-tight"
                style={{
                  fontFamily: "Outfit, sans-serif",
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Event
              </span>
              <span
                className="text-4xl font-black tracking-tight text-white"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Hub
              </span>
            </div>

            <p className="text-slate-400 text-sm tracking-widest uppercase">
              Discover · Book · Experience
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-slate-500 text-xs text-center mt-2">
              {progress < 100 ? "Loading..." : "Ready!"}
            </p>
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? "#7C3AED" : "#06B6D4",
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Loader;
