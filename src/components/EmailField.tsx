"use client";
import React, { useState } from "react";
import Image from "next/image";
import { db, addDoc, collection } from "../configuration/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

interface ButtonProps {
  onClick: () => void;
}

const EmailField: React.FC<ButtonProps> = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "emails"), { email, timestamp: new Date() });
      toast.success("Email saved successfully!");
      setEmail(""); // Clear input field
      onClick(); // Trigger any parent function
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("Failed to save email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-50 flex justify-center items-center gap-x-2 bg-white/10 h-13 sm:h-16 rounded-lg cursor-pointer my-4 sm:my-10 mb-40 sm:mb-10 transition-all duration-300 font-poppins">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

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
  );
};

export default EmailField;
