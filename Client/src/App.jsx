import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CropPrediction from "./pages/CropPrediction";
import FertilizerPrediction from "./pages/FertilizerPrediction";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Weather from "./pages/Weather";
import About from "./pages/About";
import CropAdvisor from "./pages/CropAdvisor";
import Services from "./pages/Services";

const App = () => {
  return (
    <>

      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop"
          element={
            <ProtectedRoute>
              <CropPrediction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fertilizer"
          element={
            <ProtectedRoute>
              <FertilizerPrediction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <ProtectedRoute>
              <CropAdvisor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />


      </Routes>
    </>
  );
};

export default App;