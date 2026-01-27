import React from "react";
import Profile from "../Components/Profile";
import Booking from "../Components/Booking";
import AllBooking from "../Components/AllBooking";

function ProfilePage() {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* TOP (mobile) / LEFT (desktop) - PROFILE */}
      <div className="w-full md:w-1/4 bg-white shadow-lg p-4">
        <Profile />
      </div>

      {role === "admin" ? (
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            All Bookings
          </h2>
          <AllBooking />
        </div>
      ) : (
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            My Bookings
          </h2>
          <Booking />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
