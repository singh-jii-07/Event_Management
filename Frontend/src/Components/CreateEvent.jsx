import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiZap, FiType, FiAlignLeft, FiCalendar, FiClock, FiMapPin, FiPlusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5050/api/event/create", form, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Event created successfully! 🎉");
      setForm({ title: "", description: "", date: "", time: "", location: "" });
      navigate("/allevent");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "title", label: "Event Title", type: "text", placeholder: "e.g. Annual Tech Summit 2025", icon: FiType },
    { name: "date", label: "Event Date", type: "date", placeholder: "", icon: FiCalendar },
    { name: "time", label: "Event Time", type: "time", placeholder: "", icon: FiClock },
    { name: "location", label: "Location", type: "text", placeholder: "e.g. New York Convention Center", icon: FiMapPin },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-10" style={{ background: "#0F172A" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(124,58,237,0.12) 0px, transparent 60%)" }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-xl mx-4">
        <div className="rounded-3xl p-8 sm:p-10" style={{ background: "#111827", border: "1px solid rgba(124,58,237,0.2)", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>
              <FiPlusCircle className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Create New Event</h1>
              <p className="text-slate-500 text-xs">Fill in the details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ name, label, type, placeholder, icon: Icon }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input type={type} name={name} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder} required={name !== "time"}
                    className="input-dark pl-11" />
                </div>
              </div>
            ))}

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</label>
              <div className="relative">
                <FiAlignLeft className="absolute left-4 top-4 text-slate-500 text-sm" />
                <textarea name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your event in detail..." rows="4"
                  className="input-dark pl-11 resize-none" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1 py-3">Cancel</button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="btn-primary flex-1 py-3" style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : "Create Event"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateEvent;
