"use client";
import React, { useState } from "react";
import Button from "../components/Button";
import EmailField from "../components/EmailField";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"

const RegisterPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="w-screen min-h-screen md:min-h-5/6 bg-[url('/backgroundMobile.webp')] sm:bg-[url('/background.webp')] bg-no-repeat bg-top bg-cover flex flex-col items-center justify-end px-4 sm:px-20 pb-10 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-32 before:bg-gradient-to-t before:from-black/40 before:to-transparent">
{/* bg-[url('/backgroundMobile.svg')] sm: */}
    {/* <div className="w-screen min-h-screen md:min-h-5/6 bg-[url('/background.svg')] bg-no-repeat bg-top bg-cover flex flex-col items-center justify-end px-2 sm:px-20 pb-10"> */}
      <Image src="/images/logoo.png" alt="logo" width={695} height={157}  />

      {/* Heading */}
      <p className="font-montserrat font-semibold text-[20px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-normal text-center uppercase mt-6 sm:mt-8 md:mt-10">
        Your Finance Partner is Coming Soon
      </p>


      {/* Description */}
      <p className="font-poppins font-normal text-[13px] sm:text-[18px] leading-[27px] tracking-normal text-center text-white mt-4 max-w-320">
        Seamlessly send, receive, deposit, withdraw, and trade crypto with ease. Convert crypto to fiat, make
        international transactions, and enjoy secure P2P trading—all in one place. Even shop effortlessly with your
        CashPay debit card. Register now for the Beta Release!
      </p>

      <div>
      <AnimatePresence mode="wait">
        {register ? (
          <motion.div
            key="email"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <EmailField onClick={() => setRegister(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Button onClick={() => setRegister(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default RegisterPage;