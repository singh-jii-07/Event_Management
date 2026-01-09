import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const ref = await axios.get(
        "http://localhost:5050/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     console.log(ref.data)
      setUser(ref.data.user); 
    } catch (err) {
      console.log("Error ", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

 
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={
              user.profilePhoto ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          My Profile
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Name</span>
            <span className="text-gray-800">{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Email</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-600">Role</span>
            <span className="text-gray-800">{user.role}</span>
          </div>
        </div>

        <button
          className="w-full mt-8 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
