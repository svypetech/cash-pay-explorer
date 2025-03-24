'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import TransactionCard from "../../components/cards/transactionCard";
import Pagination from "@/src/components/pagination/pagination";
// import axios from "axios";

// interface Transaction {
//   blockNumber: string;
//   timeStamp: string;
//   hash: string;
//   from: string;
//   to: string;
//   value: string;
//   contractAddress: string;
//   input: string;
//   type: string;
//   gas: string;
//   gasUsed: string;
//   traceId: string;
//   isError: string;
//   errCode: string;
// }



const Transactions = () => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQ2ZTdjOWYxNDI3ODE5NTI2OWYxOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM5ODc4MDEyLCJleHAiOjE3NDI0NzAwMTJ9.9CSpoEdOI0l48ltYSzFZTdIJVcok-NcfY4f6PbH3o7Y'
  //   const baseURL = 'https://api.cashpay.co' 
  //   // send along with an authorizaztion token which has beared token
  //   async function fetchData() {
  //     const resposne = await axios.get(`${baseURL}/explorer/transactions?page=${currentPage}&limit=10`,{
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     console.log(resposne.data)
  //     setTransactions(resposne.data.data.transactions);
  //     setLoading(false);
  //   }  

  //   fetchData();
  // }, [currentPage])

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

  // if (loading) {
  //   return <div className="h-screen flex justify-center items-center">Loading...</div>
  // }

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
              // return <TransactionCard key={ind} transactionHash={val.hash} blockNo={val.blockNumber} time={val.timeStamp} fromAddress={val.from} toAddress={val.to} status={"success"} />
              return <TransactionCard key={ind} transactionHash={val.transactionHash} blockNo={val.blockNo} time={val.time} fromAddress={val.fromAddress} toAddress={val.toAddress} status={val.status} />
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Transactions
