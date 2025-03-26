import { useEffect, useState } from 'react';
import axios from 'axios';
import { Transaction } from '../types/types';

const useFetchTransactions = (page: number, limit: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/transactions?page=${page}&limit=${limit}`);
        setTotalPages(response.data.data.totalPages);
        setTransactions(response.data.data.transactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return { transactions, totalPages, loading };
};

export default useFetchTransactions;


export function useFetchPendingTransactions (page: number, limit: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/pendingTransactions?page=${page}&limit=${limit}`);
        console.log("RESPONSE: ",response.data);
        setTotalPages(response.data.data.totalPages);
        setTransactions(response.data.data.transactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return { transactions, totalPages, loading };
};

