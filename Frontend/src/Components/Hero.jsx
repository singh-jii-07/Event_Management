import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiMapPin, FiUsers, FiChevronDown } from "react-icons/fi";

const stats = [
  { value: "10K+", label: "Events", icon: FiCalendar },
  { value: "50K+", label: "Users", icon: FiUsers },
  { value: "120+", label: "Cities", icon: FiMapPin },
];

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.25) 0px, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.2) 0px, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(245,158,11,0.1) 0px, transparent 50%)",
          backgroundColor: "#0F172A",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-20"
        style={{ background: "#7C3AED", top: "10%", left: "5%" }}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full blur-3xl opacity-15"
        style={{ background: "#06B6D4", bottom: "15%", right: "10%" }}
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative section-container text-center z-10 py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 badge badge-primary mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          🎉 The Premium Event Platform — Now Available
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-none tracking-tight"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Discover &{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Book
          </span>
          <br />
          <span className="text-white">Amazing</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #F59E0B, #EF4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Events
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
        >
          From intimate workshops to stadium concerts — find, book, and experience
          events that matter. All in one premium platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => navigate("/allevent")}
            className="btn-primary text-base px-8 py-4 gap-2"
          >
            Explore Events
            <FiArrowRight className="text-lg" />
          </button>
          <button
            onClick={() => navigate("/about")}
            className="btn-secondary text-base px-8 py-4"
          >
            Learn More
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {stats.map(({ value, label, icon: Icon }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    i === 0
                      ? "rgba(124,58,237,0.2)"
                      : i === 1
                      ? "rgba(6,182,212,0.2)"
                      : "rgba(245,158,11,0.2)",
                }}
              >
                <Icon
                  className="text-lg"
                  style={{
                    color: i === 0 ? "#A78BFA" : i === 1 ? "#22D3EE" : "#FCD34D",
                  }}
                />
              </div>
              <div className="text-left">
                <p className="text-xl font-black text-white">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-slate-700 ml-6" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <FiChevronDown className="text-lg" />
      </motion.div>
    </section>
  );
}

export default HeroSection;
