import React from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "url(https://imgs.search.brave.com/9ruRgxzi19n79nTI_VvwGPYor8cDmU8ZLvi5jENY70M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vZnVudGFwL2Z1/bnRhcDIzMDQvZnVu/dGFwMjMwNDAwMTg2/LzIwMzIwNDc1Mi1l/dmVudC1tYW5hZ2Vt/ZW50LWNyZWF0aW9u/LWFuZC1kZXZlbG9w/bWVudC1wZXJzb25h/bC1hbmQtY29ycG9y/YXRlLWV2ZW50cy5q/cGc_dmVyPTY)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-700/70"></div>

      {/* Content */}
      <div className="relative text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Discover & Book  
          <span className="block text-yellow-300">Amazing Events</span>
        </h1>

        <p className="text-lg mb-6 text-gray-100">
          Find concerts, tech meetups, workshops and fun activities near you.
          Create and manage your own events easily with our platform.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/allevent")}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
          >
            Explore Events
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
