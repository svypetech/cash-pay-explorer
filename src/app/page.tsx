"use client";
import Topcards, { TopCardsProps } from "../components/home/topcards";
import SearchField from "../components/home/searchField";
import Blocks from "../components/home/blocks";
import Transactions from "../components/home/transactions";
import { useState } from "react";
import useFetchBlocks from "../hooks/blocks";
import useFetchTransactions, { useFetchDashboardTransactions } from "../hooks/transactions";
import useFetchDashboardStats from "../hooks/dashboardStats";


export default function Page() {
  const [search, setSearch] = useState('')
  const { blocks, loading } = useFetchBlocks(1, 4);
  const { transactions, loading: loading2 } = useFetchDashboardTransactions(); 
  const { data , loading: loading3 } = useFetchDashboardStats();

  return (
    <div className=" flex flex-col items-between justify-between">
      <Topcards data={data} loading={loading3} />
      <SearchField search={search} setSearch={setSearch} />
      <Blocks blocks={blocks} loading={loading} />
      <Transactions transactions={transactions} loading={loading2} />
    </div>
  );
}
