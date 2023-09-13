//need to fix as pure comp
import OpenOrdersAPI from '../../api/OpenOrdersAPI';

interface Order {
  vendno: string;
  open_orders: number;
}

const OpenOrderMath = () => {
  const { openorder } = OpenOrdersAPI() as { openorder: Order[] };

  const openOrderTotal = openorder.reduce(
    (result, order) => result + order.open_orders,
    0
  );

  return { openorder, openOrderTotal };
};

export default OpenOrderMath;
