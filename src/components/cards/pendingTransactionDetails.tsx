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
                    <div className="w-32 flex-shrink-0 text-gray-500">Transaction Hash</div>
                    <div className={`max-w-full overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.hash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Status</div>
                    {status === "Success" ? (
                        <div className={`p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-green text-green2 font-semibold`}>{status}</div>
                    ) : (
                        <div className={`p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-secondary2 text-skyblue font-semibold`}>{status}</div>
                    )}
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Block Hash</div>
                    <div className={`max-w-full overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.blockHash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Block Number</div>
                    <div>{transaction.blockNumber}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">To</div>
                    <div className={`max-w-full overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.to}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">From</div>
                    <div className={`max-w-full overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.from}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Transaction Index</div>
                    <div>{transaction.transactionIndex}</div>
                </div>
                
                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Value</div>
                    <div>{transaction.value} USDT</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Gas</div>
                    <div>{transaction.gas}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Gas Price</div>
                    <div>{transaction.gasPrice}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Max Fee Per Gas</div>
                    <div>{transaction.maxFeePerGas ? transaction.maxFeePerGas : "N/A"}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Input</div>
                    <div className="max-w-full overflow-hidden break-words">{transaction.input}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Nonce</div>
                    <div>{transaction.nonce}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Type</div>
                    <div>{transaction.type}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Chain Id</div>
                    <div>{transaction.chainId}</div>
                </div>
                
            </div>
        </div>
    )
}

