import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../Components/ui/SectionTitle";
import {
  FiZap, FiShield, FiUsers, FiTrendingUp, FiStar, FiCheck,
  FiArrowRight, FiMapPin, FiCalendar, FiMail,
} from "react-icons/fi";
import FAQ from "../Components/home/FAQ";
import Testimonials from "../Components/home/Testimonials";

// --- Why Choose Us ---
const whyFeatures = [
  { icon: FiZap, title: "Lightning Fast", desc: "Book tickets in under 30 seconds with our streamlined checkout.", color: "#7C3AED" },
  { icon: FiShield, title: "Secure & Reliable", desc: "Your data is protected with enterprise-grade security protocols.", color: "#06B6D4" },
  { icon: FiUsers, title: "Community First", desc: "50K+ happy users discovering events every month on our platform.", color: "#F59E0B" },
  { icon: FiTrendingUp, title: "Always Growing", desc: "New events added daily across 120+ cities worldwide.", color: "#10B981" },
];

// --- Features ---
const features = [
  { title: "Smart Discovery", desc: "Our intelligent recommendation engine helps you find events that match your interests and location perfectly.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", tag: "Discovery" },
  { title: "Instant Booking", desc: "Reserve your spot with one click. Get immediate confirmation and manage all your bookings from one dashboard.", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600", tag: "Booking" },
  { title: "Event Creation", desc: "Powerful tools for organizers to create, promote, and manage events. Reach thousands of interested attendees.", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600", tag: "Organize" },
];

// --- Team ---
const team = [
  { name: "Alex Morgan", role: "CEO & Co-founder", avatar: "https://i.pravatar.cc/100?img=11" },
  { name: "Sarah Chen", role: "Head of Product", avatar: "https://i.pravatar.cc/100?img=12" },
  { name: "Raj Patel", role: "Lead Engineer", avatar: "https://i.pravatar.cc/100?img=13" },
  { name: "Maya Williams", role: "Design Director", avatar: "https://i.pravatar.cc/100?img=14" },
];

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#0F172A" }}>
      {/* Hero */}
      <section className="relative py-28 text-center overflow-hidden" style={{ background: "#080E1A" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0px, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="relative section-container">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 badge badge-primary mb-6">
            <FiZap className="text-purple-400" /> About EventHub
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "Outfit, sans-serif" }}>
            The Future of{" "}
            <span style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Event Discovery
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
            EventHub was built to connect passionate people with unforgettable experiences. We believe everyone deserves to find their next great event.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate("/allevent")} className="btn-primary text-base px-8 py-4">Explore Events <FiArrowRight /></button>
            <button onClick={() => navigate("/signup")} className="btn-secondary text-base px-8 py-4">Join for Free</button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }} />
      </section>

      {/* Why Choose Us */}
      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="section-container">
          <SectionTitle tag="Our Edge" title="Why Choose" highlight="EventHub?" subtitle="We're not just another event platform. We're your gateway to extraordinary experiences." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyFeatures.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center transition-all duration-300"
                style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = color + "44"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${color}22`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: color + "22" }}>
                  <Icon style={{ color, fontSize: "26px" }} />
                </div>
                <h3 className="text-white font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24" style={{ background: "#080E1A" }}>
        <div className="section-container">
          <SectionTitle tag="Platform Features" title="Everything You" highlight="Need" subtitle="A complete suite of features to make your event experience seamless." />
          <div className="space-y-20">
            {features.map(({ title, desc, image, tag }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="badge badge-primary mb-4">{tag}</span>
                  <h3 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{desc}</p>
                  <ul className="space-y-3">
                    {["Fast and intuitive interface", "Works on all devices", "Real-time updates"].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.2)" }}>
                          <FiCheck className="text-purple-400 text-xs" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(124,58,237,0.25), 0 30px 60px rgba(0,0,0,0.4)" }}>
                    <img src={image} alt={title} className="w-full h-72 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="section-container">
          <SectionTitle tag="The Team" title="Meet the" highlight="People" subtitle="The passionate team behind EventHub who make it all possible." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map(({ name, role, avatar }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)"; e.currentTarget.style.transform = "none"; }}>
                <img src={avatar} alt={name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" style={{ border: "3px solid rgba(124,58,237,0.4)" }} />
                <h4 className="text-white font-bold text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{name}</h4>
                <p className="text-slate-500 text-xs mt-1">{role}</p>
                <div className="flex justify-center gap-1 mt-3">
                  {Array(5).fill(0).map((_, j) => <FiStar key={j} className="text-amber-400 text-xs fill-amber-400" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="py-20" style={{ background: "#080E1A" }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl p-12 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.15) 100%)", border: "1px solid rgba(124,58,237,0.3)" }}>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "#7C3AED", transform: "translate(-30%, -30%)" }} />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                Ready to Get Started?<br />
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Join EventHub Today.</span>
              </h2>
              <p className="text-slate-300 mb-8 max-w-lg mx-auto">Create your free account and start discovering amazing events happening around you.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button onClick={() => navigate("/signup")} className="btn-primary text-base px-8 py-4">Create Free Account <FiArrowRight /></button>
                <button onClick={() => navigate("/allevent")} className="btn-secondary text-base px-8 py-4">Browse Events</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
