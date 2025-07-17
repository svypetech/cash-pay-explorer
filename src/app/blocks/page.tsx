'use client'
import React, { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import BlockCard from "@/src/components/cards/blockCard2";
import Pagination from "@/src/components/pagination/pagination";
import useFetchBlocks from "@/src/hooks/blocks";
import BlockCardSkeleton from "@/src/components/skeletons/block";

const Page = () => {
  const { darkMode } = useDarkMode(); 
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { blocks, loading, totalPages: pages, error } = useFetchBlocks(currentPage, 10);

  useEffect(() => {
    // Handle error states and update total pages
    if (!loading) {
      if (error || !Array.isArray(blocks)) {
        setTotalPages(currentPage);
      } else if (blocks.length === 0) {
        setTotalPages(currentPage);
      } else {
        setTotalPages(pages || currentPage);
      }
    }
  }, [blocks, loading, pages, currentPage, error]);

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="pb-10 p-6 sm:p-8 md:p-10 lg-20">
      <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
        <div className="flex gap-x-2 w-full justify-between items-center">
          <p className="flex-1 font-satoshi text-[20px] md:text-[40px] ">Blocks</p>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 gap-x-4 lg:gap-x-16 my-4">
          {loading ? (
            Array.from({length: 10}).map((_, ind) => {
              return <BlockCardSkeleton key={ind} />
            })
          ) : error ? (
            <div className={`col-span-full flex items-center justify-center p-8 rounded-lg ${showDark ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="text-center">
                <div className={`text-6xl mb-4 ${showDark ? "text-gray-600" : "text-gray-400"}`}>
                  ⚠️
                </div>
                <p className={`text-lg font-medium ${showDark ? "text-gray-300" : "text-gray-600"}`}>
                  {error}
                </p>
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
              </div>
            </div>
          ) : blocks.length === 0 ? (
            <div className={`col-span-full flex items-center justify-center p-8 rounded-lg ${showDark ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="text-center">
                <div className={`text-6xl mb-4 ${showDark ? "text-gray-600" : "text-gray-400"}`}>
                  📄
                </div>
                <p className={`text-lg font-medium ${showDark ? "text-gray-300" : "text-gray-600"}`}>
                  No blocks found.
                </p>
              </div>
            </div>
          ) : (
            blocks.map((block, ind) => { // @ts-ignore
              return <BlockCard key={ind} block={block} />
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Page