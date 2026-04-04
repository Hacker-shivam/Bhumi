import React, { useState } from "react";
import { predictCrop } from "../utils/ml-api";
import Navbar from "../components/Navbar";

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: "90",
    phosphorus: "42",
    potassium: "43",
    temperature: "20",
    humidity: "80",
    pH: "6.5",
    rainfall: "200"
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await predictCrop({
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        pH: Number(formData.pH),
        rainfall: Number(formData.rainfall)
      });

      setResult(res.data.recommended_crop);
    } catch (error) {
      console.error(error);
      setResult("Error getting prediction");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-yellow-400 min-h-screen">
    <Navbar />
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-yellow-400 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          🌱 Crop Prediction
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {/* Nitrogen */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Nitrogen (N)
            </label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="0" max="140"
              required
            />
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Phosphorus (P)
            </label>
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="5" max="145"
              required
            />
          </div>

          {/* Potassium */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Potassium (K)
            </label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="5" max="205"
              required
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Temperature (°C)
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="8" max="45"
              required
            />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Humidity (%)
            </label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="10" max="100"
              required
            />
          </div>

          {/* pH */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              pH Value
            </label>
            <input
              type="number"
              step="0.1"
              name="pH"
              value={formData.pH}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="3.5" max="9.5"
              required
            />
          </div>

          {/* Rainfall */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">
              Rainfall (mm)
            </label>
            <input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              min="20" max="300"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Predicting..." : "Predict Crop"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Recommended Crop:
            </h2>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default CropPrediction;