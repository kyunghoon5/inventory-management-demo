import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { NewLaunchType } from '../../../types';
import NewLaunchAPI from '../../../api/NewLaunchAPI';
import { useEffect, useRef } from 'react';

interface ImageSwiperProps {
  newLaunchImageNumber: number;
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ newLaunchImageNumber }) => {
  const { newLaunchData } = NewLaunchAPI();

  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    //...some logic
    //if() {
    swiperRef.current?.swiper.slideTo(newLaunchImageNumber);

    //}
  });

  return (
    <>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}

        direction="vertical"
        spaceBetween={25}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => swiper}
      >
        {newLaunchData.map((item: NewLaunchType, index: number) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center font-bold text-gray-600 pt-20   ">
              {item.descrip}
            </div>
            <img className="flex h-auto m-auto  " src={item.vend_image_url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSwiper;
