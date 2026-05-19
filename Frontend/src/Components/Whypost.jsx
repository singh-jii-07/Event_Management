import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import SectionTitle from "./ui/SectionTitle";

const features = [
  "Easy event creation with date, time and location",
  "Reach more users and promote your events online",
  "Secure and simple event booking system",
  "Track registrations and manage attendees easily",
  "Get real-time updates of bookings and event status",
  "Custom event pages with rich descriptions",
];

function WhyPost() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#0F172A" }}>
      {/* BG gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 0% 50%, rgba(124,58,237,0.12) 0px, transparent 60%)",
        }}
      />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 0 0 1px rgba(124,58,237,0.3), 0 30px 80px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700"
                alt="Event platform"
                className="w-full h-[420px] object-cover"
              />
              {/* Image overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-5 -right-5 glass rounded-2xl px-5 py-4 shadow-glow"
            >
              <p className="text-2xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
                5K+
              </p>
              <p className="text-xs text-slate-400">Events hosted</p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionTitle
              tag="Why Us?"
              title="Why Create an Event"
              highlight="on EventHub?"
              subtitle="Join thousands of successful event organizers who trust EventHub to reach their audience and manage bookings effortlessly."
              centered={false}
            />

            <ul className="space-y-4">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}
                  >
                    <FiCheck className="text-purple-400 text-xs" />
                  </div>
                  <span className="text-slate-300 text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex gap-4"
            >
              <a href="/create" className="btn-primary">
                Start Creating
              </a>
              <a href="/about" className="btn-secondary">
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyPost;
