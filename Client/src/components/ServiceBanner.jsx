import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    url: "https://www.shutterstock.com/image-photo/portrait-senior-farmer-corn-field-600nw-2508314249.jpg",
    title: "Empowering Farmers 🌾",
    desc: "Smart weather insights for better crop decisions",
  },
  {
    url: "https://www.shutterstock.com/image-photo/drone-shot-tractor-spraying-lush-600nw-2464594961.jpg",
    title: "Modern Agriculture 🚜",
    desc: "Technology meets farming efficiency",
  },
  {
    url: "https://thumbs.dreamstime.com/b/female-indian-farmer-carrying-iron-pan-head-agriculture-field-portrait-rural-indian-woman-farmer-carrying-iron-pan-135991164.jpg",
    title: "Rural Growth 🌱",
    desc: "Supporting farmers across India",
  },
  {
    url: "https://t4.ftcdn.net/jpg/06/03/90/29/360_F_603902919_XPLEAr3lTajmuGWYrxuyCMbANmr66epI.jpg",
    title: "Weather Intelligence ☀️",
    desc: "Accurate forecasts for smarter planning",
  },
];

const ServiceBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Swipe handlers
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) setCurrentIndex((prev) => (prev + 1) % images.length);
    if (diff < -50) setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      className="relative w-full overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
          >
            <img
              src={images[currentIndex].url}
              alt={`slide-${currentIndex}`}
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-3xl" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-12 text-white">
              <motion.h2
                key={images[currentIndex].title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg"
              >
                {images[currentIndex].title}
              </motion.h2>
              <motion.p
                key={images[currentIndex].desc}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 drop-shadow-md mb-4"
              >
                {images[currentIndex].desc}
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
              >
                Explore More
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full z-20 text-lg sm:text-2xl transition"
      >
        &#8592;
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev + 1) % images.length)
        }
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full z-20 text-lg sm:text-2xl transition"
      >
        &#8594;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full cursor-pointer transition-all ${
              currentIndex === i ? "bg-white scale-125 shadow-lg" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceBanner;