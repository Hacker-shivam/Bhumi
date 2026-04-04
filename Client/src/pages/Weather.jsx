import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import LocationSelector from "../components/LocationSelector";

const Weather = () => {
  const [location, setLocation] = useState({});
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "3cb524dcf8fd4bacb9b182244260104"; // 🔥 Add your API key

  // 🔍 Get weather from dropdown
  const getWeather = async () => {
    if (!location?.district || !location?.state) {
      setError("Select state & district ❌");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const query = `${location.district}, ${location.state}, India`;

      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes&alerts=yes`
      );

      setData(res.data);
      localStorage.setItem("location", JSON.stringify(location));
    } catch (err) {
      setError("Weather not found ❌");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // 📍 GPS Weather
  const getWeatherByGPS = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported ❌");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const res = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&alerts=yes`
          );

          setData(res.data);

          localStorage.setItem(
            "location",
            JSON.stringify({ lat: latitude, lng: longitude })
          );
        } catch {
          setError("Failed to fetch weather ❌");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);

        if (err.code === 1) setError("Permission denied ❌");
        else if (err.code === 2) setError("Location unavailable ❌");
        else if (err.code === 3) setError("Timeout ❌");
      }
    );
  };

  // 🌾 Farming Insight
  const getInsight = () => {
    if (!data) return "";

    const temp = data.current.temp_c;
    const humidity = data.current.humidity;
    const rain = data.current.precip_mm;

    if (temp > 38) return "🔥 Extreme heat – Increase irrigation";
    if (temp < 10) return "❄️ Cold risk – Protect crops";
    if (humidity < 30) return "⚠️ Low humidity – Soil drying";
    if (rain > 20) return "🌧️ Heavy rain – Avoid fertilizers";
    if (rain > 5) return "🌦️ Light rain – Good for crops";

    return "✅ Ideal farming conditions";
  };

  // 💾 Load saved location
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("location"));
    if (saved) setLocation(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-yellow-400 p-4">
      <Navbar />
      <div className="min-h-screen  p-4">

        <div className="max-w-6xl mx-auto bg-white/20 backdrop-blur-xl p-6 rounded-3xl">

          <h1 className="text-3xl text-white text-center mb-6">
            🌦️ Smart Weather Dashboard
          </h1>

          {/* 🔍 Location Selector */}
          <LocationSelector onSelect={setLocation} />

          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-4 flex-wrap">
            <button
              onClick={getWeather}
              className="bg-white px-4 py-2 rounded-xl"
            >
              🔍 Search
            </button>

            <button
              onClick={getWeatherByGPS}
              className="bg-yellow-400 px-4 py-2 rounded-xl"
            >
              📍 Use GPS
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-white text-center mt-4 animate-pulse">
              Fetching weather...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-200 text-center mt-4">{error}</p>
          )}

          {/* 🌦️ Current Weather */}
          {data && (
            <div className="grid md:grid-cols-2 gap-6 mt-6 text-white">

              <div className="bg-white/30 p-6 rounded-xl text-center">
                <h2 className="text-xl font-bold">
                  {data.location.name}, {data.location.region}
                </h2>

                <img
                  src={data.current.condition.icon}
                  alt=""
                  className="mx-auto"
                />

                <h1 className="text-4xl">{data.current.temp_c}°C</h1>
                <p>{data.current.condition.text}</p>
              </div>

              <div className="bg-white/30 p-6 rounded-xl grid grid-cols-2 gap-3">
                <div>💧 {data.current.humidity}%</div>
                <div>🌬️ {data.current.wind_kph} km/h</div>
                <div>🌧️ {data.current.precip_mm} mm</div>
                <div>☀️ UV {data.current.uv}</div>
                <div>☁️ Cloud {data.current.cloud}%</div>
                <div>👁️ {data.current.vis_km} km</div>
              </div>
            </div>
          )}

          {/* 📅 7 Day Forecast */}
          {data?.forecast && (
            <div className="mt-8">
              <h2 className="text-xl text-white mb-4 text-center">
                📅 7-Day Forecast
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.forecast.forecastday.map((day, index) => (
                  <div
                    key={index}
                    className="bg-white/30 p-4 rounded-xl text-center text-white"
                  >
                    <p className="font-semibold">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>

                    <img
                      src={day.day.condition.icon}
                      alt=""
                      className="mx-auto"
                    />

                    <p>{day.day.condition.text}</p>

                    <p className="font-bold">
                      {day.day.maxtemp_c}° / {day.day.mintemp_c}°
                    </p>

                    <p className="text-sm">
                      💧 {day.day.daily_chance_of_rain}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ⚠️ Alerts */}
          {data && (
            <div className="mt-6">
              {data?.alerts?.alert?.length > 0 ? (
                <div className="bg-red-200/30 text-red-900 p-4 rounded-xl">
                  <h2 className="font-bold mb-2">⚠️ Weather Alerts</h2>

                  {data.alerts.alert.map((alert, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-semibold">{alert.headline}</p>
                      <p className="text-sm">{alert.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-green-200">
                  ✅ No weather alerts
                </p>
              )}
            </div>
          )}

          {/* 🌾 Insight */}
          {data && (
            <div className="mt-6 bg-green-200/30 text-green-900 p-4 rounded-xl text-center font-semibold">
              {getInsight()}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Weather;