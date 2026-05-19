import React from "react";
import { motion } from "framer-motion";
import {
  FiMusic, FiMonitor, FiActivity, FiCoffee, FiCamera, FiBriefcase,
  FiBook, FiHeart,
} from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";

const categories = [
  { icon: FiMusic, label: "Music", count: "2.4K", color: "#7C3AED", bg: "rgba(124,58,237,0.15)" },
  { icon: FiMonitor, label: "Tech", count: "1.8K", color: "#06B6D4", bg: "rgba(6,182,212,0.15)" },
  { icon: FiActivity, label: "Sports", count: "950", color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  { icon: FiCoffee, label: "Food", count: "1.2K", color: "#EC4899", bg: "rgba(236,72,153,0.15)" },
  { icon: FiCamera, label: "Art", count: "680", color: "#10B981", bg: "rgba(16,185,129,0.15)" },
  { icon: FiBriefcase, label: "Business", count: "740", color: "#6366F1", bg: "rgba(99,102,241,0.15)" },
  { icon: FiBook, label: "Education", count: "530", color: "#F97316", bg: "rgba(249,115,22,0.15)" },
  { icon: FiHeart, label: "Charity", count: "310", color: "#EF4444", bg: "rgba(239,68,68,0.15)" },
];

function EventCategories() {
  return (
    <section className="py-24" style={{ background: "#0F172A" }}>
      <div className="section-container">
        <SectionTitle
          tag="Browse By Type"
          title="Explore"
          highlight="Categories"
          subtitle="Find events that match your passion. From adrenaline-pumping concerts to mind-expanding workshops."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map(({ icon: Icon, label, count, color, bg }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300 group"
              style={{
                background: "#111827",
                border: "1px solid rgba(30,41,59,0.8)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color + "44";
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${color}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: bg }}
              >
                <Icon style={{ color, fontSize: "22px" }} />
              </div>
              <div className="text-center">
                <p className="text-white text-xs font-semibold">{label}</p>
                <p className="text-slate-500 text-xs">{count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventCategories;
