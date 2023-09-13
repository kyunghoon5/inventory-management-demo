import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_DB_URL;

const NewLaunchAPI = () => {
  const [newLaunchData, setNewLaunchData] = useState([]);

  const openOrderAPI = async () => {
    return await axios
      .get(`${BASE_URL}newlaunch`)
      .then((response) => setNewLaunchData(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    openOrderAPI();
  }, []);

  return { newLaunchData };
};

export default NewLaunchAPI;
