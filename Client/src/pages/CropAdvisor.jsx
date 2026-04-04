import React, { useState } from "react";
import { cropPlan } from "../utils/api";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Sun,
  Sprout,
  Droplets,
  FlaskConical,
  Bug,
  Scissors,
} from "lucide-react";

const CropAdvisor = () => {
  const [crop, setCrop] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const getCropPlan = async () => {
    if (!crop) return;
    setLoading(true);
    try {
      const res = await cropPlan(crop);
      setPlan(res.data.roadmap);
    } catch (err) {
      console.error(err);
      setPlan("Error fetching roadmap");
    }
    setLoading(false);
  };

  const formatPlan = () => {
    if (!plan) return [];
    return plan
      .split(/Step\s*\d+:/i)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const formattedSteps = formatPlan();

  const extractTitle = (step) => {
    const lines = step.split("\n").filter((l) => l.trim() !== "");
    return lines[0] || "Step";
  };

  const extractPoints = (step) => {
    const lines = step.split("\n").slice(1);
    return lines
      .map((l) => l.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);
  };

  const getIcon = (title) => {
    title = title.toLowerCase();
    if (title.includes("soil")) return Leaf;
    if (title.includes("climate")) return Sun;
    if (title.includes("sowing")) return Sprout;
    if (title.includes("irrigation")) return Droplets;
    if (title.includes("fertilizer")) return FlaskConical;
    if (title.includes("pest") || title.includes("disease")) return Bug;
    if (title.includes("harvest")) return Scissors;
    return Leaf;
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* 🌈 MAIN HORIZONTAL GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-yellow-400"></div>

      {/* ✨ GLOW ORBS */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-green-500/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full"></div>

      <Navbar />

      {/* HERO */}
      <div className="text-center pt-16 pb-10 px-4 relative z-10">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          Bhumi AI Advisor
        </h1>
        <p className="mt-4 text-gray-900 text-lg max-w-xl mx-auto">
          AI-powered precision farming roadmap for maximum yield 🚜
        </p>
      </div>

      {/* INPUT */}
      <div className="flex justify-center px-4 relative z-10">
        <div className="flex gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 px-4 py-3 rounded-2xl shadow-xl hover:shadow-green-500/20 transition">
          <input
            type="text"
            placeholder="Enter crop (e.g. Wheat 🌾)"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="px-4 py-2 rounded-lg w-64 outline-none bg-white/80 text-black focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={getCropPlan}
            disabled={loading}
            className="relative px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-green-400/40"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* ROADMAP */}
      <div className="mt-20 max-w-5xl mx-auto px-4 relative z-10">
        {formattedSteps.length > 0 && (
          <div className="relative border-l-2 border-white/20 pl-10 space-y-12">
            {formattedSteps.map((step, index) => {
              const title = extractTitle(step);
              const points = extractPoints(step);
              const Icon = getIcon(title);

              return (
                <div key={index} className="relative group transition duration-500">

                  {/* TIMELINE DOT */}
                  <div className="absolute left-[-22px] top-3 w-10 h-10 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                    <Icon size={18} className="text-white" />
                  </div>

                  {/* CARD */}
                  <div className="p-[1px] rounded-2xl bg-gradient-to-r from-green-400/40 to-yellow-400/40 group-hover:from-green-400 group-hover:to-yellow-400 transition-all duration-300">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl group-hover:shadow-green-500/30 transition-all">
                      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
                      <ul className="space-y-2 mt-2">
                        {points.map((point, i) => (
                          <li
                            key={i}
                            className="text-gray-900 text-sm flex gap-2 hover:text-white transition"
                          >
                            <span className="text-green-700">•</span>
                            <span>
                              {point
                                .replace(/soil/gi, "🌱 soil")
                                .replace(/water/gi, "💧 water")
                                .replace(/fertilizer/gi, "🧪 fertilizer")}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 h-[2px] w-20 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY */}
        {!plan && !loading && (
          <div className="text-center text-gray-900 mt-20 text-lg">
            🌾 Enter a crop to generate smart farming roadmap
          </div>
        )}

        {/* ERROR */}
        {plan === "Error fetching roadmap" && (
          <div className="text-center text-red-600 mt-10 text-lg">
            ❌ Failed to generate roadmap
          </div>
        )}
      </div>
    </div>
  );
};

export default CropAdvisor;