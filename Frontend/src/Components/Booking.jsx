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

  // 🔴 Cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5050/api/booking/delete/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

     
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
    } catch (err) {
      console.log("Cancel Error 👉", err.response?.data);
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

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
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
              alt="event"
              className="w-40 h-32 object-cover"
            />

            {/* Content */}
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

            {/* Status + Button */}
            <div className="flex flex-col justify-center items-center px-4">
              <span
                className={`font-semibold mb-2 ${
                  item.status === "cancelled"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {item.status === "cancelled" ? "Cancelled" : "Booked"}
              </span>

              {item.status !== "cancelled" && (
                <button
                  onClick={() => cancelBooking(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Booking;
