"use client";

import BlockDetails from "@/src/components/cards/blockDetails";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { Transaction } from "@/src/types/types";
import { useSearchParams } from "next/navigation";
import TransactionDetails from "@/src/components/cards/transactionDetails";
import { stat } from "fs";
import PendingTransactionDetails from "@/src/components/cards/pendingTransactionDetails";

const page = () => {
    const { darkMode } = useDarkMode();
    const [showDark, setShowDark] = useState(darkMode);
    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    // Decode and parse the JSON string
    const { transaction, status }: {transaction:Transaction, status:string} = data ? JSON.parse(decodeURIComponent(data)) : null;
    console.log("Transaction Details: ", transaction, status);

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);

    if (!transaction) {
        return <div className="flex justify-center items-center min-h-screen text-black">No Transaction details available</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-dark p-3 md:p-10">
            {status === "Success" ? (
                <TransactionDetails transaction={transaction} showDark={showDark} status={"Confirmed"} result={status} />
            ) : (
                <PendingTransactionDetails transaction={transaction} showDark={showDark} status={status} />
            )}
            
        </div>
    );
}

export default page;    