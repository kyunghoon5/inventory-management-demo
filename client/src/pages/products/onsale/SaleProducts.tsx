import DataGridMain from '../components/DataGridMain';
import { ProductsMain } from '../../../types';

const SaleProducts = () => {
  const filteredData = (data: ProductsMain[]) =>
    data.filter((item) => item.sale_on);

  return (
    <>
      <DataGridMain filteredData={filteredData} />
    </>
  );
};

export default SaleProducts;
