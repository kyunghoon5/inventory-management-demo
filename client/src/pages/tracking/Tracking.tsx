import { Outlet } from 'react-router-dom';

import NavBar from '../../components/Navbar';
import PlanningNavbar from '../../components/PlanningNavbar';

const Tracking = () => {
  return (
    <div>
      <NavBar />
      <PlanningNavbar />
      <Outlet />
    </div>
  );
};

export default Tracking;
