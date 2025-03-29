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
  const { blocks, loading, totalPages:pages } = useFetchBlocks(currentPage, 10);

  useEffect(() => {
    if(pages) {
      setTotalPages(pages);
    }
  }, [pages])

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
          {
            loading ?
            Array.from({length: 10}).map((_,ind) => {
              return <BlockCardSkeleton key={ind} />
            })
            :
            blocks.map((block, ind) => { // @ts-ignore
              return <BlockCard key={ind} block={block} />
            })
          }
        </div>
      </div>

    </div>
  );
};

export default Page
