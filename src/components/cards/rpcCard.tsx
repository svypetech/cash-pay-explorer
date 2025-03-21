import { useDarkMode } from "@/src/app/context/DarkModeContext";
import { useEffect, useState } from "react";

function ETH_RPC_Block() {
  const { darkMode } = useDarkMode()
  const [showDark, setShowDark] = useState(darkMode)

  useEffect(() => {
    // Delay state update slightly to enable smooth transition
    const timeout = setTimeout(() => setShowDark(darkMode), 100);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  return (
    <div className="md:w-auto max-w-[1280px] flex flex-col items-center gap-10 py-5 rounded-[20px] bg-dark my-5 mx-8 md:mx-20">
      {/* First Section border-[#000000]/[.20]*/}
      <div className="flex flex-col items-start gap-5 p-5 sm:p-10 rounded-[1.25rem] border border-gray-300 w-full">
        <div className="text-darkText font-[Satoshi] text-[1.75rem] font-bold leading-[normal]">
          ETH RPC API Documentation
        </div>
        <div className={`text-xl font-poppins ${showDark ? `text-skyblue` : `text-primary`}`}>
          [ Base URL: https://localhost:4000/api/eth-rpc ]
        </div>
        <div className="self-stretch text-darkText font-[Satoshi] leading-[normal]">
          This API is provided to support some rpc methods in the exact format specified for ethereum nodes, which can be found&nbsp;here.&nbsp;This is useful to allow sending requests to blockscout without having to change anything about the request. However, in general, the&nbsp;custom RPC&nbsp;is recommended. Anything not in this list is not supported. Click on the method to be taken to the documentation for that method, and check the notes section for any potential differences.
        </div>
      </div>

      {/* eth_blockNumber Section */}
      <div className="flex flex-col items-start gap-5 p-5 sm:p-10 rounded-[1.25rem] border border-gray-300 w-full">
        <div className="flex items-center justify-between self-stretch">
          <div className="text-darkText font-[Satoshi] text-2xl font-bold leading-[normal]">
            eth_blockNumber
          </div>
          <div className={`rounded-md ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} bg-opacity-10 py-2 px-3 hover:bg-opacity-20 leading-[normal] font-semibold break-words overflow-x-auto whitespace-pre-wrap`}>
            POST
          </div>
        </div>
        <div className={`rounded-md ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} bg-opacity-10 py-2 px-3 hover:bg-opacity-20 font-[lucida] leading-[normal] break-words overflow-x-auto whitespace-pre-wrap`}>
          curl -X POST --data {'{"id":0,"jsonrpc":"2.0","method": "eth_blockNumber","params": []}'}
        </div>
        <div className="flex items-start gap-2.5 py-3 px-5 w-[839px] rounded-lg  text-darkText font-[lucida] leading-[normal]">
          {'{'}
          "id": 0,<br />
          "jsonrpc": "2.0",<br />
          "method": "eth_blockNumber",<br />
          "params": []<br />
          {'}'}
        </div>
      </div>

      {/* eth_getBalance Section */}
      <div className="flex flex-col items-start gap-5 p-5 sm:p-10 rounded-[1.25rem] border border-gray-300 w-full bg-dark">
        <div className="flex items-center justify-between self-stretch">
          <div className="text-darkText font-[Satoshi] text-2xl font-bold leading-[normal]">
            eth_getBalance
          </div>
          <div className={`rounded-md ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} bg-opacity-10 py-2 px-3 hover:bg-opacity-20 font-semibold leading-[normal]`}>
            POST
          </div>
        </div>
        <div className={`rounded-md ${showDark ? `text-skyblue bg-[#2156C11A]` : `text-primary bg-[#27aae11a]`} bg-opacity-10 py-2 px-3 hover:bg-opacity-20 font-[lucida] leading-[normal] break-words overflow-x-auto whitespace-pre-wrap`}>
          {'curl -X POST --data {"id":0,"jsonrpc":"2.0","method": "eth_blockNumber","params": []}'}
        </div>
        <div className="flex items-start gap-2.5 py-3 px-5 w-full max-w-[839px] rounded-lg text-darkText font-[lucida] leading-[normal] break-words overflow-x-auto">
          {'{'}
          "id": 0,<br />
          "jsonrpc": "2.0",<br />
          "method": "eth_getBalance",<br />
          "params": [<br />
          &nbsp;&nbsp;&nbsp;&nbsp;"0x0000000000000000000000000000000000000007",<br />
          &nbsp;&nbsp;&nbsp;&nbsp;"latest"<br />
          ]<br />
          {'}'}
        </div>
      </div>
    </div>
  );
}

export default ETH_RPC_Block