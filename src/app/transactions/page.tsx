'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import TransactionCard from "../../components/cards/transactionCard";
import Link from "next/link";
import Pagination from "@/src/components/pagination/pagination";


const Transactions = () => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const limit = 6; // Items per page


  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  const transactions = [
    {
      transactionHash: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688", blockNo: "8423003",
      time: "2h ago", fromAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      toAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      status: "Success"
    },
    {
      transactionHash: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688", blockNo: "8423003",
      time: "2h ago", fromAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      toAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      status: "Success"
    },
    {
      transactionHash: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688", blockNo: "8423003",
      time: "2h ago", fromAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      toAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      status: "Success"
    },
    {
      transactionHash: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688", blockNo: "8423003",
      time: "2h ago", fromAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      toAddress: "0x90afca66271006d5e6f3b9dc1bd1a75d1f6ae2287544a0d4ef3b8145caf7f688",
      status: "Success"
    },
  ];

  return (
    <div className="pb-10 p-6 sm:p-8 md:p-10 lg-20">
      <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
        <div className="flex gap-x-2 w-full justify-between items-center">
          <p className="flex-1 font-satoshi text-[20px] md:text-[40px] ">Validated Transactions</p>
          <Pagination  currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    
        </div>
        <div className="flex flex-col gap-x-3 justify-center my-4">
          {
            transactions.map((val, ind) => {
              return <TransactionCard key={ind} transactionHash={val.transactionHash} blockNo={val.blockNo} time={val.time} fromAddress={val.fromAddress} toAddress={val.toAddress} status={val.status} />
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Transactions
