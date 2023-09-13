import DataGridMain from '../components/DataGridMain';
import { ProductsMain } from '../../../types';

const BackOrders = () => {
const filteredData = (data: ProductsMain[]) =>
  data.filter((item) => item.qtybo).sort((a, b) => b.qtybo - a.qtybo);


  return (
    <>
      <DataGridMain filteredData={filteredData} backorders={true} />
    </>
  );
};

export default BackOrders;
