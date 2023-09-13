import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  cardName?: string;
  color?: string;
  bgcolor?: string;
  textcolor?: string;
  openOrder?: number;
  proOrInvo? : string
  link: string
}

const Card: React.FC<CardProps> = ({
  className,
  cardName,
  color,
  bgcolor,
  textcolor,
  openOrder,
  proOrInvo,
  link,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg mt-5 m-3 w-[500px] ${className} border-t-4 ${color}`}
    >
      <div className="p-10 pb-0 flex">
        <div
          className={`rounded-full ${bgcolor} px-2 py-1 text-lg font-bold  flex items-center `}
        >
          <span className={`mr-1 ${textcolor}`}>&#11044;</span>
          {cardName}
        </div>
      </div>

      <div className="bg-white-700 rounded-t-lg p-10 mb-1 mt-2">
        <div className="text-purple-600 text-lg font-bold flex">
          <div className="text-[100px] mr-5">
            {openOrder ? (
              openOrder
            ) : (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            )}
          </div>
          {proOrInvo}
        </div>
      </div>
      <Link to={`${link}`}>
        <button className="p-4">
          <div className="text-purple-600 text-[20px] font-bold ml-2 mb-2 flex hover:text-purple-400">
            Review{' '}
            <MdArrowForwardIos
              style={{ color: '#8E24AA', marginLeft: '9px', marginTop: '7px' }}
            />
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Card;
