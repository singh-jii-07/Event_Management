import React from "react";
import { FaSearch, FaTicketAlt, FaUserCheck } from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <FaSearch className="text-blue-600 text-4xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Browse Events</h3>
          <p className="text-gray-600">
            Explore upcoming concerts, tech events, workshops and more on our platform.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <FaTicketAlt className="text-blue-600 text-4xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Book Your Seat</h3>
          <p className="text-gray-600">
            Register for events easily with one click and secure your spot instantly.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <FaUserCheck className="text-blue-600 text-4xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Manage Bookings</h3>
          <p className="text-gray-600">
            View your booked events, track details and manage your profile anytime.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
