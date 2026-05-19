import React from "react";
import { motion } from "framer-motion";

function SectionTitle({ tag, title, highlight, subtitle, centered = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      {tag && (
        <div
          className={`inline-flex items-center gap-2 badge badge-primary mb-4 ${
            centered ? "mx-auto" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {tag}
        </div>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p
          className={`text-slate-400 text-lg max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full ${
          centered ? "mx-auto" : ""
        }`}
        style={{ background: "linear-gradient(90deg, #7C3AED, #06B6D4)" }}
      />
    </motion.div>
  );
}

export default SectionTitle;
