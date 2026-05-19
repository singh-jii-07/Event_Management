import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function EventHero() {
  return (
    <section className="relative py-24 flex flex-col items-center justify-center text-center overflow-hidden" style={{ background: "#080E1A" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0px, transparent 60%)" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "#7C3AED", top: "-10%", left: "20%" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <div className="relative section-container">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-slate-300 transition-colors"><FiHome className="text-xs" /> Home</Link>
          <FiChevronRight className="text-xs" />
          <span className="text-slate-300">All Events</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
          Explore All{" "}
          <span style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Events</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-slate-400 text-lg max-w-lg mx-auto">
          Discover thousands of events happening near you and around the world.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }} />
    </section>
  );
}

export default EventHero;
