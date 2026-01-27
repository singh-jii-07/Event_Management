import React, { useState } from "react";
import axios from "axios";

function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(form)
setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5050/api/event/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Event created successfully");

      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
    } catch (err) {
      console.log("Error 👉", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
              }}
              required
              placeholder="Enter event title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
              }}
              placeholder="Enter event description"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
               onChange={(e) => {
                setForm({ ...form, date: e.target.value });
              }}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={(e) => {
                setForm({ ...form, time: e.target.value });
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input 
              type="text"
              name="location"
              value={form.location}
               onChange={(e) => {
                setForm({ ...form, location: e.target.value });
              }}
              required
              placeholder="Enter event location"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
