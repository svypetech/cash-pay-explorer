export interface SearchBlock {
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: number; 
  transactionsRoot: string;
}

export default function SearchBlockDetails({
    block,
    showDark,
  }: {
    block: SearchBlock;
    showDark: boolean | null;
  }) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-dark p-8">
        <h2 className="text-darkText font-[Satoshi] text-[1.75rem] font-bold leading-[normal] mb-6">
          Block Details
        </h2>
  
        <div className="space-y-4">
          {Object.entries(block)
            .filter(([key]) => key !== "extraData" && key !== "sha3Uncles") // Skip specific fields
            .map(([key, value]) => (
              <div key={key} className="flex items-start gap-2">
                <div className="w-20 sm:w-32 text-[12px] sm:text-[16px] flex-shrink-0 flex-wrap break-words text-gray-500 capitalize">
                  {key !== "uncles" && key.replace(/([A-Z])/g, " $1")}
                </div>
                <div
                  className={`max-w-full text-[12px] sm:text-[16px] overflow-hidden break-words ${
                    typeof value === "string" && value.length >= 20
                      ? `${showDark ? "text-skyblue" : "text-primary"}`
                      : "text-darkText"
                  }`}
                >
                  {value}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  