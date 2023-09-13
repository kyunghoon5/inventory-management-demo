import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  cardName?: string;
  bgcolor?: string;
  open_orders?: number
}

const Card: React.FC<CardProps> = ({ cardName, bgcolor, open_orders }) => {
  const style = {
    marginLeft: '5px',
    fontSize: '1.5em',
  };
  return (
    <div
      className={`bg-white rounded-lg shadow-lg mt-5 m-3 w-[400px] border-t-4 border-purple-500 mx-auto `}
    >
      <div className="p-10 pb-0 ">
        <div
          className={`rounded-full ${bgcolor} px-2 py-1 text-lg font-bold  flex justify-between `}
        >
          <div> {cardName} </div>
          <div>{open_orders} Pending</div>
          <button className="text-purple-500 flex hover:text-purple-400 ">
            Edit <AiOutlineEdit style={style} />
          </button>
        </div>
      </div>

      <div className="bg-white-700 rounded-t-lg p-10 mb-1 mt-2 pb-4">
        <div className="text-purple-600 text-lg font-bold flex">CHINA</div>
        <div className="text-purple-600 text-lg font-bold flex">
          bjtest1234@gmail.com
        </div>
        <div className="text-gray-400 text-lg font-bold flex">
          1-201-201-2011
        </div>
      </div>
      <Link to={`/vendor/${cardName}`}>
        <button className="p-4">
          <div className="text-purple-600 text-[20px] font-bold ml-2 mb-2 flex hover:text-purple-400">
            Details
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
