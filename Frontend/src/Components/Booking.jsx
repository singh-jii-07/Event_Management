import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiCalendar, FiMapPin, FiClock, FiCheckCircle,
  FiXCircle, FiAlertCircle, FiTrash2, FiAlertTriangle,
} from "react-icons/fi";

const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400",
];

// ─── Confirmation Modal ───────────────────────────────────────────────────────
function ConfirmModal({ isOpen, onClose, onConfirm, loading }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
              style={{
                background: "#111827",
                border: "1px solid rgba(239,68,68,0.3)",
                pointerEvents: "all",
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
              >
                <FiAlertTriangle className="text-red-400 text-2xl" />
              </div>

              <h3
                className="text-lg font-bold text-white text-center mb-2"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Cancel Booking?
              </h3>
              <p className="text-slate-400 text-sm text-center mb-6">
                This action cannot be undone. The booking will be marked as cancelled
                but will remain in your history.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-300 transition-all duration-200"
                  style={{ border: "1px solid rgba(100,116,139,0.4)", background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(100,116,139,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Keep Booking
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    background: loading
                      ? "rgba(239,68,68,0.4)"
                      : "linear-gradient(135deg, #EF4444, #DC2626)",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiXCircle className="text-sm" />
                  )}
                  {loading ? "Cancelling…" : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Booking Component ───────────────────────────────────────────────────
function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/booking/getMyBookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.log("Error 👉", err.response?.data);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // Open confirmation modal
  const openCancelModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setModalOpen(true);
  };

  // Confirm cancel
  const handleConfirmCancel = async () => {
    if (!selectedBookingId) return;
    setCancelling(true);
    try {
      await axios.patch(
        `http://localhost:5050/api/booking/cancel/${selectedBookingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optimistic update — flip status in local state instantly
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBookingId ? { ...b, status: "cancelled" } : b
        )
      );
      toast.success("Booking cancelled successfully");
      setModalOpen(false);
      setSelectedBookingId(null);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to cancel booking";
      toast.error(msg);
    } finally {
      setCancelling(false);
    }
  };

  const handleCloseModal = () => {
    if (cancelling) return;
    setModalOpen(false);
    setSelectedBookingId(null);
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
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

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (!bookings || bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-20 text-center"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <FiCalendar className="text-purple-400 text-3xl" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>
          No Bookings Yet
        </h3>
        <p className="text-slate-400 text-sm mb-6">You haven't booked any events yet. Start exploring!</p>
        <a href="/allevent" className="btn-primary inline-flex">Browse Events</a>
      </motion.div>
    );
  }

  // ── Booking cards ───────────────────────────────────────────────────────────
  return (
    <>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        loading={cancelling}
      />

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
                style={{
                  background: "#111827",
                  border: isCancelled
                    ? "1px solid rgba(239,68,68,0.2)"
                    : "1px solid rgba(30,41,59,0.8)",
                }}
              >
                {/* Image */}
                <div className="relative w-full sm:w-36 h-32 flex-shrink-0 overflow-hidden">
                  <img
                    src={eventImages[i % eventImages.length]}
                    alt="event"
                    className="w-full h-full object-cover"
                    style={{ filter: isCancelled ? "grayscale(60%)" : "none" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    {/* Title + badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className="text-base font-bold text-white line-clamp-1"
                        style={{ fontFamily: "Outfit, sans-serif" }}
                      >
                        {item.event?.title || "Event Deleted"}
                      </h3>
                      <span
                        className={`badge flex-shrink-0 ${
                          isCancelled ? "badge-danger" : isPast ? "badge-secondary" : "badge-success"
                        }`}
                      >
                        {isCancelled ? (
                          <FiXCircle className="text-xs" />
                        ) : isPast ? (
                          <FiAlertCircle className="text-xs" />
                        ) : (
                          <FiCheckCircle className="text-xs" />
                        )}
                        {isCancelled ? "Cancelled" : isPast ? "Completed" : "Confirmed"}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      {item.event?.date && (
                        <span className="flex items-center gap-1">
                          <FiCalendar className="text-purple-400" />
                          {new Date(item.event.date).toDateString()}
                        </span>
                      )}
                      {item.event?.time && (
                        <span className="flex items-center gap-1">
                          <FiClock className="text-cyan-400" />
                          {item.event.time}
                        </span>
                      )}
                      {item.event?.location && (
                        <span className="flex items-center gap-1">
                          <FiMapPin className="text-amber-400" />
                          {item.event.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between gap-3 mt-3">
                    <span className="text-slate-500 text-xs">
                      Status:{" "}
                      <span className={isCancelled ? "text-red-400" : "text-green-400"}>
                        {isCancelled ? "Cancelled" : "Active"}
                      </span>
                    </span>

                    {/* Cancel button — only show on active bookings */}
                    {!isCancelled && !isPast && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => openCancelModal(item._id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 transition-all duration-200"
                        style={{
                          border: "1px solid rgba(239,68,68,0.3)",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <FiTrash2 className="text-xs" />
                        Cancel
                      </motion.button>
                    )}

                    {isCancelled && (
                      <span className="text-xs text-slate-600 italic">No further action</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>
    </>
  );
}

export default Booking;