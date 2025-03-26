"use client";
import Topcards from "../components/home/topcards";
import SearchField from "../components/home/searchField";
import Blocks from "../components/home/blocks";
import Transactions from "../components/home/transactions";
import { useState } from "react";
import useFetchBlocks from "../hooks/blocks";
import useFetchTransactions from "../hooks/transactions";


export default function Page() {
  const [search, setSearch] = useState('')
  const { blocks, loading } = useFetchBlocks(1, 4);
  const { transactions, loading: loading2 } = useFetchTransactions(1, 4);

  const topCards = [
    { name: "Average block time", number: "10 seconds" },
    { name: "Total Transactions", number: "76,655" },
    { name: "Total Blocks", number: "128,879" },
    { name: "Wallet Addresses", number: "45,087" },
  ];

  return (
    <div className=" flex flex-col items-between justify-between">
      <Topcards topCards={topCards} />
      <SearchField search={search} setSearch={setSearch} />
      <Blocks blocks={blocks} loading={loading} />
      <Transactions transactions={transactions} loading={loading2} />
    </div>
  );
}
