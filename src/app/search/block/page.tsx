"use client";

import { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useSearchParams } from "next/navigation";
import SearchBlockDetails, { SearchBlock } from "@/src/components/cards/searchBlocks";

const page = () => {
    const { darkMode } = useDarkMode();
    const [showDark, setShowDark] = useState(darkMode);
    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    // Decode and parse the JSON string
    const block : SearchBlock = data ? JSON.parse(decodeURIComponent(data)) : null;
    console.log("Block data: ", block);

    useEffect(() => {
        // Delay state update slightly to enable smooth transition
        const timeout = setTimeout(() => setShowDark(darkMode), 100);
        return () => clearTimeout(timeout);
    }, [darkMode]);

    if (!block) {
        return <div className="flex justify-center items-center min-h-screen text-darkText font-bold bg-dark">Block details not found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-dark p-3 md:p-10">
            <SearchBlockDetails block={block} showDark={showDark} />
        </div>
    );
}

export default page;    