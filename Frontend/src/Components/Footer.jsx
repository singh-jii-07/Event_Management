import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-white">EventHub</h2>
          <p className="mt-3 text-sm text-gray-400">
            EventHub helps you discover, manage, and book events easily. 
            Join us to explore amazing events around you.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">All Events</li>
            <li className="hover:text-white cursor-pointer">Profile</li>
            <li className="hover:text-white cursor-pointer">Login</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
