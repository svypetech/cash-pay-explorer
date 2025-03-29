import { convertTimestamp, Transaction } from "@/src/types/types";



interface TransactionDetailsProps {
    transaction: Transaction;
    showDark: boolean | null;   
    status?: string;
}

export default function PendingTransactionDetails({
    transaction,
    showDark,
    status,

}: TransactionDetailsProps) {
    
    const timestamp = transaction.timeStamp ? convertTimestamp(transaction?.timeStamp) : null;

    return (
        <div className="rounded-2xl border border-gray-200 bg-dark p-8">
            <h2 className="text-darkText font-[Satoshi] text-[1.75rem] font-bold leading-[normal] mb-6">Transaction Details</h2>

            <div className="space-y-4">
                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Transaction Hash</div>
                    <div className={`max-w-full overflow-hidden break-words text-[12px] sm:text-[16px] ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.hash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Status</div>
                    {status === "Success" ? (
                        <div className={`p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-green text-green2 font-semibold`}>{status}</div>
                    ) : (
                        <div className={`p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-secondary2 text-skyblue font-semibold`}>{status}</div>
                    )}
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Block Hash</div>
                    <div className={`max-w-full overflow-hidden break-words text-[12px] sm:text-[16px] ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.blockHash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Block Number</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.blockNumber}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">To</div>
                    <div className={`max-w-full overflow-hidden break-words text-[12px] sm:text-[16px] ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.to}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">From</div>
                    <div className={`max-w-full overflow-hidden break-words text-[12px] sm:text-[16px] ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.from}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Transaction Index</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.transactionIndex}</div>
                </div>
                
                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Value</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.value} USDT</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Gas</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.gas}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Gas Price</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.gasPrice}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Max Fee Per Gas</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.maxFeePerGas ? transaction.maxFeePerGas : "N/A"}</div>
                </div>

                {/* <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Input</div>
                    <div className="max-w-full overflow-hidden break-words text-[12px] sm:text-[16px]">{transaction.input}</div>
                </div> */}

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Nonce</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.nonce}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Type</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.type}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 text-gray-500">Chain Id</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]" >{transaction.chainId}</div>
                </div>
                
            </div>
        </div>
    )
}

