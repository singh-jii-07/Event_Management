import axios from "axios";
import React, { useEffect, useState } from "react";

function Allevent() {
  const [data, setData] = useState([]);

  const fetchEvent = async () => {
    try {
      const ref = await axios.get("http://localhost:5050/api/event/get");
      setData(ref.data.event);
    } catch (err) {
      console.log("Error 👉", err.response?.data);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {data.map((event) => (
        <div
          key={event._id}
          className="group w-80 rounded-2xl overflow-hidden 
             bg-white border border-blue-200 
             hover:border-blue-500 
             shadow-md hover:shadow-xl transition duration-300"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
              alt="Event"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Badge */}
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Early Bird
            </span>

            {/* Date */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 text-center shadow">
              <p className="text-sm font-bold">
                {event.date}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {event.title}
            </h3>

            <div className="flex items-center text-sm text-gray-500 gap-2">
              <span>🕒</span>
              <span>{event.time}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500 gap-2">
              <span>📍</span>
              <span className="line-clamp-1">{event.location}</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {event.description}
            </p>

            <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold hover:from-indigo-600 hover:to-blue-600 transition">
              Register Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Allevent;
