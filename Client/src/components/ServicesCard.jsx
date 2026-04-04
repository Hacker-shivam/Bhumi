import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  FlaskConical,
  BarChart3,
  Cloud,
  CloudRain,
} from "lucide-react";

const services = [
  {
    title: "Crop Prediction",
    desc: "Get suggestions on which crop to grow based on soil & weather",
    icon: <Leaf size={32} />,
    path: "/crop",
  },
  {
    title: "Fertilizer Recommendation",
    desc: "Optimal fertilizer suggestions for healthy crops",
    icon: <FlaskConical size={32} />,
    path: "/fertilizer",
  },
  {
    title: "Crop Suggestion",
    desc: "Find high revenue crops suitable for your area",
    icon: <BarChart3 size={32} />,
    path: "/recommendation",
  },
  {
    title: "Weather Update",
    desc: "Real-time weather updates for your location",
    icon: <Cloud size={32} />,
    path: "/weather",
  },
  {
    title: "Rainfall Prediction",
    desc: "Know the chances of rainfall in your area",
    icon: <CloudRain size={32} />,
    path: "/weather",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-yellow-400">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          🚀 Bhumi Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Link
              to={service.path}
              key={index}
              className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center text-white shadow-lg hover:scale-105 hover:bg-white/30 transition duration-300 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-sm opacity-80 mt-1">{service.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;