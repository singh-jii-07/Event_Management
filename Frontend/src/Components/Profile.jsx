import React from "react";

function Profile() {
  // Abhi dummy data (baad me API se aayega)
  const user = {
    name: "Nilesh Kumar",
    email: "nilesh@gmail.com",
    profilePhoto:
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={user.profilePhoto}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h2>

        {/* User Info */}
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Name</span>
            <span className="text-gray-800">{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Email</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="w-full mt-8 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem("token");
            alert("Logged out");
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;
