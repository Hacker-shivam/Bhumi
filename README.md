link - https://bhumi-omega.vercel.app

🌱 Bhumi (Agri-AI) – Intelligent Agriculture Decision Support System
🚀 Overview

Bhumi (Agri-AI) is a full-stack, AI-powered web application designed to support farmers with data-driven agricultural decisions. It leverages Machine Learning to recommend the most suitable crops and fertilizers based on real-time environmental and soil conditions, enabling precision agriculture and improved farm productivity.

The system replaces traditional intuition-based farming with scientific, personalized recommendations, helping optimize yield, reduce costs, and promote sustainable practices.

🎯 Core Objectives
Improve crop selection accuracy
Optimize fertilizer usage
Reduce resource wastage
Promote sustainable farming
Provide accessible AI tools for farmers
🧠 Key Features
1. 🌾 Crop Recommendation System
Goal: Suggest the best crop for cultivation
Inputs:
Nitrogen (N), Phosphorus (P), Potassium (K)
pH level
Temperature, Humidity, Rainfall
Output: Most suitable crop for given conditions
Model Used: Random Forest Classifier
2. 🧪 Fertilizer Recommendation System
Goal: Recommend optimal fertilizer for soil improvement
Inputs:
Crop type
Soil N, P, K values
Output: Suitable fertilizer suggestion
Benefit: Prevents overuse and reduces environmental impact
3. 🤖 Crop Roadmap Chatbot
Provides step-by-step farming guidance
Helps with:
Sowing
Irrigation
Pest control
Harvesting
4. 🌦 Weather Forecast Integration
Real-time weather insights
Helps farmers plan irrigation and crop cycles
🏗️ System Architecture
🔹 Frontend (Presentation Layer)
Built using React (or HTML/CSS/JS)
User-friendly interface for:
Input data collection
Displaying predictions
🔹 Backend (Application Layer)
Node.js + Express (API layer)
Flask (Python) for ML model serving
Handles:
API requests
Data validation
Model communication
🔹 Machine Learning Layer
Built using Scikit-learn
Models:
Crop Recommendation Model (Random Forest)
Fertilizer Recommendation Model
Dataset:
Crop_data.csv
Fertilizer_data.csv
⚙️ Tech Stack
Frontend: React, Tailwind CSS
Backend: Node.js, Express
ML Backend: Flask, Python
Machine Learning: Scikit-learn (Random Forest)
Database: (MongoDB / CSV-based depending on version)
💡 Problem Solved
❌ Traditional Farming Issues
Wrong crop selection
Excess fertilizer usage
Low productivity
Environmental damage
✅ Bhumi Solution
Data-driven crop selection
Precise fertilizer usage
Improved yield prediction
Sustainable agriculture
📈 Impact
🌱 Increased farm productivity
💰 Reduced input costs
🌍 Environment-friendly farming
🤖 Accessible AI for farmers
🔮 Future Scope
Integration with IoT sensors
Satellite-based crop monitoring
Disease detection using Computer Vision
Voice-based farmer assistant (GenAI)
Mobile app deployment
