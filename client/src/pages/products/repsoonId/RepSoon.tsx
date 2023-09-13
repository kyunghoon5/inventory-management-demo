import DataGridMain from '../components/DataGridMain';
import { ProductsMain } from '../../../types';

const RepSoon = () => {
  const filteredData = (data: ProductsMain[]) =>
    data.filter(
      (item) =>
        item.num_of_pd < 1 &&
        item.days_left < 120 &&
        item.target_qtyshp > 0 &&
        item.sale_on === 0
    );

  return (
    <>
      <DataGridMain filteredData={filteredData}  />
    </>
  );
};

export default RepSoon;
