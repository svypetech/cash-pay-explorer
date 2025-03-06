"use client";
import React, { useState } from "react";
import Image from "next/image";
import { db, addDoc, collection } from "../configuration/firebase.config";
import "react-toastify/dist/ReactToastify.css"; // Import styles

interface ButtonProps {
  onClick: () => void;
}

const EmailField: React.FC<ButtonProps> = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter an email")
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "emails"), { email, timestamp: new Date() });
      setError("")
      setEmail(""); // Clear input field
      onClick(); // Trigger any parent function
    } catch (error) {
      setError("Failed to save email.")
      console.error("Error saving email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 sm:my-10 mb-40 sm:mb-10">
    <div className="relative z-50 flex justify-center items-center gap-x-2 bg-white/10 h-13 sm:h-16 rounded-lg cursor-pointer  transition-all duration-300 font-poppins">
      {/* Email Icon */}
      <Image src="/icons/email.svg" alt="email" height={7} width={8} className="ml-2 h-7 w-8" />

      {/* Input Field */}
      <input
        type="text"
        className="relative z-50 ml-4 bg-transparent outline-none text-white placeholder-gray-400 w-full"
        value={email}
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Submit Button */}
      <button
        className="relative z-50 flex justify-center items-center h-full gap-x-2 px-6 cursor-pointer font-poppins bg-[#143881] rounded-tr-lg rounded-br-lg transition-all duration-300 hover:border-black hover:bg-[#000A1D] font-poppins"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit"}
        <Image src="/icons/rightArrow.svg" alt="Right Arrow" width={30} height={15} />
      </button>
    </div>
    {error && <p className="text-red-500">{error}</p>}

    </div>
  );
};

export default EmailField;
