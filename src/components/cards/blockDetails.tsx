


interface BlockDetailsProps {
    blockHash?: string
    parentHash?: string
    timestamp?: {
        timeAgo: string
        date: string
        confirmationTime: string
    }
    transactions?: number
    size?: string
    difficulty?: number
    totalDifficulty?: string
    gasUsed?: {
        value?: number
        percentage?: string
    }
    gasLimit?: number
    nonce?: string
    showDark: boolean | null
    stateRoot: string;
    baseFeePerGas: string;
    extraData: string;
    logsBloom: string;
    miner: string;
    mixHash: string;
    number: string;
    receiptsRoot: string;
}

export default function BlockDetails({
    blockHash,
    parentHash,
    timestamp,
    transactions,
    size,
    difficulty,
    totalDifficulty,
    gasUsed,
    gasLimit,
    nonce,
    stateRoot,
    baseFeePerGas,
    extraData,
    logsBloom,
    miner,
    mixHash,
    number,
    receiptsRoot,
    showDark
}: BlockDetailsProps) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-dark p-8">
            <h2 className="text-darkText font-[Satoshi] text-[1.75rem] font-bold leading-[normal] mb-6">Block Details</h2>

            <div className="space-y-4">
                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Block Hash</div>
                    <div className={`max-w-full overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{blockHash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Parent Hash</div>
                    <div className={`max-w-full overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`} break-all`}>{parentHash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Block Mix-Hash</div>
                    <div className={`max-w-full overflow-hidden break-words ${showDark ? `text-skyblue` : `text-primary`}`}>{mixHash}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Timestamp</div>
                    <div>
                        {timestamp?.timeAgo} | {timestamp?.date} | Confirmed within {timestamp?.confirmationTime}
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Transactions</div>
                    <div>
                        <span className={`${showDark ? "bg-gray-500" : "bg-gray-200"} px-2 py-1 rounded`}>{transactions?.toLocaleString()} Transactions</span>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Size</div>
                    <div>{size}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Difficulty</div>
                    <div>{difficulty}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Total Difficulty</div>
                    <div>{totalDifficulty}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Gas Used</div>
                    <div>
                        {gasUsed?.value?.toLocaleString()} | {gasUsed?.percentage}
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Gas Limit</div>
                    <div>{gasLimit?.toLocaleString()}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Base Fee Per Gas</div>
                    <div>{baseFeePerGas}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Extra Data</div>
                    <div className="max-w-full overflow-hidden break-words">{extraData}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Logs Bloom</div>
                    <div className="max-w-full overflow-hidden break-words">{logsBloom}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Miner</div>
                    <div className="max-w-full overflow-hidden break-words">{miner}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Number</div>
                    <div>{number}</div>
                </div>
                
                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">State Root</div>
                    <div className="max-w-full overflow-hidden break-words">{stateRoot}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Receipts Root</div>
                    <div className="max-w-full overflow-hidden break-words">{receiptsRoot}</div>
                </div>

                <div className="flex items-start">
                    <div className="w-32 flex-shrink-0 text-gray-500">Nonce</div>
                    <div>{nonce}</div>
                </div>
            </div>
        </div>
    )
}

