import React from "react";
import Profile from "../Components/Profile";
import Booking from "../Components/Booking";

function ProfilePage() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* LEFT SIDE - PROFILE (fixed width) */}
      <div className="w-1/4 bg-white shadow-lg p-4">
        <Profile />
      </div>

      {/* RIGHT SIDE - BOOKINGS */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <Booking />
      </div>

    </div>
  );
}

export default ProfilePage;
