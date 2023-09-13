import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import PlannedGrowthChart from '../../../components/ui/PlannedGrowthChart';
import GrowthPlanAPI from '../../../api/GrowthPlanAPI';
import { GrowthPlanType } from '../../../types'

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
  cardName?: string;
  color?: string;
  bgcolor?: string;
}

const PlannedGrowthCard: React.FC<CardProps> = ({
  className,
  children,
  cardName,
  color,
  bgcolor,
}) => {
  const { growthPlanData } = GrowthPlanAPI();

  const currentMonth = new Date().getMonth() + 1; // get the current month (1-12)
  const currentYear = new Date().getFullYear(); // get the current year
  const lastYear = new Date().getFullYear() - 1;

  const sumByMonthCurrent = growthPlanData
    .filter(
      (item: GrowthPlanType) =>
        item.year === currentYear && item.month === currentMonth
    )
    .reduce((acc: Record<string, number>, item: GrowthPlanType) => {
      const key = `${item.month}`;
      if (acc[key]) {
        acc[key] += Math.floor(item.qtyshp);
      } else {
        acc[key] = Math.floor(item.qtyshp);
      }
      return acc;
    }, {});

  const formattedValue = sumByMonthCurrent[currentMonth] / 1000000; // format the value as a million
  const sumByMonthTarget = growthPlanData
    .filter(
      (item: GrowthPlanType) =>
        item.year === lastYear && item.month === currentMonth
    )
    .reduce((acc: Record<string, number>, item: GrowthPlanType) => {
      const key = `${item.month}`;
      if (acc[key]) {
        acc[key] += Math.floor(item.qtyshp + item.qtyshp * 0.1);
      } else {
        acc[key] = Math.floor(item.qtyshp + item.qtyshp * 0.1);
      }
      return acc;
    }, {});

  const formattedValueTarget = sumByMonthTarget[currentMonth] / 1000000; // format the value as a million


  return (
    <div
      className={`bg-white rounded-lg shadow-lg mt-5 m-3  ${className} border-t-4 ${color}`}
    >
      <div className="p-10 pt-3 pb-0 flex">
        <div
          className={`rounded-full ${bgcolor} px-2  text-2xl font-bold  flex items-center `}
        >
          {cardName}
        </div>
      </div>

      <div className="bg-white-700 rounded-t-lg p-10  mb-1">
        <div className="text-black font-bold text-xl mb-0">{children}</div>
        <div className="text-purple-600 text-lg font-semibold  flex flex-col">
          <div className="text-lg mr-5 flex justify-end">
            Target Revenue:{' '}
            <div className="text-[40px] font-bold ">
              {growthPlanData.length === 0 ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                `$${formattedValueTarget.toFixed(2)}M`
              )}
            </div>
          </div>
          
          <div className="pt-4 text-lg mr-5 flex justify-end">
            MTD:{' '}
            <div className="text-[40px] font-bold">
              {growthPlanData.length === 0 ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                `$${formattedValue.toFixed(2)}M`
              )}
            </div>
          </div>

        </div>
      </div>

      <PlannedGrowthChart />
      <Link to={`/planning`}>
        <button className="p-4 ">
          <div className="text-purple-600 text-[20px] font-bold ml-2 mb-2 flex hover:text-purple-400">
            Growth Planning
            <MdArrowForwardIos
              style={{ color: '#8E24AA', marginLeft: '9px', marginTop: '7px' }}
            />
          </div>
        </button>
      </Link>
    </div>
  );
};

export default PlannedGrowthCard;
