import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchTransactions = (page: number, limit: number) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
              try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/dashboardStats`,);
                console.log(`Fetched data: `, response.data);
              } catch (error) {
                console.error("Failed to fetch blocks:", error);
              } finally {
                setLoading(false);
              }
            }
        

    fetchData();
  }, [page]);

  return { loading };
};

export default useFetchTransactions;
