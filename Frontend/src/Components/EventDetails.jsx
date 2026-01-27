import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

  const fetchSingleEvent = async () => {
    try {
      const ref = await axios.get(
        `http://localhost:5050/api/event/single/${id}`
      );
      setEvent(ref.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const deleteHandler = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(
        `http://localhost:5050/api/event/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event deleted successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchSingleEvent();
  }, []);

  if (!event) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-gray-800 text-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
            alt="event"
            className="rounded-xl shadow-lg w-full h-[400px] object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-pink-400 mb-4">by Event Organizer</p>

          <p className="text-gray-300 mb-4">{event.description}</p>

          <p className="mb-2">📅 <span className="font-semibold">{event.date}</span></p>
          <p className="mb-2">🕒 <span className="font-semibold">{event.time}</span></p>
          <p className="mb-4">📍 <span className="font-semibold">{event.location}</span></p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              ⬅ Back
            </button>

            
            {role === "admin" && (
              <>
                <button
                  onClick={() => navigate(`/edit/${event._id}`)}
                  className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Edit
                </button>

                <button
                  onClick={deleteHandler}
                  className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EventDetails;
