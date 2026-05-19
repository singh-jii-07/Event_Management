import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  FiHome, FiCalendar, FiUsers, FiBookmark, FiLogOut,
  FiSearch, FiX, FiChevronLeft, FiChevronRight,
  FiZap, FiTrendingUp, FiCheckCircle, FiXCircle, FiMenu
} from "react-icons/fi";

const API = "http://localhost:5050/api";

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => (n ?? 0).toLocaleString();

const KpiCard = ({ label, value, icon: Icon, color, subLabel, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-2xl p-5 flex items-center gap-4"
    style={{ background: "#111827", border: `1px solid ${color}22` }}
  >
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18` }}>
      <Icon className="text-xl" style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{fmt(value)}</p>
      <p className="text-xs text-slate-400 mt-0.5">{label}</p>
      {subLabel && <p className="text-xs mt-0.5" style={{ color }}>{subLabel}</p>}
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 text-xs shadow-xl" style={{ background: "#1E293B", border: "1px solid rgba(124,58,237,0.3)" }}>
      <p className="font-bold text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const PAGE_SIZE = 8;
const FILTERS = ["all", "active", "cancelled"];

// ── Main Component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!token || role !== "admin") { navigate("/"); return; }
    fetchStats();
    fetchBookings();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${API}/booking/stats`, { headers: { Authorization: `Bearer ${token}` } });
      setStats(data);
    } catch { /* silently fail */ }
    finally { setLoadingStats(false); }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(`${API}/booking/getbook`, { headers: { Authorization: `Bearer ${token}` } });
      setBookings(data.bookings || []);
    } catch { /* silently fail */ }
    finally { setLoadingBookings(false); }
  };

  const filtered = useMemo(() => {
    let list = [...bookings];
    if (filter === "active") list = list.filter((b) => b.status !== "cancelled");
    if (filter === "cancelled") list = list.filter((b) => b.status === "cancelled");
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.user?.name?.toLowerCase().includes(q) ||
          b.event?.title?.toLowerCase().includes(q) ||
          b.event?.location?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [bookings, filter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [filter, search]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const kpis = [
    { label: "Total Bookings", value: stats?.totalBookings, icon: FiBookmark, color: "#7C3AED", delay: 0 },
    { label: "Active Bookings", value: stats?.activeBookings, icon: FiCheckCircle, color: "#22C55E", delay: 0.05 },
    { label: "Cancelled", value: stats?.cancelledBookings, icon: FiXCircle, color: "#EF4444", delay: 0.1 },
    { label: "Total Users", value: stats?.totalUsers, icon: FiUsers, color: "#06B6D4", delay: 0.15 },
    { label: "Total Events", value: stats?.totalEvents, icon: FiCalendar, color: "#F59E0B", delay: 0.2 },
  ];

  const navItems = [
    { label: "Overview", icon: FiHome, to: "/admin" },
    { label: "All Events", icon: FiCalendar, to: "/allevent" },
    { label: "Create Event", icon: FiZap, to: "/create" },
    { label: "My Profile", icon: FiUsers, to: "/profilepage" },
  ];

  // ── Sidebar ─────────────────────────────────────────────────────────────────
  const Sidebar = ({ mobile = false }) => (
    <div
      className={`flex flex-col h-full ${mobile ? "w-64" : "w-64"}`}
      style={{ background: "#0A0F1E", borderRight: "1px solid rgba(124,58,237,0.15)" }}
    >
      <div className="p-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}>
          <FiZap className="text-white" />
        </div>
        <span className="text-xl font-black" style={{ fontFamily: "Outfit, sans-serif" }}>
          <span style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Event</span>
          <span className="text-white">Hub</span>
        </span>
      </div>

      <div className="p-4 flex-1 space-y-1">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-3">Navigation</p>
        {navItems.map(({ label, icon: Icon, to }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "#94A3B8" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(124,58,237,0.1)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94A3B8"; }}
          >
            <Icon className="text-base flex-shrink-0" />
            {label}
          </Link>
        ))}
      </div>

      <div className="p-4" style={{ borderTop: "1px solid rgba(124,58,237,0.1)" }}>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 transition-all duration-200"
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FiLogOut className="text-base" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0F172A" }}>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 z-50 h-full lg:hidden">
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center gap-4 px-6 py-4 flex-shrink-0"
          style={{ background: "#0A0F1E", borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
          <button className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}>
            <FiMenu className="text-xl" />
          </button>
          <div>
            <h1 className="text-lg font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
              Admin <span style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dashboard</span>
            </h1>
            <p className="text-xs text-slate-500">Overview & Booking Management</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}>A</div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {loadingStats
              ? Array(5).fill(0).map((_, i) => (
                <div key={i} className="rounded-2xl p-5 h-24 skeleton" style={{ background: "#111827" }} />
              ))
              : kpis.map((k) => <KpiCard key={k.label} {...k} />)
            }
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Monthly Trend */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="rounded-2xl p-5" style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}>
              <h2 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                Monthly Booking Trend
              </h2>
              {loadingStats ? (
                <div className="h-48 skeleton rounded-xl" />
              ) : (stats?.monthlyTrend?.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={stats.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: "11px", color: "#94A3B8" }} />
                    <Line type="monotone" dataKey="total" name="Total" stroke="#7C3AED" strokeWidth={2} dot={{ fill: "#7C3AED", r: 3 }} />
                    <Line type="monotone" dataKey="active" name="Active" stroke="#22C55E" strokeWidth={2} dot={{ fill: "#22C55E", r: 3 }} />
                    <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500 text-sm">No trend data yet</div>
              ))}
            </motion.div>

            {/* Top Events */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="rounded-2xl p-5" style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}>
              <h2 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
                Top Events by Bookings
              </h2>
              {loadingStats ? (
                <div className="h-48 skeleton rounded-xl" />
              ) : (stats?.topEvents?.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.topEvents} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="bookings" name="Bookings" fill="#06B6D4" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500 text-sm">No event data yet</div>
              ))}
            </motion.div>
          </div>

          {/* Bookings Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="rounded-2xl" style={{ background: "#111827", border: "1px solid rgba(30,41,59,0.8)" }}>

            {/* Table header */}
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ borderBottom: "1px solid rgba(30,41,59,0.8)" }}>
              <h2 className="text-sm font-bold text-white flex-shrink-0" style={{ fontFamily: "Outfit, sans-serif" }}>
                All Bookings
                <span className="ml-2 text-xs font-normal text-slate-500">({filtered.length})</span>
              </h2>

              {/* Filter tabs */}
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all duration-200"
                    style={{
                      background: filter === f ? "linear-gradient(135deg,#7C3AED,#06B6D4)" : "transparent",
                      color: filter === f ? "#fff" : "#64748B",
                      border: filter === f ? "none" : "1px solid rgba(100,116,139,0.3)",
                    }}>
                    {f}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative flex-1 min-w-0 sm:max-w-xs ml-auto">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search user or event…"
                  className="w-full pl-8 pr-8 py-2 rounded-xl text-sm text-white placeholder-slate-500 outline-none"
                  style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(124,58,237,0.2)" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    <FiX className="text-sm" />
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            {loadingBookings ? (
              <div className="p-5 space-y-3">
                {Array(4).fill(0).map((_, i) => <div key={i} className="h-12 skeleton rounded-xl" />)}
              </div>
            ) : paginated.length === 0 ? (
              <div className="py-16 text-center">
                <FiBookmark className="text-slate-700 text-4xl mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No bookings found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(30,41,59,0.8)" }}>
                      {["User", "Event", "Date", "Location", "Status"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((b, i) => {
                      const cancelled = b.status === "cancelled";
                      return (
                        <motion.tr key={b._id}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                          style={{ borderBottom: "1px solid rgba(30,41,59,0.4)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,0.04)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <td className="px-5 py-3">
                            <span className="text-white font-medium">{b.user?.name || "—"}</span>
                            <p className="text-xs text-slate-500">{b.user?.email || ""}</p>
                          </td>
                          <td className="px-5 py-3 text-slate-300 font-medium">{b.event?.title || "Deleted"}</td>
                          <td className="px-5 py-3 text-slate-400 whitespace-nowrap">
                            {b.event?.date ? new Date(b.event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                          </td>
                          <td className="px-5 py-3 text-slate-400">{b.event?.location || "—"}</td>
                          <td className="px-5 py-3">
                            <span className={`badge ${cancelled ? "badge-danger" : "badge-success"}`}>
                              {cancelled ? <FiXCircle className="text-xs" /> : <FiCheckCircle className="text-xs" />}
                              {cancelled ? "Cancelled" : "Active"}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {!loadingBookings && filtered.length > PAGE_SIZE && (
              <div className="flex items-center justify-between px-5 py-4"
                style={{ borderTop: "1px solid rgba(30,41,59,0.8)" }}>
                <p className="text-xs text-slate-500">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 transition-all"
                    style={{ background: "rgba(30,41,59,0.6)" }}>
                    <FiChevronLeft className="text-sm" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                    .reduce((acc, p, idx, arr) => {
                      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "…" ? (
                        <span key={`ellipsis-${i}`} className="text-slate-600 text-xs px-1">…</span>
                      ) : (
                        <button key={p} onClick={() => setPage(p)}
                          className="w-8 h-8 rounded-lg text-xs font-semibold transition-all"
                          style={{
                            background: page === p ? "linear-gradient(135deg,#7C3AED,#06B6D4)" : "rgba(30,41,59,0.6)",
                            color: page === p ? "#fff" : "#64748B",
                          }}>
                          {p}
                        </button>
                      )
                    )}
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-30 transition-all"
                    style={{ background: "rgba(30,41,59,0.6)" }}>
                    <FiChevronRight className="text-sm" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
