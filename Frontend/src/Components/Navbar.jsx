import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        Event<span className="text-gray-800">Hub</span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "hover:text-blue-600"
          }
        >
          Home
        </NavLink>
         <NavLink
              to="/event"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
            >
              Events
            </NavLink>

        {token ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
            >
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
           
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-600" : "hover:text-blue-600"
              }
            >
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
    </nav>
  );
}

export default Navbar;
