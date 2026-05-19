import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMapPin, FiArrowLeft, FiEdit, FiTrash2, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchSingleEvent = async () => {
    try {
      const ref = await axios.get(`http://localhost:5050/api/event/single/${id}`);
      setEvent(ref.data);
    } catch (err) {
      toast.error("Failed to load event");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5050/api/event/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Event deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => { fetchSingleEvent(); }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F172A" }}>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }} />
          <p className="text-slate-400 text-sm">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="min-h-screen py-8" style={{ background: "#0F172A" }}>
      <div className="section-container max-w-5xl">
        {/* Back button */}
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Events
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 0 1px rgba(124,58,237,0.2), 0 20px 60px rgba(0,0,0,0.4)" }}>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700" alt={event.title} className="w-full h-72 lg:h-full object-cover" style={{ minHeight: "400px" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, transparent 60%)" }} />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <span className="badge badge-primary mb-3">Upcoming Event</span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{event.title}</h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiUser className="text-purple-400" /> by Event Organizer
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">{event.description}</p>

            <div className="space-y-3">
              {[
                { icon: FiCalendar, label: "Date", value: new Date(event.date).toDateString(), color: "#A78BFA" },
                { icon: FiClock, label: "Time", value: event.time, color: "#22D3EE" },
                { icon: FiMapPin, label: "Location", value: event.location, color: "#FCD34D" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: color + "22" }}>
                    <Icon style={{ color, fontSize: "16px" }} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">{label}</p>
                    <p className="text-white text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => navigate(-1)} className="btn-secondary flex items-center gap-2">
                <FiArrowLeft /> Back
              </button>
              {role === "admin" && (
                <>
                  <button onClick={() => navigate(`/edit/${event._id}`)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200" style={{ background: "linear-gradient(135deg, #10B981, #06B6D4)" }}>
                    <FiEdit /> Edit Event
                  </button>
                  <button onClick={deleteHandler} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}>
                    <FiTrash2 /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EventDetails;
