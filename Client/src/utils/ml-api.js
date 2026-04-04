import axios from "axios";

const MLAPI = axios.create({
  baseURL: " http://127.0.0.1:10000"
});

// Crop Prediction
export const predictCrop = (data) => MLAPI.post("/predict-crop", data);

// Fertilizer Prediction
export const predictFertilizer = (data) => MLAPI.post("/predict-fertilizer", data);