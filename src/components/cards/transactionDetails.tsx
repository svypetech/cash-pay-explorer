import { convertTimestamp, Transaction } from "@/src/types/types";



interface TransactionDetailsProps {
    transaction: Transaction;
    showDark: boolean | null;
    result?: string;
    status?: string;
}

export default function TransactionDetails({
    transaction,
    showDark,
    result,
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
                    <div className="w-32 flex-shrink-0 text-gray-500">Result</div>
                    {result === "Success" ? (
                        <div className="flex gap-2 ">
                            <img src="/icons/tick-circle.svg" alt="success" className="h-5 w-5" />
                            <div className={`text-[12px] sm:text-[16px] rounded-lg text-green2 font-semibold font-[poppins]`}>{result}</div>
                        </div>
                    ) : (
                        <div className={`p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-secondary2 text-skyblue font-semibold`}>{result}</div>
                    )}
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Status</div>
                    {status === "Confirmed" ? (
                        <div className={`p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-green text-green2 font-semibold`}>{status}</div>
                    ) : (
                        <div className={`p-2 px-4 text-[12px] sm:text-[16px] sm:px-6 rounded-lg bg-secondary2 text-skyblue font-semibold`}>{status}</div>
                    )}
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Timestamp</div>
                    <div>
                        {timestamp?.timeAgo} | {timestamp?.date} | Confirmed within {timestamp?.confirmationTime}
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Number</div>
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
                    <div className="w-32 flex-shrink-0 text-gray-500">Value</div>
                    <div>{transaction.value ? transaction.value : "N/A"} USDT</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Gas</div>
                    <div>{transaction.gas}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Gas Used</div>
                    <div>{transaction.gasUsed}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Trace Id</div>
                    <div>
                        {transaction.traceId}
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Type</div>
                    <div>
                        {transaction.type}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

