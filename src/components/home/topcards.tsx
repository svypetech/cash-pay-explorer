"use client";
import { useState, useEffect } from "react";
import { useDarkMode } from "../../app/context/DarkModeContext";

export interface TopCard {
  averageBlockTime: number | null;
  latestBlockTransactions: number | null;
  polSupply: string | null;
  totalBlocks: string | number | null;
}

export interface TopCardsProps {
  data: TopCard | undefined;
  loading: boolean;
}


const mockTopCards = [
    { name: "Average block time", number: "0 seconds" },
    { name: "Latest Block Transactions", number: "0" },
    { name: "POL Supply", number: "0" },
    { name: "Total Blocks", number: "0" },
  ]

const Topcards: React.FC<TopCardsProps> = ({ data, loading }) => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);

  const topCards = [
    { name: "Average Block Time", number: data?.averageBlockTime ?? "N/A" },
    { name: "Latest Block Transactions", number: data?.latestBlockTransactions ?? "N/A" },
    { name: "POL Supply", number: data?.polSupply ?? "N/A" },
    { name: "Total Blocks", number: isNaN(Number(data?.totalBlocks)) ? "N/A" : data?.totalBlocks },
  ];

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="relative py-8 sm:py-2 min-h-70 w-full flex flex-wrap gap-4 justify-center items-center text-white px-8">
      {/* Background Images - Two Layers for Smooth Transition */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${showDark ? "opacity-0" : "opacity-100"
          }`}
        style={{ backgroundImage: "url('/images/background.jpeg')" }}
      ></div>

      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${showDark ? "opacity-100" : "opacity-0"
          }`}
        style={{ backgroundImage: "url('/images/backgroundDark.jpeg')" }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-wrap gap-x-16 bg-gradient-to-r from-white/40 to-white/10 rounded-lg shadow-md h-auto p-6 items-center">
        {loading
          ? mockTopCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col border-l-2 border-secondary px-6 m-6 sm:m-2 animate-pulse"
            >
              <h3 className="font-poppins text-[12px] sm:text-[16px] text-secondary">
                {card.name}
              </h3>
              <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
            </div>
          ))
          : topCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col border-l-2 border-secondary px-6 m-6 sm:m-2"
            >
              <h3 className="font-poppins text-[12px] sm:text-[16px] text-secondary">
                {card.name}
              </h3>
              <p className={`font-satoshi ${card.name === "POL Supply" ? "text-[28px] pt-4" : "text-[20px] md:text-[40px]"} whitespace-nowrap overflow-hidden`}>
                {card.number}
              </p>
            </div>
          ))}

      </div>
    </div>
  );
};

export default Topcards;
