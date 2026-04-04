import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Detail = () => {
  const [location, setLocation] = useState({ name: "Loading...", lat: 0, lon: 0 });
  const [season, setSeason] = useState("");
  const [topCrops, setTopCrops] = useState(["Wheat", "Rice", "Maize"]);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      setLocation({ name: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`, lat, lon });

      const month = new Date().getMonth() + 1;
      if (month >= 6 && month <= 10) setSeason("Kharif 🌧");
      else if (month >= 11 || month <= 3) setSeason("Rabi ❄");
      else setSeason("Zaid ☀");
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
        Interactive Agriculture Insights
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Map Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-400 to-yellow-300 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-white relative overflow-hidden"
        >
          <h3 className="font-bold text-xl mb-2">Your Region</h3>
          <p className="text-sm mb-4">{location.name}</p>
          {/* Placeholder for map */}
          <div className="w-full h-48 bg-white/20 rounded-lg flex items-center justify-center text-white font-semibold">
            Map Coming Soon 🌍
          </div>
        </motion.div>

        {/* Seasonal Info Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-white"
        >
          <h3 className="font-bold text-xl mb-2">Current Season</h3>
          <p className="text-4xl mb-4">{season}</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/414/414927.png"
            alt="season icon"
            className="w-24 h-24"
          />
        </motion.div>

        {/* Top Crops & CTA */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-tr from-green-500 to-green-700 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-white"
        >
          <h3 className="font-bold text-xl mb-4">Top Revenue Crops</h3>
          <ul className="mb-6 space-y-2">
            {topCrops.map((crop, idx) => (
              <li key={idx} className="text-lg">
                🌾 {crop}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button className="bg-yellow-400 text-green-900 font-semibold py-2 px-4 rounded-full hover:scale-105 transition">
              Predict Your Crop
            </button>
            <button className="bg-white text-green-900 font-semibold py-2 px-4 rounded-full hover:scale-105 transition">
              Get Fertilizer Recommendation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Detail;