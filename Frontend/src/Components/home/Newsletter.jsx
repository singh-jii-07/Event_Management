import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";

function Newsletter() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#0F172A", borderTop: "1px solid rgba(124,58,237,0.1)", borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0px, transparent 70%)" }} />
      <div className="section-container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 badge badge-secondary mb-5">
            <FiMail className="text-cyan-400 text-sm" /> Newsletter
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            Never Miss an <span style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Amazing Event</span>
          </h2>
          <p className="text-slate-400 mb-8">Get curated event recommendations, exclusive early access, and special offers delivered to your inbox every week.</p>
          <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl" style={{ background: "#111827", border: "1px solid rgba(124,58,237,0.2)" }}>
            <div className="flex-1 flex items-center gap-3 px-4">
              <FiMail className="text-slate-500 flex-shrink-0" />
              <input type="email" placeholder="Enter your email address..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder-slate-500" />
            </div>
            <button className="btn-primary text-sm py-3 px-6 whitespace-nowrap">Subscribe <FiArrowRight /></button>
          </div>
          <p className="text-slate-600 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
        </motion.div>
      </div>
    </section>
  );
}

export default Newsletter;
