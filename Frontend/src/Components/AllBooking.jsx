import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiCheckCircle, FiXCircle, FiAlertCircle, FiMapPin } from "react-icons/fi";

const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400",
];

function AllBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5050/api/booking/getbook", { headers: { Authorization: `Bearer ${token}` } });
      setBookings(res.data.bookings);
    } catch (err) {
      console.log("Error 👉", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllBookings(); }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl" style={{ background: "#111827" }}>
            <div className="skeleton w-28 h-20 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-3 py-1">
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="skeleton h-3 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)" }}>
          <FiCalendar className="text-purple-400 text-2xl" />
        </div>
        <p className="text-slate-400">No bookings found in the system.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Summary row */}
      <div className="flex items-center justify-between mb-4 p-4 rounded-xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div>
          <p className="text-white font-bold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>{bookings.length}</p>
          <p className="text-slate-400 text-xs">Total Bookings</p>
        </div>
        <div>
          <p className="text-green-400 font-bold text-lg">{bookings.filter(b => b.status !== "cancelled").length}</p>
          <p className="text-slate-400 text-xs">Active</p>
        </div>
        <div>
          <p className="text-red-400 font-bold text-lg">{bookings.filter(b => b.status === "cancelled").length}</p>
          <p className="text-slate-400 text-xs">Cancelled</p>
        </div>
      </div>

      {bookings.map((item, i) => {
        const isCancelled = item.status === "cancelled";
        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex gap-3 p-3 rounded-xl transition-all duration-200"
            style={{ background: "#111827", border: isCancelled ? "1px solid rgba(239,68,68,0.15)" : "1px solid rgba(30,41,59,0.8)" }}
          >
            <img src={eventImages[i % eventImages.length]} alt="event" className="w-24 h-20 object-cover rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white line-clamp-1">{item.event?.title || "Event Deleted"}</h3>
                <span className={`badge flex-shrink-0 ${isCancelled ? "badge-danger" : "badge-success"}`}>
                  {isCancelled ? <FiXCircle className="text-xs" /> : <FiCheckCircle className="text-xs" />}
                  {item.status}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><FiUser className="text-purple-400" />{item.user?.name || "Unknown"}</span>
                {item.event?.date && <span className="flex items-center gap-1"><FiCalendar className="text-cyan-400" />{new Date(item.event.date).toDateString()}</span>}
                {item.event?.location && <span className="flex items-center gap-1"><FiMapPin className="text-amber-400" />{item.event.location}</span>}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default AllBooking;
