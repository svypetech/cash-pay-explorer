
export interface TransactionReceipt {
    blockHash: string;
    blockNumber: string;
    contractAddress: string | null;
    cumulativeGasUsed: string;
    effectiveGasPrice: string;
    from: string;
    gasUsed: string;
    logs?: Array<any>;
    logsBloom: string;
    to?: string;
    transactionHash: string;
    transactionIndex: string;
    type?: string;
    status?: string;
  }

interface TransactionDetailsProps {
    transaction: TransactionReceipt;
    showDark: boolean | null;
}

export default function SearchTransactionDetails({
    transaction,
    showDark,

}: TransactionDetailsProps) {


    return (
        <div className="rounded-2xl border border-gray-200 bg-dark p-8">
            <h2 className="text-darkText font-[Satoshi] text-[1.75rem] font-bold leading-[normal] mb-6">Transaction Details</h2>

            <div className="space-y-4">

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Transaction Hash</div>
                    <div className={`max-w-full text-[12px] sm:text-[16px] overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.transactionHash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Block Hash</div>
                    <div className={`max-w-full text-[12px] sm:text-[16px] overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.blockHash}</div>
                </div>
                
                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Success</div>
                    {transaction.status && (
                        <div className="flex gap-2 ">
                            <img src="/icons/tick-circle.svg" alt="success" className="h-5 w-5" />
                            <div className={`text-[12px] sm:text-[16px] rounded-lg text-green2 font-semibold`}>{"Success"}</div>
                        </div>
                    )}
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Number</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.blockNumber}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">To</div>
                    <div className={`max-w-full text-[12px] sm:text-[16px] overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.to}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">From</div>
                    <div className={`max-w-full text-[12px] sm:text-[16px] overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{transaction.from}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Transaction Index</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.transactionIndex}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Block Number</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.blockNumber}</div>
                </div>

                {transaction.contractAddress && <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Contract Address</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.contractAddress}</div>
                </div>}

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Gas Used</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.gasUsed}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Cumulative Gas Used</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.cumulativeGasUsed}</div>
                </div>  

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Effective Gas Price</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.effectiveGasPrice}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Input</div>
                    <div className="max-w-full text-[12px] sm:text-[16px] overflow-hidden break-words">{transaction.transactionHash}</div>
                </div>  

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Nonce</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.transactionIndex}</div>
                </div>                                            

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Gas</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.gasUsed}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Gas Price</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.effectiveGasPrice}</div>
                </div>


                <div className="flex items-start">
                    <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500">Type</div>
                    <div className="flex-wrap break-words text-[12px] sm:text-[16px]">{transaction.type}</div>
                </div>
                
            </div>
        </div>
    )
}

