import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";
import SectionTitle from "./ui/SectionTitle";

const eventImages = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500",
];

const categoryColors = ["#7C3AED", "#06B6D4", "#F59E0B", "#EC4899"];

function SkeletonCard() {
  return (
    <div className="w-80 rounded-2xl overflow-hidden flex-shrink-0" style={{ background: "#111827" }}>
      <div className="skeleton h-48 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

function Newevents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const ref = await axios.get("http://localhost:5050/api/event/get");
      const sortedEvents = [...ref.data.event].reverse();
      setData(sortedEvents.slice(0, 4));
    } catch (err) {
      console.log("FULL ERROR 👉", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <section className="py-24 overflow-hidden" style={{ background: "#080E1A" }}>
      <div className="section-container">
        <div className="flex items-end justify-between mb-12">
          <SectionTitle
            tag="Fresh & New"
            title="Latest"
            highlight="Events"
            subtitle="Don't miss out on the freshest events just added to the platform."
            centered={false}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/allevent")}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            View All <FiArrowRight />
          </motion.button>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : data.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="w-80 rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0"
                  style={{
                    background: "#111827",
                    border: "1px solid rgba(30,41,59,0.8)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={eventImages[i % eventImages.length]}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Badge */}
                    <span
                      className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: categoryColors[i % categoryColors.length] }}
                    >
                      New
                    </span>

                    {/* Date badge */}
                    <div
                      className="absolute top-3 right-3 text-center px-3 py-2 rounded-xl text-xs font-bold"
                      style={{
                        background: "rgba(15,23,42,0.85)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#F8FAFC",
                      }}
                    >
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3
                      className="text-lg font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{event.description}</p>

                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <FiClock className="text-purple-400" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="text-cyan-400" />
                        <span className="line-clamp-1">{event.location}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/event/${event._id}`);
                      }}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = "0 8px 25px rgba(124,58,237,0.4)";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* Mobile view all button */}
        <div className="mt-8 text-center md:hidden">
          <button
            onClick={() => navigate("/allevent")}
            className="btn-secondary"
          >
            View All Events <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Newevents;