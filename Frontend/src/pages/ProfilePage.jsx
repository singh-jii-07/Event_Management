import React, { useState } from "react";
import Profile from "../Components/Profile";
import Booking from "../Components/Booking";
import AllBooking from "../Components/AllBooking";
import { motion } from "framer-motion";
import { FiUser, FiCalendar, FiBookmark } from "react-icons/fi";

function ProfilePage() {
  const role = localStorage.getItem("role");
  const [activeTab, setActiveTab] = useState("bookings");

  const tabs = [
    { id: "bookings", label: role === "admin" ? "All Bookings" : "My Bookings", icon: FiCalendar },
  ];

  return (
    <div className="min-h-screen py-8" style={{ background: "#0F172A" }}>
      <div className="section-container">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <FiUser className="text-purple-400" />
            <span>Dashboard</span>
          </div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
            {role === "admin" ? (
              <><span className="gradient-text">Admin</span> Dashboard</>
            ) : (
              <>My <span className="gradient-text">Profile</span></>
            )}
          </h1>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar — Profile */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="w-full lg:w-80 flex-shrink-0">
            <Profile />
          </motion.div>

          {/* Main content */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex-1 min-w-0">
            {/* Tab header */}
            <div className="flex items-center gap-3 mb-6 p-1 rounded-xl" style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}>
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white flex-1 justify-center"
                style={{ background: "linear-gradient(135deg, #7C3AED, #06B6D4)" }}
              >
                <FiBookmark />
                {role === "admin" ? "All Bookings" : "My Bookings"}
              </div>
            </div>

            {/* Content area */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}
            >
              {role === "admin" ? <AllBooking /> : <Booking />}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
