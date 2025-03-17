"use client";

import React, { useEffect, useState } from "react";
import data from "../data/header.json";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";
import images from "../data/images.json"
import { useDarkMode } from "../app/context/DarkModeContext"; // Import context hook
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const { darkMode, setDarkMode } = useDarkMode(); // Get dark mode state from context
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    if (darkMode === null) return; // Prevent running before darkMode is loaded
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className={`sticky top-0 left-0 w-full z-50 ${darkMode? "bg-darkBg":"bg-white"} flex flex-col sm:flex-row sm:justify-between items-between sm:items-center p-3 px-8 md:px-14 shadow-[0_0_10px_1px_rgba(0,0,0,0.6)] transition-all duration-300`}>
  {/* Logo */}
      <div className="flex gap-x-10 justify-between items-center">
        <Image
          src={darkMode ? "/images/darkModeLogo.svg" : "/images/logo.svg"}
          alt="logo"
          height={34}
          width={152}
        />

        <Image
          className="block sm:hidden cursor-pointer" // Visible on small screens, hidden on sm and larger
          src={showHeader ? darkMode? images.cancelDark: images.cancelLight : darkMode? images.headerDark: images.headerLight}
          onClick={() => setShowHeader(prev => !prev)}
          alt="logo"
          height={showHeader ? 42 : 16}
          width={showHeader ? 42 : 24}
        />
      </div>

      {/* for mobile */}
      {/* Navigation */}
      <AnimatePresence>
      {showHeader && (
         <div
         className={`sm:hidden flex flex-col gap-y-8 justify-center mt-8 overflow-hidden transition-all duration-300 ease-in-out ${
           showHeader ? "max-h-[500px] opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
         }`}>
        <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="sm:hidden flex flex-col justify-center"
      >
          {Array.isArray(data) &&
            data.map((val, ind) => (
              <Link href={val.route} key={ind}
              onClick={() => setShowHeader(prev => !prev)}>
                <div className="flex justify-between items-center cursor-pointer hover:bg-secondary/20 p-4 rounded-lg">
                  <div className="flex gap-x-2 items-center cursor-pointer">
                    <span>{parse(darkMode ? val.iconDark : val.iconLight)}</span>
                    <p className="font-satoshi font-bold text-sm md:text-base">{val.name}</p>
                  </div>
                  <Image
                    src={darkMode ? images.rightArrowDark : images.rightArrowLight}
                    alt="logo"
                    height={24}
                    width={24}
                  />
                </div>
              </Link>
            ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`flex justify-center gap-x-6 items-center py-3 border ${darkMode? "border-white":"border-black/25"}  rounded-lg w-full cursor-pointer my-8`}
          >
            <Image
              src={darkMode ? "/icons/sun.svg" : "/icons/moon.svg"}
              alt="Toggle Theme"
              height={20}
              width={20}
            />
            Dark Mode
          </button>
        </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* for web */}
      {/* Navigation */}
      <div className="hidden sm:flex gap-x-4 md:gap-x-8 items-center">
        {Array.isArray(data) &&
          data.map((val, ind) => (
            <Link href={val.route} key={ind}>
              <div className="flex gap-x-2 items-center cursor-pointer">
                <span>{parse(darkMode ? val.iconDark : val.iconLight)}</span>
                <p className="font-satoshi font-bold text-sm md:text-base">{val.name}</p>
              </div>
            </Link>
          ))}

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="focus:outline-none cursor-pointer">
          <Image
            src={darkMode ? "/icons/sun.svg" : "/icons/moon.svg"}
            alt="Toggle Theme"
            height={24}
            width={24}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
