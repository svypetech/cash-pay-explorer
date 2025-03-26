import { useEffect, useState } from 'react';
import axios from 'axios';
import { Transaction } from '../types/types';

const useFetchTokens = (page: number, limit: number) => {
  const [tokens, setTokens] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/tokens?page=${page}&limit=${limit}`);
        console.log("RESPONSE: ",response.data);
        setTotalPages(response.data.data.totalPages);
        setTokens(response.data.data.blocks);
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return { tokens, totalPages, loading };
};

export default useFetchTokens;
