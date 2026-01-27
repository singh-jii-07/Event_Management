import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    setOpen(false);
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Event<span className="text-gray-800">Hub</span>
        </Link>

        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <NavLink to="/" className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }>
            Home
          </NavLink>

          <NavLink to="/event" className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }>
            Events
          </NavLink>

          {token ? (
            <>
              <NavLink to="/profilepage" className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }>
                Profile
              </NavLink>

              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }>
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-700 font-medium">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/event" onClick={() => setOpen(false)}>Events</NavLink>

          {token ? (
            <>
              <NavLink to="/profilepage" onClick={() => setOpen(false)}>
                Profile
              </NavLink>
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setOpen(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
