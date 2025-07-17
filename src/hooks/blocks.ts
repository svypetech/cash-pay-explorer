import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Block } from '../types/types';

const useFetchBlocks = (page: number, limit: number) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    async function fetchData(retryCount = 0) {
      const maxRetries = 3;
      const retryDelay = 2000; // 2 seconds delay

      if (retryCount === 0) {
        setLoading(true);
        setError(null);
      }

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/blocks?page=${page}&limit=${limit}`);
        
        if (isMounted.current) {
          // Check if the response has an error
          if (response.data.success === false || response.data.error) {
            console.warn('API returned error:', response.data.error);
            setError("Unable to fetch blocks. Please try again.");
            
            if (retryCount < maxRetries) {
              console.log(`Retrying... Attempt ${retryCount + 1}/${maxRetries}`);
              setTimeout(() => {
                fetchData(retryCount + 1);
              }, retryDelay);
              return;
            } else {
              setBlocks([]);
              setTotalPages(page);
              setLoading(false);
            }
          }
          // Check if blocks is actually an array
          else if (Array.isArray(response.data.data.blocks)) {
            setTotalPages(response.data.data.totalPages || page + 1);
            setBlocks(response.data.data.blocks);
            setError(null);
            setLoading(false);
            console.log("Fetched blocks:", response.data.data.blocks);
          } else {
            console.warn('Blocks is not an array:', response.data.data.blocks);
            setError("Unable to fetch blocks. Please try again.");
            
            if (retryCount < maxRetries) {
              console.log(`Retrying... Attempt ${retryCount + 1}/${maxRetries}`);
              setTimeout(() => {
                fetchData(retryCount + 1);
              }, retryDelay);
              return;
            } else {
              setBlocks([]);
              setTotalPages(page);
              setLoading(false);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch blocks:", error);
        
        if (retryCount < maxRetries) {
          console.log(`Retrying due to error... Attempt ${retryCount + 1}/${maxRetries}`);
          setTimeout(() => {
            fetchData(retryCount + 1);
          }, retryDelay);
          return;
        } else {
          if (isMounted.current) {
            setError("Unable to fetch blocks. Please try again.");
            setBlocks([]);
            setTotalPages(page);
            setLoading(false);
          }
        }
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [page, limit]);

  return { blocks, totalPages, loading, error };
};

export default useFetchBlocks;
