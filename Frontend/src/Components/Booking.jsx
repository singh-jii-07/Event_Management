import React, { useEffect, useState } from "react";
import axios from "axios";

function Booking() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5050/api/booking/getMyBookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.log("Error 👉", err.response?.data);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (bookings.length === 0) {
    return <p className="text-gray-500">No bookings found.</p>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((item) => {
    
        if (!item.event) return null;

        return (
          <div
            key={item._id}
            className="flex bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
              alt="event"
              className="w-40 h-32 object-cover"
            />

            <div className="flex-1 p-4">
              <h3 className="text-lg font-semibold">
                {item.event.title}
              </h3>

              <p className="text-sm text-gray-600">
                {item.event.description}
              </p>

              <div className="text-sm text-gray-500 mt-2">
                🕒 {item.event.time} | 📍 {item.event.location} | 📅{" "}
                {new Date(item.event.date).toDateString()}
              </div>
            </div>

            <div className="flex items-center px-4">
              <span className="text-green-600 font-semibold">
                Booked
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Booking;
