import axios from "axios";

const MLAPI = axios.create({
  baseURL: "https://bhumi-uxf6.onrender.com",
});

// Crop Prediction
export const predictCrop = (data) => MLAPI.post("/predict-crop", data);

// Fertilizer Prediction
export const predictFertilizer = (data) => MLAPI.post("/predict-fertilizer", data);