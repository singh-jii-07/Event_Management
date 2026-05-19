import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10000, label: "Events Hosted", suffix: "+", color: "#7C3AED" },
  { value: 50000, label: "Happy Users", suffix: "+", color: "#06B6D4" },
  { value: 120, label: "Cities Covered", suffix: "+", color: "#F59E0B" },
  { value: 98, label: "Satisfaction Rate", suffix: "%", color: "#10B981" },
];

function CounterNumber({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StatsCounter() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1a1040 50%, #0F172A 100%)",
      }}
    >
      {/* BG pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7C3AED 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="section-container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, suffix, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div
                className="text-4xl sm:text-5xl font-black mb-2 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}99)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                <CounterNumber target={value} suffix={suffix} />
              </div>
              <p className="text-slate-400 text-sm font-medium">{label}</p>
              <div
                className="mt-3 h-0.5 w-12 rounded-full mx-auto transition-all duration-300 group-hover:w-20"
                style={{ background: color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsCounter;
