import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit3, FiType, FiAlignLeft, FiCalendar, FiClock, FiMapPin, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", location: "" });

  const fetchSingleEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/event/single/${id}`);
      setForm({ title: res.data.title, description: res.data.description, date: res.data.date?.slice(0, 10), time: res.data.time, location: res.data.location });
    } catch (err) {
      toast.error("Failed to load event");
      navigate(-1);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchSingleEvent(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5050/api/event/edit/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Event updated successfully! ✅");
      navigate(`/event/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "title", label: "Event Title", type: "text", placeholder: "Event title", icon: FiType },
    { name: "date", label: "Event Date", type: "date", placeholder: "", icon: FiCalendar },
    { name: "time", label: "Event Time", type: "time", placeholder: "", icon: FiClock },
    { name: "location", label: "Location", type: "text", placeholder: "Event location", icon: FiMapPin },
  ];

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F172A" }}>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }} />
          <p className="text-slate-400 text-sm">Loading event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-10" style={{ background: "#0F172A" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.1) 0px, transparent 60%)" }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-xl mx-4">
        <div className="rounded-3xl p-8 sm:p-10" style={{ background: "#111827", border: "1px solid rgba(6,182,212,0.2)", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)" }}>
              <FiEdit3 className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Edit Event</h1>
              <p className="text-slate-500 text-xs">Update the event details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(({ name, label, type, placeholder, icon: Icon }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                  <input type={type} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder} required={name !== "time"} className="input-dark pl-11" />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</label>
              <div className="relative">
                <FiAlignLeft className="absolute left-4 top-4 text-slate-500 text-sm" />
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Event description..." rows="4" className="input-dark pl-11 resize-none" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1 py-3">Cancel</button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="flex-1 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #06B6D4, #7C3AED)", opacity: loading ? 0.7 : 1 }}>
                {loading ? <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <><FiSave /> Update Event</>}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default EditEvent;
