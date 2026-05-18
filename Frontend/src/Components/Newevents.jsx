import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Newevents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      setLoading(true);

      const ref = await axios.get(
        "http://localhost:5050/api/event/get"
      );

      // latest events first
      const sortedEvents = [...ref.data.event].reverse();

      // only 4 events
      setData(sortedEvents.slice(0, 4));
    } catch (err) {
      console.log("FULL ERROR 👉", err);

      if (err.response) {
        console.log("Backend Error:", err.response.data);
      } else if (err.request) {
        console.log("No Response From Server");
      } else {
        console.log("Axios Error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Latest Events
      </h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {data.map((event) => (
          <div
            key={event._id}
            className="group w-80 rounded-2xl overflow-hidden 
            bg-white border border-blue-200 
            hover:border-blue-500 
            shadow-md hover:shadow-2xl 
            transition duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
                alt="Event"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                New
              </span>

              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 text-center shadow">
                <p className="text-sm font-bold">
                  {new Date(event.date).toDateString()}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2">
                {event.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 gap-2">
                <span>🕒</span>
                <span>{event.time}</span>
              </div>

              <div className="flex items-center text-sm text-gray-500 gap-2">
                <span>📍</span>
                <span className="line-clamp-1">{event.location}</span>
              </div>

              {/* Navigate */}
              <button
                onClick={() => navigate(`/event/${event._id}`)}
                className="w-full mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold hover:from-indigo-600 hover:to-blue-600 transition"
              >
                More Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Newevents;