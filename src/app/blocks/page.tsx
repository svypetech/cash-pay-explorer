'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import BlockCard from "@/src/components/cards/blockCard2";
import Pagination from "@/src/components/pagination/pagination";
// import axios from "axios";

// function getTimeAgo(timestamp: number) {
//   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//   const difference = currentTime - timestamp;

//   if (difference < 60) {
//     return `${difference} seconds ago`;
//   } else if (difference < 3600) {
//     const minutes = Math.floor(difference / 60);
//     return `${minutes} minutes ago`;
//   } else if (difference < 86400) {
//     const hours = Math.floor(difference / 3600);
//     return `${hours} hours ago`;
//   } else {
//     const days = Math.floor(difference / 86400);
//     return `${days} days ago`;
//   }
// }

// interface Block {
//   number: string;
//   timestamp: number;
//   transactions: any[];
//   size: string;
//   gasLimit: string;
//   gasUsed: string;
// }


const Page = () => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  // const [blocks, setBlocks] = useState<Block[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQ2ZTdjOWYxNDI3ODE5NTI2OWYxOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM5ODc4MDEyLCJleHAiOjE3NDI0NzAwMTJ9.9CSpoEdOI0l48ltYSzFZTdIJVcok-NcfY4f6PbH3o7Y'
  //   const baseURL = 'https://api.cashpay.co' 
  //   // send along with an authorizaztion token which has beared token
  //   async function fetchData() {
  //     const resposne = await axios.get(`${baseURL}/explorer/blocks?page=${currentPage}&limit=10`,{
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     console.log(resposne.data)
  //     setBlocks(resposne.data.data.blocks);
  //     setLoading(false);
  //   }  

  //   fetchData();
  // }, [currentPage])


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
              // return <BlockCard key={ind} blockNo={val.number} noOfTransactions={val.transactions.length.toString()} endTime={getTimeAgo(val.timestamp)} size={val.size} gasLimit={val.gasLimit} gasUsed={val.gasUsed} />
              return <BlockCard key={ind} blockNo={val.blockNo} noOfTransactions={val.noOfTransactions} endTime={val.endTime} size={val.size} gasLimit={val.gasLimit} gasUsed={val.gasUsed} />
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Page
