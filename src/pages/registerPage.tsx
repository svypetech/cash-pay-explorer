"use client";
import React, { useState } from "react";
import Button from "../components/Button";
import EmailField from "../components/EmailField";
import Image from "next/image";

const RegisterPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <div className="w-screen min-h-screen md:min-h-5/6 bg-[url('/backgroundMobile.svg')] sm:bg-[url('/background.svg')] bg-no-repeat bg-top bg-cover flex flex-col items-center justify-end px-4 sm:px-20 pb-10 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-32 before:bg-gradient-to-t before:from-black/40 before:to-transparent">

    {/* <div className="w-screen min-h-screen md:min-h-5/6 bg-[url('/background.svg')] bg-no-repeat bg-top bg-cover flex flex-col items-center justify-end px-2 sm:px-20 pb-10"> */}
      <Image src="/images/logoo.png" alt="logo" width={695} height={157}  />

      {/* Heading */}
      <p className="font-montserrat font-semibold text-[20px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-normal text-center uppercase mt-6 sm:mt-8 md:mt-10">
        Your Finance Partner is Coming Soon
      </p>


      {/* Description */}
      <p className="font-poppins font-normal text-[13px] sm:text-[18px] leading-[27px] tracking-normal text-center text-white mt-4 w-75 xm:w-120 sm:w-150 md:w-170 lg:w-320">
        Seamlessly send, receive, deposit, withdraw, and trade crypto with ease. Convert crypto to fiat, make
        international transactions, and enjoy secure P2P trading—all in one place. Even shop effortlessly with your
        CashPay debit card. Register now for the Beta Release!
      </p>

      {register ? <EmailField onClick={() => setRegister(false)} /> : <Button onClick={() => setRegister(true)} />}
    </div>
  );
};

export default RegisterPage;