'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../app/context/DarkModeContext";
import TransactionCard from "../cards/transactionCard";
import Link from "next/link";

interface Transactions {
    transactionHash: string;
    blockNo: string;
    time: string;
    fromAddress: string;
    toAddress: string;
    status:string
}

interface TransactionsProps {
    transactions: Transactions[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
    const { darkMode } = useDarkMode(); // Get dark mode state
    const [showDark, setShowDark] = useState(darkMode);

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);



    return (
        <div className="pb-10 p-6 sm:p-10 md:p-20">
            <div className={`flex flex-col p-4 sm:p-8 rounded-lg ${showDark ? "bg-darkBg" : "border-black/20 border-1 bg-white"}`}>
                <div className="flex flex-wrap justify-between items-center">
                    <p className="font-satoshi text-[28px] md:text-[40px] font-bold">Transactions</p>
                    <Link href="/transactions">
                    <button className={`border ${showDark ? "border-secondary text-secondary" : "border-primary text-primary"} font-bold text-[12px] sm:text-[16px] rounded-sm p-2 px-2 sm:px-4 cursor-pointer`}>
                            View All
                        </button>
                        </Link>
                </div>
                <div className="flex flex-col gap-x-1 sm:gap-x-3 justify-center my-4">
                {
                    transactions.map((val,ind) => {
                        return <TransactionCard key={ind} transactionHash={val.transactionHash} blockNo={val.blockNo} time={val.time} fromAddress={val.fromAddress} toAddress={val.toAddress} status={val.status} />
                    })
                }
                </div>
            </div>

        </div>
    );
};

export default Transactions
