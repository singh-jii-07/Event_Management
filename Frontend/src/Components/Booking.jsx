import React, { useEffect, useState } from "react";
import axios from "axios";

function AllBooking() {
  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5050/api/booking/getbook",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data.bookings);
    } catch (err) {
      console.log("Error 👉", err.response?.data);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  if (!bookings || bookings.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No bookings found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((item) => (
        <div
          key={item._id}
          className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Left (Event image placeholder) */}
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
            alt="event"
            className="w-full sm:w-40 h-40 sm:h-32 object-cover"
          />

          {/* Content */}
          <div className="flex-1 p-4">
            <h3 className="font-bold text-lg text-gray-900">
              {item.event?.title || "Event deleted"}
            </h3>

            <p className="text-sm text-gray-600">
              👤 {item.user?.name || "User not found"}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              📅{" "}
              {item.event?.date
                ? new Date(item.event.date).toDateString()
                : "N/A"}
            </p>

            <p
              className={`mt-2 font-semibold ${
                item.status === "cancelled"
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              Status: {item.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllBooking;
