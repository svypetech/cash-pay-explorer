"use client";
import React, { useState } from "react";
import Button from "../components/Button";
import EmailField from "../components/EmailField";
import Image from "next/image";

const RegisterPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="w-screen min-h-screen md:min-h-5/6 bg-[url('/background.svg')] bg-no-repeat bg-top bg-cover flex flex-col items-center justify-end px-2 sm:px-20 pb-10 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-32 before:bg-gradient-to-t before:from-black/40 before:to-transparent">

    {/* <div className="w-screen min-h-screen md:min-h-5/6 bg-[url('/background.svg')] bg-no-repeat bg-top bg-cover flex flex-col items-center justify-end px-2 sm:px-20 pb-10"> */}
      <Image src="/images/logo.svg" alt="logo" width={695} height={157} />

      {/* Heading */}
      <p className="font-montserrat font-bold sm:font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-normal text-center uppercase mt-6 sm:mt-8 md:mt-10">
        Your Finance Partner is Coming Soon
      </p>


      {/* Description */}
      <p className="font-poppins font-normal text-[18px] leading-[27px] tracking-normal text-center text-white mt-4 px-3">
        Seamlessly send, receive, deposit, withdraw, and trade crypto with ease. Convert crypto to fiat, make
        international transactions, and enjoy secure P2P trading—all in one place. Even shop effortlessly with your
        CashPay debit card. Register now for the Beta Release!
      </p>

      {register ? <EmailField onClick={() => setRegister(false)} /> : <Button onClick={() => setRegister(true)} />}
    </div>
  );
};

export default RegisterPage;