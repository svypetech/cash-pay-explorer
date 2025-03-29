'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import TokenTable from "../../components/tables/tokenTable";
import Pagination from "@/src/components/pagination/pagination";
import images from "../../data/images.json"
import Image from "next/image";
import useFetchTokens from "@/src/hooks/tokens";
import TokenTableSkeleton from "@/src/components/skeletons/token";

const Page = () => {
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [showDark, setShowDark] = useState(darkMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  const [search, setSearch] = useState('');
  const { tokens , totalPages:pages, loading } = useFetchTokens(currentPage, 10);

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="pb-10 p-6 sm:p-8 md:p-10 lg-20">
      <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
        <div className="flex gap-x-20 w-full justify-between items-center">
          <p className="flex-1 font-satoshi text-[20px] md:text-[40px] ">Tokens</p>

          <div className={` hidden ${showDark ? "bg-darkBg" : "bg-white"} flex items-center w-full gap-x-4 justify-center  border ${showDark ? 'border-borderDark' : 'border-black/20'} rounded-lg`}>
            <Image src={showDark ? images.searchIconDark : images.searchIconLight} alt="search" width={15} height={15}
              className="m-1 sm:m-3 w-3 h-3 sm:w-4 sm:h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full p-1 border-none outline-none text:[10px] sm:text-[16px] placeholder:text-[10px] sm:placeholder:text-[16px] focus:ring-0 ${showDark ? "placeholder-white" : "placeholder-gray-500"} `}
            />

          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        </div>

        <div className={` ${showDark ? "bg-darkBg" : "bg-white"} flex items-center w-full gap-x-1 justify-center my-4  border ${showDark ? 'border-borderDark' : 'border-black/20'} rounded-lg`}>
          <Image src={showDark ? images.searchIconDark : images.searchIconLight} alt="search" width={15} height={15}
            className="m-1 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full p-1 border-none outline-none text:[10px] sm:text-[16px] placeholder:text-[10px] sm:placeholder:text-[16px] focus:ring-0 ${showDark ? "placeholder-white" : "placeholder-gray-500"} `}
          />

        </div>
        <div className=" my-4">
          {loading ? (
            <TokenTableSkeleton />
          ) : (
            <TokenTable filter={search} tokens={tokens} />
          )}
        </div>
      </div>

    </div>
  );
};

export default Page
