import React from 'react';
import RegisterPage from "../pages/registerPage";

const LandingPage = () => {
  return (
    <div 
      className="relative bg-[#000A1D] text-white w-screen h-screen flex flex-row justify-center">
      
      {/* Background Image (Higher Layer) */}
      <div 
        className="absolute inset-0 bg-[url('/bitCoin.webp')] bg-no-repeat bg-right-bottom 
                   bg-[length:204px_164px] md:bg-[length:304px_264px] lg:bg-[length:404px_364px] z-10">
      </div>

      {/* Register Page (Lower Layer) */}
      <div className="relative  w-full">
        <RegisterPage />
      </div>

    </div>
  );
}

export default LandingPage;
