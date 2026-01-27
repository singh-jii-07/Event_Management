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
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Events</h2>

      {data.map((event) => (
        <div
          key={event._id}
          className="flex bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
        >
          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
            alt="event"
            className="w-40 h-32 object-cover"
          />

          {/* Content */}
          <div className="flex-1 p-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {event.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2">
              {event.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <span>🕒 {event.time}</span>
              <span>📍 {event.location}</span>
              <span>📅 {new Date(event.date).toDateString()}</span>
            </div>
          </div>

          {/* Button */}
          <div className="flex items-center px-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Buy Tickets
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Allevent;
