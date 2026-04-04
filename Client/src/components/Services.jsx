import React from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Thermometer,
  MapPin,
  BarChart3,
} from "lucide-react";

const services = [
  {
    title: "Live Weather",
    desc: "Get real-time weather updates across India",
    icon: <Cloud size={32} />,
  },
  {
    title: "Rain Prediction",
    desc: "Know rainfall chances in your area",
    icon: <CloudRain size={32} />,
  },
  {
    title: "Temperature",
    desc: "Track daily temperature trends",
    icon: <Thermometer size={32} />,
  },
  {
    title: "UV Index",
    desc: "Monitor sun exposure and UV levels",
    icon: <Sun size={32} />,
  },
  {
    title: "Location Tracking",
    desc: "Auto-detect your location via GPS",
    icon: <MapPin size={32} />,
  },
  {
    title: "Analytics",
    desc: "Detailed weather insights & charts",
    icon: <BarChart3 size={32} />,
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-yellow-400">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center text-white mb-12">
          🚀 Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-lg p-5 rounded-2xl text-center text-white shadow-lg hover:scale-105 hover:bg-white/30 transition duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-3">
                {service.icon}
              </div>

              <h3 className="font-semibold text-lg">
                {service.title}
              </h3>

              <p className="text-sm opacity-80 mt-1">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;