import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditEvent() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });


  const fetchSingleEvent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/event/single/${id}`
      );

      setForm({
        title: res.data.title,
        description: res.data.description,
        date: res.data.date?.slice(0, 10), 
        time: res.data.time,
        location: res.data.location,
      });
    } catch (err) {
      console.log("Fetch Error 👉", err.response?.data);
    }
  };

  useEffect(() => {
    fetchSingleEvent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5050/api/event/edit/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event updated successfully");
      navigate(`/event/${id}`);
    } catch (err) {
      console.log("Edit Error 👉", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Event title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Time */}
          <input
            type="time"
            value={form.time}
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;
