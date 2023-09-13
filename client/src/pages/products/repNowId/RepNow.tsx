import DataGridMain from '../components/DataGridMain';
import { ProductsMain } from '../../../types';

const RepNow = () => {

  const filteredData = (data: ProductsMain[]) =>
    data.filter(
      (item) =>
        item.num_of_pd < 1 &&
        item.days_left < 20 &&
        item.target_qtyshp > 0 &&
        item.onhand < item.target_qtyshp &&
        item.sale_on === 0
    );

  return (
    <>
      <DataGridMain filteredData={filteredData} />
    </>
  );
};

export default RepNow;
