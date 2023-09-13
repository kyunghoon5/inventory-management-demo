import { ReactNode, useLayoutEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Layout from './pages/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Vendor from './pages/vendor/Vendor';
import Products from './pages/products/Products';
import Preorder from './pages/preorder/Preorder';
import Tracking from './pages/tracking/Tracking';
import Planning from './pages/planning/Planning';
import Newlaunch from './pages/newlaunch/Newlaunch';
import VendorDetail from './pages/vendor/vendorId/VendorDetail';
import WithoutLayout from './pages/WithoutLayout';
import AllPage from './pages/products/allId/AllPage';
import RepNow from './pages/products/repNowId/RepNow';
import RepSoon from './pages/products/repsoonId/RepSoon';
import HealthyPro from './pages/products/healthyId/HealthyPro';
import Overstocked from './pages/products/overstocked/Overstocked';
import BackOrders from './pages/products/backorders/BackOrders';
import Archived from './pages/products/archived/Archived';
import SaleProducts from './pages/products/onsale/SaleProducts';
import Schedule from './pages/tracking/schedule/Schedule';
import Trackingall from './pages/tracking/allId/Trackingall';
import SignIn from './pages/login/signin/SignIn';
import SignUp from './pages/login/signup/SignUp';


const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/vendor" element={<Vendor />} />
              <Route path="preorder" element={<Preorder />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="newlaunch" element={<Newlaunch />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route path="/vendor/:cardName" element={<WithoutLayout />}>
              <Route path="/vendor/:cardName" element={<VendorDetail />} />
              <Route
                path="/vendor/:cardName/:descrip"
                element={<VendorDetail />}
              />
            </Route>

            <Route path="/products" element={<Products />}>
              <Route index element={<Navigate to="/products/all" replace />} />
              <Route path="all" element={<AllPage />} />
              <Route path="replenishnow" element={<RepNow />} />
              <Route path="replenishsoon" element={<RepSoon />} />
              <Route path="healthy" element={<HealthyPro />} />
              <Route path="overstocked" element={<Overstocked />} />
              <Route path="saleproducts" element={<SaleProducts />} />
              <Route path="backorders" element={<BackOrders />} />
              <Route path="archived" element={<Archived />} />
            </Route>

            <Route path="tracking" element={<Tracking />}>
              <Route index element={<Navigate to="/tracking/all" replace />} />
              <Route path="all" element={<Trackingall />} />
              <Route path="schedule" element={<Schedule />} />
            </Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}
export default App;
