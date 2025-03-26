'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import TransactionCard from "../../components/cards/transactionCard";
import Pagination from "@/src/components/pagination/pagination";
import useFetchTransactions from "@/src/hooks/transactions";
import TransactionCardSkeleton from "@/src/components/skeletons/transaction";

const Transactions = () => {
  const { darkMode } = useDarkMode(); 
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const { transactions, loading, totalPages: pages } = useFetchTransactions(currentPage, 10);

  useEffect(() => {
    if (pages) {
      setTotalPages(pages);
      console.log("Total Pages: ", pages);
    }
  }, [pages]);

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="pb-10 p-6 sm:p-8 md:p-10 lg-20">
      <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
        <div className="flex gap-x-2 w-full justify-between items-center">
          <p className="flex-1 font-satoshi text-[20px] md:text-[40px] ">Validated Transactions</p>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        </div>
        <div className="flex flex-col gap-x-3 justify-center my-4">
          {
            loading ? 
            Array.from({length: 10}).map((_,ind) => {
              return <TransactionCardSkeleton key={ind} />
            })
            : transactions.map((val, ind) => {
              return <TransactionCard key={ind} transactionHash={val.hash} blockNo={val.blockNumber} time={val.timeStamp} fromAddress={val.from} toAddress={val.to} status={"Success"} />
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Transactions
