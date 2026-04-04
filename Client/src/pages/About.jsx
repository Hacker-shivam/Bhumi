import React from "react";
import { FaLeaf, FaSeedling, FaCloudSun, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <section className="bg-gradient-to-r from-green-500 to-yellow-400 w-full min-h-screen">
        <Navbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-500 to-yellow-400 text-white py-20 px-4 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          
          {/* Text */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-[0_0_12px_#A7F3D0] animate-pulse">
              Bhumi 🌱 – Empowering Farmers, Sustaining the Earth
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Bhumi is a platform dedicated to modernizing agriculture across India, providing farmers with technology-driven insights, weather forecasts, crop guidance, and sustainable farming practices. Our vision is to create a future where every farmer thrives and agriculture flourishes responsibly.
            </p>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              We combine traditional knowledge with modern tools, helping farmers make informed decisions and maximize yield while protecting the environment.
            </p>
          </div>

          {/* Hero Image */}
          <div className="flex-1">
            <img 
              src="https://images.pexels.com/photos/20515274/pexels-photo-20515274.jpeg"
              alt="Modern Farming"
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto py-16 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 text-center mb-12">
          What Bhumi Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaLeaf className="text-emerald-500 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Sustainable Farming</h3>
            <p className="text-gray-700">Learn eco-friendly practices to maximize yield without harming the environment.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaSeedling className="text-emerald-500 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Crop Guidance</h3>
            <p className="text-gray-700">Get insights about which crops to plant, when, and how to care for them effectively.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaCloudSun className="text-emerald-500 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Weather Forecasts</h3>
            <p className="text-gray-700">Access accurate weather information to plan irrigation, harvesting, and crop protection.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
            <FaUsers className="text-emerald-500 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Community Support</h3>
            <p className="text-gray-700">Connect with experts and fellow farmers to share knowledge and improve productivity.</p>
          </div>
        </div>
      </div>

      {/* Developer / Founder Section */}
      <div className="bg-emerald-100 py-16 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 text-center mb-12">
          Meet the Developer
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          
          {/* Developer Image */}
          <div className="flex-1">
            <img 
              src="https://avatars.githubusercontent.com/u/151234567?v=4" 
              alt="Developer" 
              className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-full shadow-2xl mx-auto"
            />
          </div>

          {/* Developer Info */}
          <div className="flex-1 flex flex-col gap-6">
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-700">
              Shivam Kumar
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Shivam is a passionate full-stack developer and the creator of Bhumi 🌱. With a deep interest in agriculture technology, he designed this platform to help farmers leverage modern tools for smarter farming. Shivam combines creativity, technical expertise, and a vision for sustainable development to build tools that make a real impact.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Outside of development, Shivam enjoys exploring rural communities, learning about traditional farming techniques, and applying modern solutions to age-old agricultural challenges.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto py-16 px-4 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-6">
          Join Us in Transforming Agriculture
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Whether you are a farmer, enthusiast, or supporter, Bhumi invites you to be part of our mission to modernize farming, increase productivity, and promote sustainability.
        </p>
        <button className="bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 transition">
          Get Started
        </button>
      </div>

    </section>
  );
};

export default About;