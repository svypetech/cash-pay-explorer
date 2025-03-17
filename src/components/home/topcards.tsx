"use client";
import { useState, useEffect } from "react";
import { useDarkMode } from "../../app/context/DarkModeContext";

interface TopCard {
  name: string;
  number: string;
}

interface TopcardsProps {
  topCards: TopCard[];
}

const Topcards: React.FC<TopcardsProps> = ({ topCards }) => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="relative py-8 sm:py-2 min-h-70 w-full flex flex-wrap gap-4 justify-center items-center text-white px-8">
      {/* Background Images - Two Layers for Smooth Transition */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          showDark ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: "url('/images/background.jpeg')" }}
      ></div>

      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          showDark ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: "url('/images/backgroundDark.jpeg')" }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-wrap gap-x-16 bg-gradient-to-r from-white/40 to-white/10 rounded-lg shadow-md h-auto p-6 items-center">
        {topCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col border-l-2 border-secondary px-6 m-6 sm:m-2"
          >
            <h3 className="font-poppins text-[12px] sm:text-[16px] text-secondary">{card.name}</h3>
            <p className="font-satoshi text-[28px] md:text-[40px] whitespace-nowrap overflow-hidden">{card.number}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Topcards;
