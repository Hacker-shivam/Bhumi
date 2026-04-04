import React, { useEffect, useRef, useState } from "react";

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

const FlipkartBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Swipe handlers
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) setCurrentIndex((prev) => (prev + 1) % images.length); // swipe left
    if (diff < -50) setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); // swipe right
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={item.url}
              alt={`slide-${index}`}
              className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mb-4">
                {item.desc}
              </p>
              <button className="bg-yellow-400 text-black px-4 sm:px-6 py-2 rounded-full font-semibold hover:scale-105 transition text-sm sm:text-base">
                Explore More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Left & Right Arrows */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        }
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition opacity-80 sm:opacity-100 text-lg sm:text-2xl z-20"
      >
        &#8592;
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full transition opacity-80 sm:opacity-100 text-lg sm:text-2xl z-20"
      >
        &#8594;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 sm:h-3 w-2 sm:w-3 rounded-full cursor-pointer transition ${
              currentIndex === i ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FlipkartBanner;