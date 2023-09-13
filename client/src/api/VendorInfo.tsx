import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_DB_URL;

const VendorInfoAPI = () => {
  const [vendor, setVendor] = useState([]);
 

  const vendorAPI = async () => {
  
    return await axios
      .get(`${BASE_URL}vendorinfo`)
      .then((response) =>{ 
 
      setVendor(response.data)})
      
      .catch((err) => console.log(err));
      
  };
  useEffect(() => {
    vendorAPI();
 
   
  }, []);

  return { vendor };
};

export default VendorInfoAPI;
