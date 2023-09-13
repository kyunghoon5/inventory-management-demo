// import axios from 'axios';
import { useState, useEffect } from 'react';
import { ProductsMain } from '../src/../types';

const BASE_URL = import.meta.env.VITE_DB_URL;

const ProductsMainAPI = () => {
  // const [productsMain, setProductsMain] = useState([]);
  // const [productsMainRB, setProductsMainRB] = useState([]);

  const [productsMain2, setProductsMain2] = useState<ProductsMain[]>([]);

  // const productsMainAPIaxios = async () => {
  //    setIsLoading(true);
  //   return await axios

  //     .get(`${BASE_URL}productsMain`)
  //     .then((response) => {
  //       setProductsMain(response.data);
  //     setIsLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const productsMainRBAPIaxios = async () => {
  //           setIsLoading(true);
  //   return await axios
  //     .get(`${BASE_URL}productsMainRB`)
  //     .then((response) => {
  //       setProductsMainRB(response.data);
  //            setIsLoading(false);

  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await productsMainAPIaxios();
  //     await productsMainRBAPIaxios();
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await Promise.all([
          fetch(`${BASE_URL}productsMain`),
          fetch(`${BASE_URL}productsMainRB`),
        ]);
        const data = await Promise.all(res.map((r) => r.json()));
        setProductsMain2(data.flat());
 
      } catch {
        throw Error('Promise failed');
      }
    };

    fetchData();
  }, []);

  return {
    productsMain2,
    // productsMain,
    // productsMainRB,
  };
};

export default ProductsMainAPI;
