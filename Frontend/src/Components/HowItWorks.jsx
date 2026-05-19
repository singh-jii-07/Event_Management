import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiTag, FiCheckCircle } from "react-icons/fi";
import SectionTitle from "./ui/SectionTitle";

const steps = [
  {
    number: "01",
    icon: FiSearch,
    title: "Browse Events",
    description:
      "Explore thousands of upcoming concerts, tech meetups, workshops, and fun activities near you using our smart discovery tools.",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    number: "02",
    icon: FiTag,
    title: "Book Your Seat",
    description:
      "Reserve your spot with a single click. No hassle, no complexity — just seamless booking with instant confirmation.",
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    number: "03",
    icon: FiCheckCircle,
    title: "Manage & Enjoy",
    description:
      "View your bookings, track event details, and manage everything from your personal dashboard anytime.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#080E1A" }}>
      {/* Subtle bg accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #7C3AED44, #06B6D444, transparent)",
        }}
      />

      <div className="section-container">
        <SectionTitle
          tag="Simple Process"
          title="How It"
          highlight="Works"
          subtitle="Getting started with EventHub is incredibly simple. Three steps and you're ready to experience amazing events."
        />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-px"
            style={{
              background: "linear-gradient(90deg, #7C3AED44, #06B6D444)",
              top: "56px",
            }}
          />

          {steps.map(({ number, icon: Icon, title, description, color, glow }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div
                className="rounded-2xl p-8 text-center transition-all duration-300 h-full"
                style={{
                  background: "#111827",
                  border: "1px solid rgba(30,41,59,0.8)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color + "44";
                  e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${glow}`;
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Step number badge */}
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: color + "22",
                    color,
                    border: `1px solid ${color}44`,
                  }}
                >
                  Step {number}
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-2"
                  style={{
                    background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                    boxShadow: `0 0 0 1px ${color}33`,
                  }}
                >
                  <Icon style={{ color, fontSize: "28px" }} />
                </div>

                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
