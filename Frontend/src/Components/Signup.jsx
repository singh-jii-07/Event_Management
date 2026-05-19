import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiZap, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5050/api/user/register", data);
      setData({ name: "", email: "", password: "" });
      toast.success("Account created! Please login. 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#0F172A" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.15) 0px, transparent 60%), radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.1) 0px, transparent 60%)" }} />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md mx-4">
        <div className="rounded-3xl p-8 sm:p-10" style={{ background: "#111827", border: "1px solid rgba(124,58,237,0.2)", boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.1)" }}>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
              <FiZap className="text-white" />
            </div>
            <span className="text-xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
              <span className="gradient-text">Event</span><span className="text-white">Hub</span>
            </span>
          </div>

          <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>Create account</h1>
          <p className="text-slate-400 text-sm mb-8">Join EventHub and discover amazing events</p>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Enter your full name" name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="input-dark pl-11" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" name="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Enter your email" className="input-dark pl-11" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type={showPass ? "text" : "password"} name="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Create a strong password" className="input-dark pl-11 pr-11" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="btn-primary w-full py-4 text-base" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <><span>Create Account</span><FiArrowRight /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Sign in instead</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
