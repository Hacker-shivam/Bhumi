import React, { useState } from "react";
import { predictFertilizer } from "../utils/ml-api";
import Navbar from "../components/Navbar";

const FertilizerPrediction = () => {
  const [formData, setFormData] = useState({
    temp: "",
    humidity: "",
    moisture: "",
    soil_type: "",
    crop_type: "",
    nitrogen: "",
    potassium: "",
    phosphorus: ""
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const crops = [
  "Arhar/Tur","Bajra","Barley","Coriander","Cotton (Lint)",
  "Cowpea (Lobia)","Dry Chillies","Garlic","Ginger",
  "Gram (Chickpea)","Groundnut","Jowar","Linseed (Flax)",
  "Maize (Fodder)","Maize (Grain)","Masoor (Red Lentil)",
  "Moong (Green Gram)","Onion","Peas & Beans (Pulses)",
  "Potato","Ragi (Finger Millet)","Rapeseed & Mustard",
  "Rice","Safflower","Sugarcane","Sunflower","Turmeric",
  "Urad (Black Gram)","Urad Bean","Wheat"
];

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
      const res = await predictFertilizer( 
        {
          temp: Number(formData.temp),
          humidity: Number(formData.humidity),
          moisture: Number(formData.moisture),
          soil_type: Number(formData.soil_type),
          crop_type: Number(formData.crop_type),
          nitrogen: Number(formData.nitrogen),
          potassium: Number(formData.potassium),
          phosphorus: Number(formData.phosphorus)
        }
      );

      setResult(res.data.recommended_fertilizer);
    } catch (error) {
      console.error(error);
      setResult("Error getting recommendation");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-yellow-400 min-h-screen">
    <Navbar />
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-yellow-700 mb-6 text-center">
          🌾 Fertilizer Recommendation
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {/* Temperature */}
          <div>
            <label className="block text-sm font-semibold mb-1">Temperature (°C)</label>
            <input
              type="number"
              name="temp"
              value={formData.temp}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-semibold mb-1">Humidity (%)</label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          {/* Moisture */}
          <div>
            <label className="block text-sm font-semibold mb-1">Moisture (%)</label>
            <input
              type="number"
              name="moisture"
              value={formData.moisture}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-semibold mb-1">Soil Type</label>
            <select
              name="soil_type"
              value={formData.soil_type}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            >
              <option value="">Select Soil Type</option>
              <option value="1">Sandy</option>
              <option value="2">Loamy</option>
              <option value="3">Black</option>
              <option value="4">Red</option>
              <option value="5">Clayey</option>
            </select>
          </div>

          {/* Crop Type */}
          <div>
            <label className="block text-sm font-semibold mb-1">Crop Type</label>
            <select name="crop_type" onChange={handleChange}>
             <option value="">Select Crop Type</option>
             {crops.map((crop, index) => (
             <option key={index} value={index + 1}>
              {crop}
             </option>
             ))}
            </select>
          </div>

          {/* Nitrogen */}
          <div>
            <label className="block text-sm font-semibold mb-1">Nitrogen (N)</label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          {/* Potassium */}
          <div>
            <label className="block text-sm font-semibold mb-1">Potassium (K)</label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          {/* Phosphorus */}
          <div>
            <label className="block text-sm font-semibold mb-1">Phosphorus (P)</label>
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="col-span-2 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            {loading ? "Predicting..." : "Get Recommendation"}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Recommended Fertilizer:
            </h2>
            <p className="text-2xl font-bold text-yellow-600 mt-2">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default FertilizerPrediction;