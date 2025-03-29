import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Transaction } from '../types/types';

const useFetchTransactions = (page: number, limit: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(page + 1);
  
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      setLoading(true);

      try {
        // Fetch current and next page concurrently
        const [currentPageData, nextPageData] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/transactions?page=${page}&limit=${limit}`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/transactions?page=${page + 1}&limit=${limit}`),
        ]);

        if (isMounted.current) {
          setTransactions(currentPageData.data.data.transactions);

          // If next page contains data, increase total pages
          if (nextPageData.data.data.transactions.length > 0) {
            setTotalPages(page + 1);
          }
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [page, limit]);

  return { transactions, totalPages, loading };
};

export default useFetchTransactions;


export function useFetchPendingTransactions(page: number, limit: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(page + 1);
  
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData() {
      setLoading(true);

      try {
        // Fetch current and next page concurrently
        const [currentPageData, nextPageData] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/pendingTransactions?page=${page}&limit=${limit}`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/pendingTransactions?page=${page + 1}&limit=${limit}`)
        ]);

        if (isMounted.current) {
          setTransactions(currentPageData.data.data.transactions);

          // If next page contains data, increase total pages
          if (nextPageData.data.data.transactions.length > 0) {
            setTotalPages(page + 1);
          }
        }
      } catch (error) {
        console.error("Failed to fetch pending transactions:", error);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [page, limit]);

  return { transactions, totalPages, loading };
}

export function useFetchDashboardTransactions() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/transactions?page=1&limit=4`);
        setTransactions(response.data.data.transactions);
      } catch (error) {
        console.error("Failed to fetch dashboard transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { transactions, loading };
}