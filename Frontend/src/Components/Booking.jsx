import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiCalendar, FiMapPin, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";

const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400",
];

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
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

  useEffect(() => { fetchBookings(); }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl" style={{ background: "#111827" }}>
            <div className="skeleton w-28 h-24 rounded-xl flex-shrink-0" />
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
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
          <FiCalendar className="text-purple-400 text-3xl" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>No Bookings Yet</h3>
        <p className="text-slate-400 text-sm mb-6">You haven't booked any events yet. Start exploring!</p>
        <a href="/allevent" className="btn-primary inline-flex">Browse Events</a>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-4">
        {bookings.map((item, i) => {
          const isCancelled = item.status === "cancelled";
          const eventDate = item.event?.date ? new Date(item.event.date) : null;
          const isPast = eventDate && eventDate < new Date();

          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col sm:flex-row gap-4 rounded-2xl overflow-hidden transition-all duration-300"
              style={{ background: "#111827", border: isCancelled ? "1px solid rgba(239,68,68,0.15)" : "1px solid rgba(30,41,59,0.8)" }}
            >
              {/* Image */}
              <div className="relative w-full sm:w-36 h-32 flex-shrink-0 overflow-hidden">
                <img src={eventImages[i % eventImages.length]} alt="event" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white line-clamp-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                      {item.event?.title || "Event Deleted"}
                    </h3>
                    <span className={`badge flex-shrink-0 ${isCancelled ? "badge-danger" : isPast ? "badge-secondary" : "badge-success"}`}>
                      {isCancelled ? <FiXCircle className="text-xs" /> : isPast ? <FiAlertCircle className="text-xs" /> : <FiCheckCircle className="text-xs" />}
                      {isCancelled ? "Cancelled" : isPast ? "Completed" : "Confirmed"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    {item.event?.date && (
                      <span className="flex items-center gap-1"><FiCalendar className="text-purple-400" />{new Date(item.event.date).toDateString()}</span>
                    )}
                    {item.event?.time && (
                      <span className="flex items-center gap-1"><FiClock className="text-cyan-400" />{item.event.time}</span>
                    )}
                    {item.event?.location && (
                      <span className="flex items-center gap-1"><FiMapPin className="text-amber-400" />{item.event.location}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-slate-500 text-xs">Booked by: <span className="text-slate-300">{item.user?.name || "You"}</span></span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
}

export default Booking;
 