import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-emerald-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-lime-100 drop-shadow-[0_0_12px_#D9F99D] animate-pulse">
            Bhumi 🌱
          </h1>
          <p className="text-sm md:text-base opacity-90">
            Empowering farmers across India with technology and insights for smarter agriculture.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-lime-200 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-lime-200 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-lime-200 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-lime-200 transition"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
          <Link to="/" className="hover:text-lime-200 transition">Home</Link>
          <Link to="/crop" className="hover:text-lime-200 transition">Crop</Link>
          <Link to="/fertilizer" className="hover:text-lime-200 transition">Fertilizer</Link>
          <Link to="/weather" className="hover:text-lime-200 transition">Weather</Link>
          <Link to="/about" className="hover:text-lime-200 transition">About</Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg mb-2">Contact</h2>
          <p>Email: info@bhumi.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123 Green Fields, India</p>
        </div>

        {/* Newsletter / Extra */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg mb-2">Subscribe</h2>
          <p className="text-sm opacity-90">Get updates about new features and insights.</p>
          <div className="flex gap-2 mt-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-3 py-2 rounded-l-lg border-none focus:outline-none text-black w-full"
            />
            <button className="bg-lime-200 text-black px-4 py-2 rounded-r-lg hover:bg-lime-300 transition font-semibold">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-90">
        © {new Date().getFullYear()} Bhumi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;