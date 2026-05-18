import axios from "axios";
import React, { useEffect, useState } from "react";

function Allevent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Booking Function
  const handelbook = async (eventid) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5050/api/booking/book",
        { eventid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event booked successfully");
      console.log(res.data);
    } catch (err) {
      console.log("FULL ERROR 👉", err);

      if (err.response) {
        alert(err.response.data.message);
      } else if (err.request) {
        alert("Server not responding");
      } else {
        alert(err.message);
      }
    }
  };

  // Fetch Events
  const fetchEvent = async () => {
    try {
      setLoading(true);

      const ref = await axios.get(
        "http://localhost:5050/api/event/get"
      );

      setData(ref.data.event);
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
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Events
      </h2>

      {data.map((event) => (
        <div
          key={event._id}
          className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden border border-gray-100"
        >
          {/* Image */}
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
            alt="event"
            className="w-full sm:w-52 h-52 sm:h-auto object-cover"
          />

          {/* Content */}
          <div className="flex-1 p-5">
            <h3 className="text-xl font-bold text-gray-900">
              {event.title}
            </h3>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {event.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
              <span>🕒 {event.time}</span>

              <span>📍 {event.location}</span>

              <span>
                📅 {new Date(event.date).toDateString()}
              </span>
            </div>
          </div>

          {/* Button */}
          <div className="flex items-center justify-center p-5">
            <button
              onClick={() => handelbook(event._id)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-blue-600 transition font-semibold shadow-lg"
            >
              Buy Tickets
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Allevent;