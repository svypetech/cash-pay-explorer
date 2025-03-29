import { formatDistanceStrict } from 'date-fns';

export interface Transaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  contractAddress: string;
  input: string;
  type: string;
  gas: string;
  gasUsed: string;
  traceId: string;
  isError: string;
  errCode: string;
}

export interface Block {
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
  timestamp: number;
  totalDifficulty: string;
  transactions: string[];
};

export function getTimeAgo(timestamp: number) {
  const now = new Date();
  const date = new Date(timestamp * 1000);

  const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  }

  return formatDistanceStrict(date, now, { addSuffix: true });
}

export const convertTimestamp = (timestamp: string) => {
    const timestampMs = Number(timestamp) * 1000;
    const date = new Date(timestampMs);
  
    const now = Date.now();
    const timeDifference = Math.floor((now - timestampMs) / 1000); // in seconds
  
    // Time ago (in hours, days, etc.)
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    let timeAgo = '';
    if (timeDifference < 60) {
      timeAgo = rtf.format(-timeDifference, 'second');
    } else if (timeDifference < 3600) {
      timeAgo = rtf.format(-Math.floor(timeDifference / 60), 'minute');
    } else if (timeDifference < 86400) {
      timeAgo = rtf.format(-Math.floor(timeDifference / 3600), 'hour');
    } else {
      timeAgo = rtf.format(-Math.floor(timeDifference / 86400), 'day');
    }
  
    // Format date string
    const dateString = date.toLocaleString('en-US', {
      timeZone: 'UTC',
      hour12: true,
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  
    // Confirmation time (example: fixed or calculated based on your logic)
    const confirmationTime = `${(Math.random() * 10).toFixed(1)} seconds`;
  
    return {
      timeAgo,
      date: dateString,
      confirmationTime
    };
  };

  export const convertGasUsed = (gasUsed: string, gasLimit: string) => {
    const used = Number(gasUsed);
    const limit = Number(gasLimit);
  
    if (!used || !limit) return { value: undefined, percentage: undefined };
  
    const percentage = ((used / limit) * 100).toFixed(1) + '%';
  
    return {
      value: used,
      percentage,
    };
  };
