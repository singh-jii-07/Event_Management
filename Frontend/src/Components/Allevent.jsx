import axios from "axios";
import React from "react";
import { useState } from "react";

function Allevent() {
    const [data,Setdata]=useState()
    const fetchEvent = async ()=>{
        try{
      const ref = await axios.get("http://localhost:5050/api/event/get")
      console.log(ref)
        }
        catch (err) {
      console.log("Error ", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
    }
  return (
    <div className="w-80 rounded-xl overflow-hidden shadow-lg bg-white">

      
      <div className="relative h-44">
        <img
          src="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
          alt="Event"
          className="w-full h-full object-cover"
        />

        
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          Early Bird
        </span>

        
        <div className="absolute top-2 right-2 bg-white text-center px-2 py-1 rounded shadow">
          <p className="text-sm font-bold">28</p>
          <p className="text-xs text-gray-500">SEP</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">

        <h3 className="text-lg font-bold text-gray-800">
          Tech Innovation Summit
        </h3>

        <div className="flex items-center text-sm text-gray-500 gap-2">
          <span>🕘</span>
          <span>9:00 AM - 5:00 PM</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 gap-2">
          <span>📍</span>
          <span>Convention Center</span>
        </div>

        <p className="text-sm text-gray-600">
          Explore the latest in technology innovation with industry leaders,
          hands-on workshops, and networking opportunities.
        </p>

        <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default Allevent;
