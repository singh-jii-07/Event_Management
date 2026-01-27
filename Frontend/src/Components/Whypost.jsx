import React from "react";

function WhyPost() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 items-center">
        
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
          alt="event"
          className="rounded-lg shadow-lg"
        />

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Why Create an Event on Our Platform
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Easy event creation with date, time and location</li>
            <li>✔ Reach more users and promote your events online</li>
            <li>✔ Secure and simple event booking system</li>
            <li>✔ Track registrations and manage attendees easily</li>
            <li>✔ Get real-time updates of bookings and event status</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default WhyPost;
