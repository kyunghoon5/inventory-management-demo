import ProductsMainAPI from '../../../api/ProductsMainAPI';
import { ProductsMain } from '../../../types';

interface ProductsMergedProps {
  type: number | string;
  vendorType: number;
  // classType: number;
}

const ProductsMerged = ({
  type,
  vendorType,
}: // classType,
ProductsMergedProps) => {
  const { productsMain2 } = ProductsMainAPI();

  const result =
    type === 1
      ? ['', '', ...new Set(productsMain2.map((item) => item.vendno))]
      : type === 2
      ? [
          '',
          '',
          ...new Set(
            productsMain2
              .filter((item) => item.class !== 'RB')
              .map((item) => item.vendno)
          ),
        ]
      : [
          '',
          '',
          ...new Set(
            productsMain2
              .filter((item) => item.class == 'RB')
              .map((item) => item.vendno)
          ),
        ];

  const secondElement = (index: number) => {
    return result[index];
  };

  // const classResult =
  //   type === 1
  //     ? ['', '', ...new Set(productsMain2.map((item) => item.class))]
  //     : type === 2
  //     ? [
  //         '',
  //         '',
  //         ...new Set(
  //           productsMain2
  //             .filter((item) => item.class !== 'RB')
  //             .map((item) => item.class)
  //         ),
  //       ]
  //     : [
  //         '',
  //         '',
  //         ...new Set(
  //           productsMain2
  //             .filter((item) => item.class == 'RB')
  //             .map((item) => item.class)
  //         ),
  //       ];

  // const classElement = (index: number) => {
  //   return classResult[index];
  // };

  let data: ProductsMain[] = [];
  if (type === 1 && vendorType === 1) {
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
  } else if (type === 1 && vendorType > 1) {
    data = productsMain2
      .filter((item) => item.vendno === secondElement(vendorType))
      .map((item: ProductsMain, index) => ({
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
  } else if (type === 2 && vendorType === 1) {
    data = productsMain2
      .filter((item) => item.class !== 'RB')
      .map((item: ProductsMain, index) => ({
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
  } else if (type === 2 && vendorType > 1) {
    data = productsMain2
      .filter((item) => item.class !== 'RB')
      .filter((item) => item.vendno === secondElement(vendorType))
      .map((item: ProductsMain, index) => ({
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
  } else if (type === 3 && vendorType === 1) {
    data = productsMain2
      .filter((item) => item.class == 'RB')
      .map((item: ProductsMain, index) => ({
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
  } else if (type === 3 && vendorType > 1) {
    data = productsMain2
      .filter((item) => item.class == 'RB')
      .filter((item) => item.vendno === secondElement(vendorType))

      .map((item: ProductsMain, index) => ({
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
  }

  return { data, productsMain2 };
};

export default ProductsMerged;
