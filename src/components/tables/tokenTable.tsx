'use client'
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../app/context/DarkModeContext";


interface TokenTableProps {
    name: string;
    address: string,
    totalSupply: string,
    holderCount: string
}

interface TokenProps {
    data: TokenTableProps[];
}

const TokenTable: React.FC<TokenProps> = ({ data }) => {
    const { darkMode } = useDarkMode(); // Get dark mode state
    const [showDark, setShowDark] = useState(darkMode);

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);

    useEffect(() => {
        console.log("data", data)
    }, [])



    return (
        <div className={`flex-1 rounded-lg shadow-lg w-full`} style={{ boxShadow: "0px 0px 12px 2px rgba(0, 0, 0, 0.06)" }}>
            {/* Table */}
            <div className="shadow-md rounded-lg overflow-hidden w-full">
                <table className="w-full text-left table-fixed min-w-30">
                    <thead className="bg-secondary/10">
                        <tr className="font-satoshi text-[12px] sm:text-[16px] p-2 sm:p-4">
                            <th className="p-2 sm:p-4 text-left w-1/5 sm:w-2/6">Token</th>
                            <th className="p-2 sm:p-4 text-left w-1/5 sm:w-3/6">Address</th>
                            <th className="p-2 sm:p-4 text-left w-1/5 sm:w-2/6">Total Supply</th>
                            <th className="p-2 sm:p-4 text-left w-1/5 sm:w-1/6">Holders Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) &&
                            data.map((token, index) => (
                                <tr key={index} className="border-b text-[12px] sm:text-[16px]">
                                    <td className={`p-2 sm:p-4 font-satoshi ${showDark? "text-secondary": "text-primary"} font-semibold w-2/6 min-w-0 break-words`}>
                                        {token.name}
                                    </td>
                                    <td className={`p-2 sm:p-4 font-satoshi ${showDark? "text-secondary": "text-primary"} w-3/6 min-w-0 break-words`}>
                                        {token.address}
                                    </td>
                                    <td className="p-2 sm:p-4 font-satoshi w-2/6 min-w-0 break-words">
                                        {token.totalSupply}
                                    </td>
                                    <td className="p-2 sm:p-4 font-satoshi w-1/6 min-w-0 text-right">
                                        {token.holderCount}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default TokenTable;
