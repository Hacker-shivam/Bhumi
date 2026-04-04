import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    title: "Crop Prediction",
    desc: "Find best crops based on soil",
    path: "/crop",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
  },
  {
    title: "Fertilizer Advisor",
    desc: "Smart fertilizer suggestions",
    path: "/fertilizer",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=800",
  },
  {
    title: "Weather Insights",
    desc: "Live weather updates",
    path: "/weather",
    image: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?w=800",
  },
  {
    title: "Crop Advisor",
    desc: "Complete farming roadmap",
    path: "/recommendation",
    image: "https://images.unsplash.com/photo-1592982537447-6f2b2a5c3c1f?w=800",
  },

  // 🔥 NEW FEATURES (COMING SOON)
  {
    title: "Soil Testing",
    desc: "Analyze soil health with AI",
    path: "/soil",
    comingSoon: true,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800",
  },
  {
    title: "Disease Detection",
    desc: "Detect crop diseases instantly",
    path: "/disease",
    comingSoon: true,
    image: "https://images.unsplash.com/photo-1598514982841-7c3c0d7b4f4f?w=800",
  },
  {
    title: "Expert Consultation",
    desc: "Connect with agriculture experts",
    path: "/expert",
    comingSoon: true,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
  },
  {
  title: "Market Price Predictor",
  desc: "Predict crop prices before harvest",
  path: "/market",
  comingSoon: true,
  image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800",
  },
  {
  title: "Smart Irrigation",
  desc: "Optimize water usage using AI",
  path: "/irrigation",
  comingSoon: true,
  image: "https://images.unsplash.com/photo-1598511724146-bc2c3b7fba9c?w=800",
  },
  {
  title: "Smart Irrigation",
  desc: "Optimize water usage using AI",
  path: "/irrigation",
  comingSoon: true,
  image: "https://images.unsplash.com/photo-1598511724146-bc2c3b7fba9c?w=800",
 },
 {
  title: "Agri Marketplace",
  desc: "Buy & sell seeds, fertilizers",
  path: "/marketplace",
  comingSoon: true,
  image: "https://images.unsplash.com/photo-1606788075761-3c5bff8c1b59?w=800",
}
];

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (!item.comingSoon) {
      navigate(item.path);
    }
  };

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {banners.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className={`group relative h-[250px] rounded-2xl overflow-hidden shadow-lg 
            ${item.comingSoon ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* 🔒 Coming Soon Badge */}
            {item.comingSoon && (
              <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                Coming Soon
              </div>
            )}

            {/* Content */}
            <div className="absolute bottom-0 p-5 text-white">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-sm opacity-90">{item.desc}</p>

              {!item.comingSoon && (
                <div className="flex items-center gap-2 mt-3 text-sm font-medium group-hover:translate-x-1 transition">
                  Explore <ArrowRight size={16} />
                </div>
              )}
            </div>

            {/* Border */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-2xl transition" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;