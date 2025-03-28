import { useEffect, useState } from 'react';
import axios from 'axios';
import { TopCard } from '../components/home/topcards';

const useFetchDashboardStats = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TopCard>();

  useEffect(() => {
    async function fetchData() {
              try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/explorer/dashboardStats`,);
                console.log(`Fetched data: `, response.data);
                setData(response.data.data);
              } catch (error) {
                console.error("Failed to fetch blocks:", error);
              } finally {
                setLoading(false);
              }
            }
        

    fetchData();
  }, []);

  return { data, loading };
};

export default useFetchDashboardStats;  
