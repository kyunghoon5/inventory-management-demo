import DataGridMain from '../components/DataGridMain';
import { ProductsMain } from '../../../types';

const AllPage = () => {

  const filteredData = (data: ProductsMain[]) =>
    data;

  return (
    <>
      <DataGridMain filteredData={filteredData}  />
    </>
  );
};

export default AllPage;
