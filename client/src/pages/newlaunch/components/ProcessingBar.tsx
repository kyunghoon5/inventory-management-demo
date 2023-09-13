import { useEffect } from 'react';
import NewLaunchAPI from '../../../api/NewLaunchAPI';
import { NewLaunchType } from '../../../types';

interface ProcessingBarProbs {
  ProgressInfo: string;
  setProgessInfo: (string: string) => void;
}

const ProcessingBar: React.FC<ProcessingBarProbs> = ({
  ProgressInfo,
  setProgessInfo,
}) => {
  const { newLaunchData } = NewLaunchAPI();

  const data = newLaunchData
    .filter((item: NewLaunchType) => item.descrip === ProgressInfo)
    .map((item) => item);

  useEffect(() => {
    setProgessInfo(newLaunchData.map((item: NewLaunchType) => item.descrip)[0]);
  }, [newLaunchData]);

  const removeTime = (params: string) =>
    new Date(params).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    });

  const add30days = (params: string) => {
    const date = new Date(params);
    date.setDate(date.getDate() + 30);
    return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
  };

  const add60days = (params: string) => {
    const date = new Date(params);
    date.setDate(date.getDate() + 60);
    return date.toLocaleDateString('en-US', { timeZone: 'UTC' });
  };

  const Parentdiv = {
    height: 10,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 40,
    margin: 5,
  };

  const Childdiv = [
    {
      height: '100%',
      width: `${data.map(
        (item: NewLaunchType) => (item.sample_qty / item.recqty) * 100
      )}%`,
      backgroundColor: '#fde047',
      borderRadius: 40,
      
      textAlign: 'right' as const,
    },
    {
      height: '100%',
      width:
        data.map(
          (item: NewLaunchType) =>
            item.qtyshp !== undefined && (item.qtyshp / item.recqty) * 100
        ) + '%',
      backgroundColor: '#67e8f9',
      borderRadius: 40,
      textAlign: 'right' as const,
    },
  ];

  return (
    <div className="bg-violet-600 h-full w-full rounded-lg shadow-lg">
      <div className="flex flex-col  h-full">
        <div className="flex flex-col  text-white">
          <div className="ml-2 flex items-center">
            Sample &nbsp;<div className="w-4 h-4 rounded-md bg-[#fde047]"></div>
          </div>
          <div className="ml-2 flex items-center">
            Qtyshp&nbsp;&nbsp;
            <div className="w-4 h-4 rounded-md bg-[#67e8f9]"></div>
          </div>
        </div>
        <div className="p-20 pt-0 mr-40 text-white font-bold text-[30px] flex justify-between">
          <div className="flex items-center">
            <div className="text-[40px]">
              {data.map((item: NewLaunchType) => item.sales_qty_30days)}
            </div>
            &nbsp; Units
          </div>
          <div className="flex items-center">
            <div className="text-[40px]">
              {data.map((item: NewLaunchType) => item.sales_qty_60days)}
            </div>
            &nbsp; Units
          </div>
          <div className="flex items-center">
            <div className="text-[40px]">
              {data.map((item: NewLaunchType) => item.sales_qty_90days)}
            </div>
            &nbsp; Units
          </div>
        </div>

        <div className="pl-16 flex">
          <div className="flex" style={Parentdiv}>
            {Childdiv.map((style, index) => (
              <div key={index} style={style}></div>
            ))}
          </div>
          <div className="items-center   flex flex-col ml-16 text-white font-bold text-[30px] mt-[-50px]">
            <div>TOTAL:</div>
            <div className="flex items-center mt-4">
              <div className="text-[40px]">
                {data.map((item: NewLaunchType) => item.recqty)}
              </div>
              &nbsp; Units
            </div>
          </div>
        </div>

        <div className="px-20 mr-40 text-white font-semibold text-[20px] flex justify-between">
          <div className="flex flex-col items-center">
            <div>
              {data.map((item: NewLaunchType) => removeTime(item.start_dte))}
            </div>
            <div className="mt-3 text-center  w-36 h-auto rounded-full bg-white text-gray-500  ">
              0 - 30 DAYS
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div>
              {data.map((item: NewLaunchType) => add30days(item.start_dte))}
            </div>
            <div className="mt-3 text-center  w-36 h-auto rounded-full bg-white text-gray-500  ">
              30 - 60 DAYS
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div>
              {data.map((item: NewLaunchType) => add60days(item.start_dte))}
            </div>
            <div className="mt-3 text-center  w-36 h-auto rounded-full bg-white text-gray-500  ">
              60 - 90 DAYS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingBar;
