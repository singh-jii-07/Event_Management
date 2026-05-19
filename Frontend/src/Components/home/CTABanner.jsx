import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function CTABanner() {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#080E1A" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-12 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.2) 50%, rgba(245,158,11,0.15) 100%)",
            border: "1px solid rgba(124,58,237,0.3)",
          }}
        >
          {/* BG orbs */}
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ background: "#7C3AED", transform: "translate(-30%, -30%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ background: "#06B6D4", transform: "translate(30%, 30%)" }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 badge badge-primary mb-6">
              <FiZap className="text-purple-400" />
              Start Today — It's Free
            </div>

            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Ready to Experience
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Amazing Events?
              </span>
            </h2>

            <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8">
              Join 50,000+ event-goers who have already discovered their next
              unforgettable experience on EventHub.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/allevent")}
                className="btn-primary text-base px-8 py-4"
              >
                Browse Events <FiArrowRight className="text-lg" />
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="btn-secondary text-base px-8 py-4"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTABanner;
