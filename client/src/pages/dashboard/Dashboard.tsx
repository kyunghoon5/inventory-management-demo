import Card from "./components/Card";
import PlannedGrowthCard from "./components/PlannedGrowthCard";
import PurchaseUpdateCard from "./components/PurchaseUpdateCard";
import OpenOrderMath from "../../utils/math/OpenOrderMath";
import ProductDashboardData from "../products/data/ProductDashboardData";


const Dashboard = () => {
  const { openOrderTotal } = OpenOrderMath();
  const { filteredRepNow, filteredRepSoon } = ProductDashboardData();
const filteredRepNowlen = filteredRepNow.length
const filteredRepSoonlen = filteredRepSoon.length



  return (
    <div>
      <div className="flex flex-wrap justify-around  ">
        <Card
          cardName="REPLENISH NOW"
          color="border-orange-500"
          bgcolor="bg-orange-200"
          textcolor="text-orange-500"
          openOrder={filteredRepNowlen}
          proOrInvo="Products"
          link="/products/replenishnow"
        />
        <Card
          cardName="REPLENISH SOON"
          color="border-yellow-500"
          bgcolor="bg-yellow-200"
          textcolor="text-yellow-500"
          openOrder={filteredRepSoonlen}
          proOrInvo="Products"
          link="/products/replenishsoon"
        />
        <Card
          cardName="PRODUCTION ORDERS"
          color="border-purple-500"
          bgcolor="bg-purple-200"
          textcolor="text-purple-500"
          openOrder={openOrderTotal}
          proOrInvo="Production Orders"
          link="/vendor"
        />
      </div>

      <div className="flex mx-14 ">
        <PurchaseUpdateCard
          cardName="PURCHASE UPDATES"
          className="w-2/3 ml-2 -px-5  text-gray-500"
          color="border-purple-500"
        />
        <PlannedGrowthCard
          cardName="PLANNED GROWTH"
          className="w-1/3   text-gray-500 margin"
          color="border-green-400"
        />
      </div>
    </div>
  );
};

export default Dashboard;
