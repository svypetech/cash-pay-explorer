import { useEffect, useState } from 'react';
import axios from 'axios';
import { Block } from '../types/types';

const useFetchBlocks = (page: number, limit: number) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/blocks?page=${page}&limit=${limit}`);
        setTotalPages(response.data.data.totalPages);
        setBlocks(response.data.data.blocks);
        console.log("Fetched blocks:", response.data.data.blocks);
      } catch (error) {
        console.error("Failed to fetch blocks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return { blocks, totalPages, loading };
};

export default useFetchBlocks;
