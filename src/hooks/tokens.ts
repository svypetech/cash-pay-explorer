import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Token, Transaction } from '../types/types';

const useFetchTokens = (page: number, limit: number) => {
  const [tokens, setTokens] = useState<Token[]>([]);
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
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/tokens?page=${page}&limit=${limit}`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/tokens?page=${page + 1}&limit=${limit}`),
        ]);

        if (isMounted.current) {
          console.log('Current Page Data:', currentPageData.data.data.blocks);
          setTokens(currentPageData.data.data.blocks);

          // If next page contains data, increase total pages
          if (nextPageData.data.data.blocks.length > 0) {
            setTotalPages(page + 1);
          }
        }
      } catch (error) {
        console.error('Failed to fetch Token:', error);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [page, limit]);

  return { tokens, totalPages, loading };
};

export default useFetchTokens;