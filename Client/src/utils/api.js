import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);
export const cropPlan = (crop) => API.post("/crop-plan",{ crop });
export const logoutUser = () => API.get("/logout");


