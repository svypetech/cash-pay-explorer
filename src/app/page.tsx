"use client";
import Topcards from "../components/home/topcards";
import SearchField from "../components/home/searchField";
import Blocks from "../components/home/blocks";
import Transactions from "../components/home/transactions";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Page() {
  // const { darkMode } = useDarkMode(); // Get darkMode from context
  const [search, setSearch] = useState('')
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  
  //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQ2ZTdjOWYxNDI3ODE5NTI2OWYxOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM5ODc4MDEyLCJleHAiOjE3NDI0NzAwMTJ9.9CSpoEdOI0l48ltYSzFZTdIJVcok-NcfY4f6PbH3o7Y'
  //     const baseURL = 'https://api.cashpay.co'
  //     // send along with an authorizaztion token which has beared token
  //     async function fetchData() {
  //       try {
  //         const response = await axios.get(
  //           `${baseURL}/explorer/dashboardStats`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         console.log(`Fetched data: `, response.data);
  
          
  //       } catch (error) {
  //         console.error("Failed to fetch blocks:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  
  //     fetchData();
  //   }, [])

  const topCards = [
    { name: "Average block time", number: "10 seconds" },
    { name: "Total Transactions", number: "76,655" },
    { name: "Total Blocks", number: "128,879" },
    { name: "Wallet Addresses", number: "45,087" },
  ];

  const blocks = [
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago" },
    { blockNo: "8423003", noOfTransactions: "0", endTime: "18 seconds ago" },
  ];

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
    <div className=" flex flex-col items-between justify-between">
      <Topcards topCards={topCards} />
      <SearchField search={search} setSearch={setSearch} />
      <Blocks blocks={blocks} />
      <Transactions transactions={transactions} />
    </div>
  );
}
