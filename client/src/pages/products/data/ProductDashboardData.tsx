import ProductsMainAPI from '../../../api/ProductsMainAPI';
import { ProductsMain } from '../../../types';

const ProductDashboardData = () => {
  const { productsMain2} = ProductsMainAPI();

  let data: ProductsMain[] = [];

  data = productsMain2.map((item: ProductsMain, index) => ({
    id: index,
    brand_name: item.brand_name,
    class: item.class,
    cost: item.cost,
    descrip: item.descrip,
    length_cat: item.length_cat,
    num_of_pd: item.num_of_pd,
    onhand: item.onhand,
    percentile: item.percentile,
    price: item.price,
    qtybo: item.qtybo,
    qtyshp: item.qtyshp,
    rank: item.rank,
    wowTrend: item.wowTrend,
    vendno: item.vendno,
    target_qtyshp: item.target_qtyshp,
    days_left: item.days_left,
    sale_on: item.sale_on,
  }));

  const filteredRepNow = data.filter(
    (item) =>
      item.num_of_pd < 1 &&
      item.days_left < 20 &&
      item.target_qtyshp > 0 &&
      item.onhand < item.target_qtyshp &&
      item.sale_on === 0
  );

  const filteredRepSoon = data.filter(
    (item) =>
      item.num_of_pd < 1 &&
      item.days_left < 120 &&
      item.target_qtyshp > 0 &&
      item.sale_on === 0
  );

  return { filteredRepNow, filteredRepSoon };
};

export default ProductDashboardData;
