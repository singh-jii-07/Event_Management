import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiShield, FiLogOut, FiCalendar } from "react-icons/fi";

function Profile() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const ref = await axios.get("http://localhost:5050/api/user/profile", { headers: { Authorization: `Bearer ${token}` } });
      setUser(ref.data.user);
    } catch (err) {
      console.log("Error ", err.response?.data);
    }
  };

  const logoutHandel = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      await axios.post("http://localhost:5050/api/user/logout");
      window.location.href = "/login";
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }} />
        <p className="text-slate-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  const initials = user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      {/* Avatar Card */}
      <div className="relative rounded-2xl p-8 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.1) 100%)", border: "1px solid rgba(124,58,237,0.25)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0px, transparent 60%)" }} />
        <div className="relative">
          <motion.div animate={{ boxShadow: ["0 0 20px rgba(124,58,237,0.3)", "0 0 40px rgba(124,58,237,0.5)", "0 0 20px rgba(124,58,237,0.3)"] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
            {user.profilePhoto ? <img src={user.profilePhoto} alt="Profile" className="w-full h-full rounded-full object-cover" /> : initials}
          </motion.div>
          <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{user.name}</h2>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <div className="mt-3 inline-flex">
            <span className={`badge ${user.role === "admin" ? "badge-accent" : "badge-secondary"}`}>
              <FiShield className="text-xs" />
              {user.role === "admin" ? "Administrator" : "Member"}
            </span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl p-5 space-y-4" style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Account Details</h3>
        {[
          { icon: FiUser, label: "Full Name", value: user.name },
          { icon: FiMail, label: "Email Address", value: user.email },
          { icon: FiShield, label: "Account Role", value: user.role },
          { icon: FiCalendar, label: "Member Since", value: user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid rgba(30,41,59,0.6)" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.15)" }}>
              <Icon className="text-purple-400 text-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-500 text-xs">{label}</p>
              <p className="text-white text-sm font-medium truncate">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button onClick={logoutHandel} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-400 transition-all duration-200" style={{ border: "1px solid rgba(239,68,68,0.2)", background: "transparent" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}>
        <FiLogOut /> Sign Out
      </button>
    </motion.div>
  );
}

export default Profile;
