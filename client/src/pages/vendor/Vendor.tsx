
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';

import VendorInfoAPI from '../../api/VendorInfo';
import AddNewFab from '../../components/ui/AddNewFab';
import Card from './components/Card';
import { Vendor } from '../../types';
import OpenOrderMath from '../../utils/math/OpenOrderMath';


const Vendor = () => {
  
    const { openorder } = OpenOrderMath() 
    const { vendor } = VendorInfoAPI() as { vendor: Vendor[] };

    const [modalIsOpen, setModalIsOpen] = useState(false);  

    const openOrdersByVendor = vendor.map(order  =>{
      const vendorInfo = openorder.find(vendor => vendor.vendno ===order.vendor)
      return{
        ...order,
        open_orders:vendorInfo? vendorInfo.open_orders:0
      }
    })
  
  const numDesending = [...openOrdersByVendor].sort((a,b )=>b.open_orders - a.open_orders);

  const [thevalue, setThevalue] = useState(
    openOrdersByVendor.map((item: Vendor, index) => (
      <Card key={index} cardName={item.vendor} open_orders={item.open_orders} />
    ))
  );


  const dosth = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setThevalue(
        numDesending.map((item: Vendor, index) => (
          <Card
            key={index}
            cardName={item.vendor}
            open_orders={item.open_orders}
          />
        ))
      );
    } else {
      setThevalue(
        openOrdersByVendor.map((item: Vendor, index) => (
          <Card
            key={index}
            cardName={item.vendor}
            open_orders={item.open_orders}
          />
        ))
      );
    }
  };

useEffect(() => {
  setThevalue(
    openOrdersByVendor.map((item: Vendor, index) => (
      <Card key={index} cardName={item.vendor} open_orders={item.open_orders} />
    ))
  );
}, [vendor, openorder]);

  return (
    <>
      <div className="flex p-10 justify-between ">
        <div className="text-lg font-bold ">All Vendors</div>

        <div className="flex">
          <div className="items-center mr-5 mt-1 text-purple-500 font-bold">
            A-Z
            <Switch color="secondary" onChange={dosth} />
            Pending
          </div>
          <AddNewFab
            title="Add Vendor"
            setModalIsOpen={setModalIsOpen}
            modalIsOpen={modalIsOpen}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 p-5 gap-10">{thevalue}</div>
    </>
  );
};

export default Vendor;
