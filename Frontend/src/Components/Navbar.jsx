import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu, FiX, FiHome, FiCalendar, FiUser, FiLogOut,
  FiLogIn, FiUserPlus, FiInfo, FiChevronDown, FiZap, FiPlusCircle, FiGrid
} from "react-icons/fi";

const navLinks = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/event", label: "Events", icon: FiCalendar },
  { to: "/about", label: "About", icon: FiInfo },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setUserDropdown(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    setOpen(false);
    setUserDropdown(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-[100]">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #7C3AED, #06B6D4, #F59E0B)",
          }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(15, 23, 42, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(124,58,237,0.15)"
            : "1px solid transparent",
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
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

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                          style={{ background: "linear-gradient(90deg, #7C3AED, #06B6D4)" }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-3">
              {token ? (
                <>
                  {role === "admin" && (
                    <Link
                      to="/create"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-300 hover:text-white rounded-lg hover:bg-purple-500/10 transition-all duration-200"
                    >
                      <FiPlusCircle className="text-base" />
                      Create Event
                    </Link>
                  )}

                  {/* User Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setUserDropdown(!userDropdown)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:bg-white/5"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
                      >
                        <FiUser />
                      </div>
                      <span>Profile</span>
                      <motion.div
                        animate={{ rotate: userDropdown ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="text-slate-400 text-sm" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {userDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden shadow-card"
                          style={{
                            background: "#1E293B",
                            border: "1px solid rgba(124,58,237,0.2)",
                          }}
                        >
                          <Link
                            to="/profilepage"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <FiUser className="text-purple-400" />
                            My Profile
                          </Link>
                          {role === "admin" && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                            >
                              <FiGrid className="text-cyan-400" />
                              Admin Dashboard
                            </Link>
                          )}
                          <div className="h-px bg-slate-700/50" />
                          <button
                            onClick={logoutHandler}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                          >
                            <FiLogOut />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="btn-primary text-sm py-2 px-5"
                  >
                    Get Started
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 md:hidden"
                onClick={() => setOpen(false)}
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 z-50 h-full w-72 flex flex-col md:hidden"
                style={{
                  background: "#0F172A",
                  borderLeft: "1px solid rgba(124,58,237,0.2)",
                }}
              >
                {/* Drawer header */}
                <div
                  className="flex items-center justify-between p-5 border-b"
                  style={{ borderColor: "rgba(124,58,237,0.15)" }}
                >
                  <span
                    className="text-xl font-black"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    <span className="gradient-text">Event</span>
                    <span className="text-white">Hub</span>
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-5 space-y-1">
                  {navLinks.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "text-white bg-purple-500/15 border border-purple-500/30"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <Icon className="text-base" />
                      {label}
                    </NavLink>
                  ))}

                  {token && role === "admin" && (
                    <Link
                      to="/create"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-purple-300 hover:text-white hover:bg-purple-500/10 transition-all"
                    >
                      <FiPlusCircle />
                      Create Event
                    </Link>
                  )}

                  {token && (
                    <Link
                      to="/profilepage"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <FiUser />
                      My Profile
                    </Link>
                  )}
                  {token && role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cyan-400 hover:text-white hover:bg-cyan-500/10 transition-all"
                    >
                      <FiGrid />
                      Admin Dashboard
                    </Link>
                  )}
                </div>

                {/* Drawer footer */}
                <div className="p-5 border-t" style={{ borderColor: "rgba(124,58,237,0.15)" }}>
                  {token ? (
                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-slate-300 border border-slate-600 hover:border-purple-500/50 hover:text-white transition-all"
                      >
                        <FiLogIn />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setOpen(false)}
                        className="btn-primary w-full text-sm"
                      >
                        <FiUserPlus />
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-18" />
    </>
  );
}

export default Navbar;
