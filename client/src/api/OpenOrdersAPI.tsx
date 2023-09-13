import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_DB_URL;

const OpenOrdersAPI = () => {
  const [openorder, setOpenorder] = useState([]);

  const openOrderAPI = async () => {
    return await axios
      .get(`${BASE_URL}openorders`)
      .then((response) => setOpenorder(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    openOrderAPI();
  }, []);

  return { openorder };
};

export default OpenOrdersAPI;
