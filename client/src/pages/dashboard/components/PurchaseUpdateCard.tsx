import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

import TrackingUI from '../../../components/ui/TrackingUI';


interface CardProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  cardName?: string;
  color?: string;
  bgcolor?: string;
}

const PurchaseUpdateCard: React.FC<CardProps> = ({
  className,
  children,
  cardName,
  color,
  bgcolor,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg mt-5 m-3 ${className} border-t-4 ${color}`}
    >
      <div className="p-10 pt-3 pb-0 flex">
        <div
          className={`rounded-full ${bgcolor} px-2  text-2xl font-bold  flex items-center `}
        >
          {cardName}
        </div>
      </div>

      <div className="bg-white-700 rounded-t-lg p-10 pb-0  mb-1">
        <div className="text-black font-bold text-xl mb-0">{children}</div>
        <div>
          <TrackingUI dashbordValue={5} vendorName="all" onCell="on" />
        </div>
      </div>
      <Link to={`/tracking`}>
        <button className="p-4 ">
          <div className="text-purple-600 text-[20px] font-bold ml-2 mb-2 flex hover:text-purple-400">
            Tracking
            <MdArrowForwardIos
              style={{ color: '#8E24AA', marginLeft: '9px', marginTop: '7px' }}
            />
          </div>
        </button>
      </Link>
    </div>
  );
};

export default PurchaseUpdateCard;
