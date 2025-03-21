'use client'

import React, { useEffect, useState } from 'react'
import { useDarkMode } from "../context/DarkModeContext";
import ETH_RPC_Block from '@/src/components/cards/rpcCard';
import GraphQLComponent from '@/src/components/cards/graphqlCard';

const page = () => {
  const { darkMode } = useDarkMode()
  const [showDark, setShowDark] = useState(darkMode)
  // const [queryArray, setQueryArray] = useState([{
  //   name: "",
  //   url: "",
  //   WsUrl: "",
  //   headers: []
  // }])

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="flex flex-col gap-5 font-satoshi">
      <GraphQLComponent />
    </div>
  )
}

export default page
