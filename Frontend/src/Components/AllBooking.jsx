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

      setBookings(res.data.bookings); // 👈 now matches backend
    } catch (err) {
      console.log("Error 👉", err.response?.data);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  if (!bookings || bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">{item.event?.title}</h3>
          <p>{item.user?.name}</p>
          <p>Status: {item.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AllBooking;
