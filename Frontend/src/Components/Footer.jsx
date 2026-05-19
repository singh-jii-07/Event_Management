import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube,
} from "react-icons/fa";
import { FiZap, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/event", label: "All Events" },
  { to: "/about", label: "About Us" },
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Sign Up" },
];

const supportLinks = [
  { label: "Help Center" },
  { label: "Privacy Policy" },
  { label: "Terms & Conditions" },
  { label: "Contact Us" },
  { label: "Cookie Policy" },
];

const categories = [
  { label: "Music & Concerts" },
  { label: "Tech & Innovation" },
  { label: "Sports & Fitness" },
  { label: "Food & Culinary" },
  { label: "Art & Culture" },
];

const socialLinks = [
  { Icon: FaFacebook, color: "#1877F2", href: "#" },
  { Icon: FaInstagram, color: "#E1306C", href: "#" },
  { Icon: FaTwitter, color: "#1DA1F2", href: "#" },
  { Icon: FaLinkedin, color: "#0A66C2", href: "#" },
  { Icon: FaYoutube, color: "#FF0000", href: "#" },
];

function Footer() {
  return (
    <footer
      style={{
        background: "#080E1A",
        borderTop: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      {/* Main footer content */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
              >
                <FiZap className="text-white text-base" />
              </div>
              <span
                className="text-xl font-black"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                <span className="gradient-text">Event</span>
                <span className="text-white">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The premier platform to discover, manage, and book amazing events.
              Join thousands of event-goers and organizers worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, color, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.2, color }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 transition-all duration-200"
                  style={{ background: "rgba(30,41,59,0.6)" }}
                >
                  <Icon className="text-base" />
                </motion.a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiMail className="text-purple-400 flex-shrink-0" />
                <span>support@eventhub.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiPhone className="text-cyan-400 flex-shrink-0" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiMapPin className="text-amber-400 flex-shrink-0" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: "linear-gradient(180deg, #7C3AED, #06B6D4)" }}
              />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: "linear-gradient(180deg, #06B6D4, #7C3AED)" }}
              />
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map(({ label }) => (
                <li key={label}>
                  <span className="text-slate-400 text-sm hover:text-white transition-colors duration-200 flex items-center gap-2 group cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: "linear-gradient(180deg, #F59E0B, #7C3AED)" }}
              />
              Stay Updated
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to get the latest events delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-dark text-sm py-2.5"
              />
              <button className="btn-primary w-full text-sm py-2.5">
                Subscribe Now
              </button>
            </div>

            {/* Support */}
            <div className="mt-6">
              <h4 className="text-slate-300 font-semibold text-sm mb-3">Support</h4>
              <ul className="space-y-2">
                {supportLinks.map(({ label }) => (
                  <li key={label}>
                    <span className="text-slate-500 text-xs hover:text-slate-300 cursor-pointer transition-colors">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="divider-gradient" />

      {/* Bottom Bar */}
      <div className="section-container py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="gradient-text font-semibold">EventHub</span>. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
