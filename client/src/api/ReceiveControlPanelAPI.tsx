import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_DB_URL;

const ReceiveContorlPanelAPI = () => {
  const [receiveCP, setReceiveCP] = useState([]);
  const [loading, setLoading] = useState(false);

  const receiveItemAPI = async () => {
    setLoading(true);
    return await axios
      .get(`${BASE_URL}receiveconpanel`)
      .then((response) => {
        setReceiveCP(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    receiveItemAPI();
  }, []);

  return { receiveCP, loading };
};

export default ReceiveContorlPanelAPI;
