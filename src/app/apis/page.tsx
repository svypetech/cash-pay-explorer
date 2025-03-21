'use client'

import React, { useEffect, useState } from 'react'
import GraphQLComponent from '@/src/components/cards/graphqlCard';
import ETH_RPC_Block from '@/src/components/cards/rpcCard';
import AccountEndpoints from '@/src/components/cards/accountEndpoints';
import ApiOverview from '@/src/components/cards/apiOverview';
import { useDarkMode } from '../context/DarkModeContext';

const page = () => {
  const { darkMode } = useDarkMode()
  const [showDark, setShowDark] = useState(darkMode)

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="flex flex-col gap-5 font-satoshi">
      {/* <ApiOverview showDark={showDark} /> */}
      {/* <AccountEndpoints showDark={showDark} /> */}
      {/* <ETH_RPC_Block /> */}
      <GraphQLComponent />
    </div>
  )
}

export default page
