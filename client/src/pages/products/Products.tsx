import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";

import ProductsNavbar from "../../components/ProductsNavbar";

const Products = () => {
  return (
    <div>
      <NavBar />
      <ProductsNavbar />
      <Outlet />
    </div>
  );
};

export default Products;
