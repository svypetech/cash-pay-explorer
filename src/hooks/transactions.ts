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

    async function fetchData(retryCount = 0) {
      const maxRetries = 3;
      const retryDelay = 100; // 2 seconds delay

      if (retryCount === 0) {
        setLoading(true);
      }

      try {
        // Fetch only current page
        const currentPageData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/transactions?page=${page}&limit=${limit}`);

        if (isMounted.current) {
          // Check if transactions is actually an array
          if (Array.isArray(currentPageData.data.data.transactions)) {
            console.log('Current Page Data:', currentPageData.data.data.transactions);
            setTransactions(currentPageData.data.data.transactions);
            
            // Always set total pages to page + 1
            setTotalPages(page + 1);
            setLoading(false);
          } else {
            console.warn('Transactions is not an array:', currentPageData.data.data.transactions);
            
            if (retryCount < maxRetries) {
              console.log(`Retrying... Attempt ${retryCount + 1}/${maxRetries}`);
              setTimeout(() => {
                fetchData(retryCount + 1);
              }, retryDelay);
              return;
            } else {
              console.error('Max retries reached. Setting empty array as fallback.');
              setTransactions([]);
              setLoading(false);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        
        if (retryCount < maxRetries) {
          console.log(`Retrying due to error... Attempt ${retryCount + 1}/${maxRetries}`);
          setTimeout(() => {
            fetchData(retryCount + 1);
          }, retryDelay);
          return;
        } else {
          console.error('Max retries reached after error. Setting empty array as fallback.');
          if (isMounted.current) {
            setTransactions([]);
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

    async function fetchData(retryCount = 0) {
      const maxRetries = 3;
      const retryDelay = 2000; // 2 seconds delay

      if (retryCount === 0) {
        setLoading(true);
      }

      try {
        // Fetch only current page
        const currentPageData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/pendingTransactions?page=${page}&limit=${limit}`);

        if (isMounted.current) {
          // Check if transactions is actually an array
          if (Array.isArray(currentPageData.data.data.transactions)) {
            console.log('Pending Transactions:', currentPageData.data.data.transactions);
            setTransactions(currentPageData.data.data.transactions);
            
            // Always set total pages to page + 1
            setTotalPages(page + 1);
            setLoading(false);
          } else {
            console.warn('Pending transactions is not an array:', currentPageData.data.data.transactions);
            
            if (retryCount < maxRetries) {
              console.log(`Retrying... Attempt ${retryCount + 1}/${maxRetries}`);
              setTimeout(() => {
                fetchData(retryCount + 1);
              }, retryDelay);
              return;
            } else {
              console.error('Max retries reached. Setting empty array as fallback.');
              setTransactions([]);
              setLoading(false);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch pending transactions:", error);
        
        if (retryCount < maxRetries) {
          console.log(`Retrying due to error... Attempt ${retryCount + 1}/${maxRetries}`);
          setTimeout(() => {
            fetchData(retryCount + 1);
          }, retryDelay);
          return;
        } else {
          console.error('Max retries reached after error. Setting empty array as fallback.');
          if (isMounted.current) {
            setTransactions([]);
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

  return { transactions, totalPages, loading };
}


export function useFetchDashboardTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(retryCount = 0) {
      const maxRetries = 3;
      const retryDelay = 2000; // 2 seconds delay

      // Only set loading to true on the first attempt
      if (retryCount === 0) {
        setLoading(true);
      }
      
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/transactions?page=1&limit=4`);
        
        // Check if transactions is actually an array
        if (Array.isArray(response.data.data.transactions)) {
          setTransactions(response.data.data.transactions);
          setLoading(false); // Set loading to false when successful
        } else {
          console.warn('Transactions is not an array:', response.data.data.transactions);
          
          // If it's a rate limit error and we haven't exceeded max retries
          if (retryCount < maxRetries) {
            console.log(`Retrying... Attempt ${retryCount + 1}/${maxRetries}`);
            setTimeout(() => {
              fetchData(retryCount + 1);
            }, retryDelay);
            return; // Don't set loading to false yet
          } else {
            console.error('Max retries reached. Setting empty array as fallback.');
            setTransactions([]);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dashboard transactions:", error);
        
        // Retry on network errors too
        if (retryCount < maxRetries) {
          console.log(`Retrying due to error... Attempt ${retryCount + 1}/${maxRetries}`);
          setTimeout(() => {
            fetchData(retryCount + 1);
          }, retryDelay);
          return; // Don't set loading to false yet
        } else {
          console.error('Max retries reached after error. Setting empty array as fallback.');
          setTransactions([]);
          setLoading(false);
        }
      }
    }

    fetchData();
  }, []);

  return { transactions, loading };
}