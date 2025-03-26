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
  number: string;
  timestamp: number;
  transactions: any[];
  size: string;
  gasLimit: string;
  gasUsed: string;
}

export function getTimeAgo(timestamp: number) {
  const now = new Date();
  const date = new Date(timestamp * 1000);

  const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  }

  return formatDistanceStrict(date, now, { addSuffix: true });
}
