import { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import AddNewFab from '../../../components/ui/AddNewFab';
import Card from './components/Card';
import TrackingUI from '../../../components/ui/TrackingUI';

const VendorDetail = () => {
  const { cardName,descrip } = useParams();
  const [modalContactDetailIsOpen, setModalContactDetailIsOpen] =
    useState(false);
   
  return (
    <>
      <div className="bg-purple-900">
        <Link to={`/vendor`}>
          <button className="p-8">
            <div className="text-white text-[20px] font-bold ml-2 mb-2 flex hover:text-gray-100">
              <MdArrowBackIos
                style={{ color: 'white', marginLeft: '9px', marginTop: '6px' }}
              />
              All Vendors
            </div>
          </button>
        </Link>
        <div className="text-white text-[50px] pl-12">{cardName}</div>
        <div className="text-gray-200 text-[20px] pl-12 flex">
          Lead Time: &nbsp; <div className="text-white font-bold">120 days</div>
        </div>

        <div className="flex justify-between p-12">
          <div>
            <hr className="w-96" />
            <div className="text-gray-200 text-[20px]">Contact Name</div>
            <div className="text-white text-[30px] ">Dave Lee</div>
          </div>
          <div>
            <hr className="w-96" />
            <div className="text-gray-200 text-[20px]">Email Address</div>
            <div className="text-white text-[30px] ">BZ123@gmail.com</div>
          </div>
          <div>
            <hr className="w-96" />
            <div className="text-gray-200 text-[20px]">Telephone</div>
            <div className="text-white text-[30px] ">+1-201-201-2011</div>
          </div>
          <div>
            <hr className="w-auto" />
            <div className="text-gray-200 text-[20px]">Vendor Address</div>
            <div className="text-white text-[20px] ">
              Celeste Slater 606-3727 Ullamcorper.
              <br />
              Street Roseville NH 11523
            </div>
          </div>
        </div>

        <div className="pl-12 pt-4 pb-4 text-white text-lg font-bold">
          Web Page: &nbsp;
          <a
            className="hover:text-white visited:text-white "
            href="https://www.vanessahair.com/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.vanessahair.com/
          </a>
        </div>
      </div>

      <div>
        <div className="flex justify-between p-12 pb-2">
          <div className="font-bold text-lg">Other Contacts</div>
          <AddNewFab
            title="Add Contact"
            setModalContactDetailIsOpen={setModalContactDetailIsOpen}
            modalContactDetailIsOpen={modalContactDetailIsOpen}
          />
        </div>
        <div className="p-10">
          <Swiper
            modules={[Pagination, Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={4}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => swiper}
          >
            <SwiperSlide>
              <Card contactName="Dave Hu" />
            </SwiperSlide>
            <SwiperSlide>
              <Card contactName="Mike ll" />
            </SwiperSlide>
            <SwiperSlide>
              <Card contactName="Mike ll" />
            </SwiperSlide>
            <SwiperSlide>
              <Card contactName="Mike ll" />
            </SwiperSlide>
            <SwiperSlide>
              <Card contactName="Mike ll" />
            </SwiperSlide>
            <SwiperSlide>
              <Card contactName="Mike ll" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="p-12">
        <div className="font-bold text-lg flex pb-4">Open Purchase Orders</div>
        <TrackingUI dashbordValue={10} vendorName={cardName} details={true} descrip={descrip}/>
        <div className="pt-4"></div>
      </div>
    </>
  );
};

export default VendorDetail;
