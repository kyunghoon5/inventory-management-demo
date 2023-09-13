import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_DB_URL;

const GrowthPlanAPI = () => {
  const [growthPlanData, setGrowthPlanData] = useState([]);

  const growthplanCAPI = async () => {
    return await axios
      .get(`${BASE_URL}growthplan`)
      .then((response) => setGrowthPlanData(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    growthplanCAPI();
  }, []);

  return { growthPlanData };
};

export default GrowthPlanAPI;
