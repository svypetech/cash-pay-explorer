'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import BlockCard from "@/src/components/cards/blockCard2";
import Pagination from "@/src/components/pagination/pagination";


const Page = () => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);


  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  const blocks = [
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "32" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "35" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "72" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "12" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "32" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "35" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "72" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago", size: "905 bytes", gasLimit: "700,00,000", gasUsed: "12" },
  ];

  return (
    <div className="pb-10 p-6 sm:p-8 md:p-10 lg-20">
      <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
        <div className="flex gap-x-2 w-full justify-between items-center">
          <p className="flex-1 font-satoshi text-[20px] md:text-[40px] ">Blocks</p>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 gap-x-4 lg:gap-x-16 my-4">
          {
            blocks.map((val, ind) => {
              return <BlockCard key={ind} blockNo={val.blockNo} noOfTransactions={val.noOfTransactions} endTime={val.endTime} size={val.size} gasLimit={val.gasLimit} gasUsed={val.gasUsed} />
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Page
