'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import TransactionCard from "../../components/cards/transactionCard";
import Pagination from "@/src/components/pagination/pagination";
import { useFetchPendingTransactions } from "@/src/hooks/transactions";
import TransactionCardSkeleton from "@/src/components/skeletons/transaction";

const Transactions = () => {
  const { darkMode } = useDarkMode(); 
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [error, setError] = useState<string | null>(null);
  const { transactions, loading, totalPages: pages } = useFetchPendingTransactions(currentPage, 10);

  useEffect(() => {
    // Check if transactions is valid and handle error states
    if (!loading) {
      if (!Array.isArray(transactions)) {
        setError("Failed to load pending transactions. Please try again later.");
        setTotalPages(currentPage); // Set total pages to current page
      } else if (transactions.length === 0) {
        setError("No pending transactions found.");
        setTotalPages(currentPage); // Set total pages to current page
      } else {
        setError(null);
        setTotalPages(pages || currentPage);
      }
    }
  }, [transactions, loading, pages, currentPage]);

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="pb-10 p-6 sm:p-8 md:p-10 lg-20">
      <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
        <div className="flex gap-x-2 w-full justify-between items-center">
          <p className="flex-1 font-satoshi text-[20px] md:text-[40px] ">Pending Transactions</p>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
        
        <div className="flex flex-col gap-x-3 justify-center my-4">
          {loading ? (
            Array.from({length: 10}).map((_, ind) => {
              return <TransactionCardSkeleton key={ind} />
            })
          ) : error ? (
            <div className={`flex items-center justify-center p-8 rounded-lg ${showDark ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="text-center">
                <div className={`text-6xl mb-4 ${showDark ? "text-gray-600" : "text-gray-400"}`}>
                  {error.includes("No pending transactions") ? "📄" : "⚠️"}
                </div>
                <p className={`text-lg font-medium ${showDark ? "text-gray-300" : "text-gray-600"}`}>
                  {error}
                </p>
                {error.includes("Failed to load") && (
                  <button 
                    onClick={() => window.location.reload()} 
                    className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
                      showDark 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          ) : (
            transactions.map((transaction, ind) => {
              return <TransactionCard key={ind} transaction={transaction} status={"Pending"} />
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions