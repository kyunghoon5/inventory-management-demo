import DataGridMain from '../components/DataGridMain';
import { ProductsMain } from '../../../types';

const Overstocked = () => {
  const filteredData = (data: ProductsMain[]) =>
    data.filter(
      (item) =>
        item.num_of_pd <= 1 &&
        item.days_left > 500 &&
        item.target_qtyshp < item.onhand
    );

  return (
    <>
      <DataGridMain filteredData={filteredData} />
    </>
  );
};

export default Overstocked;
