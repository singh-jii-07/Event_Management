import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCalendar, FiMapPin, FiClock, FiGrid, FiList, FiX, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";

const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500",
];

const categories = ["All", "Music", "Tech", "Sports", "Food", "Art", "Business", "Education"];

function SkeletonCard({ isGrid }) {
  return isGrid ? (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#111827" }}>
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-10 w-full rounded-xl" />
      </div>
    </div>
  ) : (
    <div className="flex gap-4 rounded-2xl overflow-hidden p-4" style={{ background: "#111827" }}>
      <div className="skeleton w-40 h-32 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3 py-2">
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="skeleton h-9 w-32 rounded-xl" />
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="col-span-full py-24 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <FiAlertCircle className="text-purple-400 text-3xl" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>No Events Found</h3>
      <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">We couldn't find any events matching your filters. Try adjusting your search criteria.</p>
      <button onClick={onClear} className="btn-primary">Clear Filters</button>
    </motion.div>
  );
}

function Allevent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isGrid, setIsGrid] = useState(true);

  const handelbook = async (eventid) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5050/api/booking/book", { eventid }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Event booked successfully! 🎉");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Booking failed";
      toast.error(msg);
    }
  };

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const ref = await axios.get("http://localhost:5050/api/event/get");
      setData(ref.data.event);
    } catch (err) {
      console.log("FULL ERROR 👉", err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvent(); }, []);

  const filtered = data.filter((e) => {
    const searchMatch = search === "" || e.title.toLowerCase().includes(search.toLowerCase()) || e.description?.toLowerCase().includes(search.toLowerCase()) || e.location?.toLowerCase().includes(search.toLowerCase());
    const catMatch = category === "All" || e.title.toLowerCase().includes(category.toLowerCase()) || e.description?.toLowerCase().includes(category.toLowerCase());
    return searchMatch && catMatch;
  });

  const clearFilters = () => { setSearch(""); setCategory("All"); };

  return (
    <div className="section-container py-10 pb-20">
      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />
          <input
            type="text"
            placeholder="Search events by name, description, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-12 pr-10 py-4 text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
              <FiX />
            </button>
          )}
        </div>

        {/* Category + Grid toggle row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: category === cat ? "linear-gradient(135deg, #7C3AED, #06B6D4)" : "rgba(30,41,59,0.8)",
                  color: category === cat ? "white" : "#94A3B8",
                  border: category === cat ? "none" : "1px solid rgba(30,41,59,0.8)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto sm:ml-0">
            <span className="text-slate-500 text-xs">{filtered.length} events</span>
            <button onClick={() => setIsGrid(true)} className={`p-2 rounded-lg transition-all ${isGrid ? "text-white bg-purple-500/20" : "text-slate-500 hover:text-white"}`}><FiGrid /></button>
            <button onClick={() => setIsGrid(false)} className={`p-2 rounded-lg transition-all ${!isGrid ? "text-white bg-purple-500/20" : "text-slate-500 hover:text-white"}`}><FiList /></button>
          </div>
        </div>
      </motion.div>

      {/* Events Grid/List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isGrid ? "grid" : "list"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={isGrid ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
        >
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} isGrid={isGrid} />)
            : filtered.length === 0
            ? <EmptyState onClear={clearFilters} />
            : filtered.map((event, i) =>
                isGrid ? (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                    className="rounded-2xl overflow-hidden group cursor-pointer"
                    style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={eventImages[i % eventImages.length]} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-lg text-white" style={{ background: "rgba(15,23,42,0.8)", backdropFilter: "blur(8px)" }}>
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>{event.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2">{event.description}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><FiClock className="text-purple-400" />{event.time}</span>
                        <span className="flex items-center gap-1"><FiMapPin className="text-cyan-400" /><span className="line-clamp-1">{event.location}</span></span>
                      </div>
                      <button onClick={() => handelbook(event._id)} className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
                        onMouseEnter={(e) => { e.target.style.boxShadow = "0 8px 25px rgba(124,58,237,0.4)"; }}
                        onMouseLeave={(e) => { e.target.style.boxShadow = "none"; }}>
                        Book Ticket
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.25) }}
                    className="flex flex-col sm:flex-row gap-4 rounded-2xl p-4 group transition-all duration-300"
                    style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(30,41,59,0.8)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="relative w-full sm:w-44 h-36 sm:h-full rounded-xl overflow-hidden flex-shrink-0">
                      <img src={eventImages[i % eventImages.length]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors" style={{ fontFamily: "Outfit, sans-serif" }}>{event.title}</h3>
                        <p className="text-slate-400 text-xs line-clamp-2 mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1.5"><FiCalendar className="text-purple-400" />{new Date(event.date).toDateString()}</span>
                          <span className="flex items-center gap-1.5"><FiClock className="text-cyan-400" />{event.time}</span>
                          <span className="flex items-center gap-1.5"><FiMapPin className="text-amber-400" />{event.location}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button onClick={() => handelbook(event._id)} className="px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200" style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}>Book Ticket</button>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Allevent;