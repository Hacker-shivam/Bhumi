import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("Loading...");
  const [season, setSeason] = useState("");
  const [time, setTime] = useState("");
  const [forecast, setForecast] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const API_KEY ="3cb524dcf8fd4bacb9b182244260104";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=yes&alerts=yes`
        );
        const data = await res.json();

        setLocation(`${data.location.name}, ${data.location.region}, ${data.location.country}`);
        setWeather(data.current);
        setForecast(data.forecast.forecastday);
        setTime(data.location.localtime.split(" ")[1]);

        const month = new Date().getMonth() + 1;
        if (month >= 6 && month <= 10) setSeason("Kharif 🌧");
        else if (month >= 11 || month <= 3) setSeason("Rabi ❄");
        else setSeason("Zaid ☀");

        // Mock Market Data for ultra-premium feel
        setMarketData([
          { crop: "Wheat", price: "₹25/kg", trend: "up" },
          { crop: "Rice", price: "₹35/kg", trend: "down" },
          { crop: "Maize", price: "₹20/kg", trend: "up" },
          { crop: "Sugarcane", price: "₹30/kg", trend: "stable" },
        ]);
      } catch (err) {
        console.error(err);
        setLocation(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
      }
    });
  }, []);

  if (!weather)
    return (
      <div className="text-center p-6 text-gray-500 font-semibold text-lg">
        Loading premium dashboard...
      </div>
    );

  return (
    <div className="min-h-screen  p-4 md:p-6 space-y-6">
      {/* 🌟 Main Weather Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 text-white overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">{location}</h1>
            <p className="text-sm md:text-base">{time} local time</p>
            <p className="mt-2 text-lg md:text-xl font-semibold">{season}</p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={weather.condition.icon}
              alt={weather.condition.text}
              className="w-24 h-24 md:w-32 md:h-32 animate-pulse"
            />
            <div>
              <p className="text-4xl md:text-5xl font-bold">{weather.temp_c}°C</p>
              <p className="capitalize text-lg md:text-xl">{weather.condition.text}</p>
              <p className="text-sm md:text-base mt-1">
                Humidity: {weather.humidity}% | Wind: {weather.wind_kph} km/h
              </p>
            </div>
          </div>
        </div>

        {/* 🌱 Forecast Carousel */}
        <div className="mt-6">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {forecast.map((day, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center text-white"
                >
                  <p className="font-semibold">{day.date}</p>
                  <img src={day.day.condition.icon} alt="" className="mx-auto w-12 h-12 md:w-16 md:h-16" />
                  <p className="text-lg md:text-xl font-bold">{day.day.avgtemp_c}°C</p>
                  <p className="text-sm md:text-base">{day.day.condition.text}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>

      {/* 🌾 Premium Info Cards */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* High Revenue Crops */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-lg p-5 text-center text-white"
        >
          <h2 className="font-bold text-xl md:text-2xl">High Revenue Crops</h2>
          <p className="mt-2 text-base md:text-lg"> </p>
        </motion.div>

        

        {/* Latest Agri News */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-lg p-5 overflow-hidden text-white"
        >
          <h2 className="font-bold text-xl md:text-2xl mb-2">Latest Agri News</h2>
          <div className="h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-white/20 space-y-2">
            <p>🌾 Govt announces new crop insurance policies.</p>
            <p>💰 Wheat prices rise in North India this week.</p>
            <p>🌱 Organic fertilizer trends gaining popularity.</p>
            <p>🚜 Machinery subsidies for farmers announced.</p>
        
          </div>
        </motion.div>
      </div>

      {/* 💹 Live Crop Market */}
      <div className="mt-6 max-w-6xl mx-auto bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-5 text-white">
        <h2 className="font-bold text-2xl mb-4">Live Crop Market</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {marketData.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center"
            >
              <p className="font-semibold">{item.crop}</p>
              <p className="text-lg font-bold">{item.price}</p>
              <p
                className={`text-sm ${
                  item.trend === "up"
                    ? "text-green-400"
                    : item.trend === "down"
                    ? "text-red-400"
                    : "text-yellow-300"
                }`}
              >
                {item.trend === "up" ? "⬆ Rising" : item.trend === "down" ? "⬇ Falling" : "➡ Stable"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;