"use client";

import BlockDetails from "@/src/components/cards/blockDetails";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useSearchParams } from "next/navigation";
import SearchTransactionDetails, { TransactionReceipt } from "@/src/components/cards/searchTransactions";

const page = () => {
    const { darkMode } = useDarkMode();
    const [showDark, setShowDark] = useState(darkMode);
    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    // Decode and parse the JSON string
    const transaction : TransactionReceipt = data ? JSON.parse(decodeURIComponent(data)) : null;

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);

    if (!transaction) {
        return <div className="flex justify-center items-center min-h-screen text-darkText font-bold bg-dark">Transaction details not found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-dark p-3 md:p-10">
            <SearchTransactionDetails transaction={transaction} showDark={showDark} />
        </div>
    );
}

export default page;    