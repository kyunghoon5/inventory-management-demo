import ScheduleCalendarAPI from '../../../api/ScheduleCalendarAPI';
import { ScheduleCalType } from '../../../types';

const Schedule = () => {
  const { scheduleCal } = ScheduleCalendarAPI();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const dateArray = [];
  for (let i = 0; i < 20; i++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentMonth,
      currentDay - 4 + i
    );
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${month}/${day}`;
    dateArray.push(formattedDate);
  }

  const formattedScheduleCal = dateArray.map((date) => {
    const [month, day] = date.split('/');
    const year = new Date().getFullYear();
    return {
      reqdate: `${month}/${day}/${year}`,
      amount: null,
      ctns: null,
      descrip: null,
      invno: null,
      newitem: null,
      number: null,
      purdate: null,
      purno: null,
      qtyord: null,
      recdate: null,
      shpdate: null,
      vendno: null,
      weight: null,
    };
  });

  const result = formattedScheduleCal.map((obj) => {
    const matches = scheduleCal.filter(
      (cal: ScheduleCalType) => cal.reqdate === obj.reqdate
    );
    if (matches.length > 0) {
      return matches.map((match: string[]) => ({ ...obj, ...match }));
    } else {
      return obj;
    }
  });

  return (
    <div className="p-20 pt-0">
      <div className="font-bold   ">Arriving Schedule Calendar</div>

      <div className="grid grid-cols-5 border-collapse  border border-black ">
        {result.map((item) => (
          <div className=" border-collapse border border-black">
            <div className="border-b-2 border-black font-bold">
              {Array.isArray(item)
                ? item.map((subItem) => subItem.reqdate)[0]
                : item.reqdate}
            </div>

            <div>
              {Array.isArray(item)
                ? item.reduce((acc: JSX.Element[], subItem, index) => {
                    const sumofQtyord = item
                      .filter((item) => item.invno === subItem.invno)
                      .reduce((acc, curr) => {
                        if (curr.qtyord !== null) {
                          return acc + curr.qtyord;
                        } else {
                          return acc;
                        }
                      }, 0);
                    const sumofCtn = item
                      .filter((item) => item.invno === subItem.invno)
                      .reduce((acc, curr) => {
                        if (curr.ctns !== null) {
                          return acc + curr.ctns;
                        } else {
                          return acc;
                        }
                      }, 0);

                    if (
                      index === 0 ||
                      subItem.invno !== item[index - 1].invno
                    ) {
                      acc.push(
                        <div key={index} className="font-bold">
                          <div className="mt-2 ml-2">
                            {subItem.vendno}, OCEAN, 40FT
                          </div>

                          <div className="ml-2">
                            P/O # {subItem.purno} / &nbsp;&nbsp;&nbsp; &nbsp;{' '}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;{' '}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;{' '}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;{' '}
                            {subItem.invno}
                          </div>
                          <div className="ml-2">
                            {sumofCtn.toFixed(0)} CTNS / {sumofQtyord}
                          </div>

                          <div className="mt-2 ml-2">
                            {item
                              .filter((item) => item.invno === subItem.invno)
                              .map((item) => (
                                <div className="flex">
                                  {item.newitem ? (
                                    <div className="text-red-500">
                                      {item.descrip}: {item.qtyord}(
                                      {item.newitem})
                                    </div>
                                  ) : (
                                    <div>
                                      {item.descrip}: {item.qtyord}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>

                          <div className="mt-2  mr-5 ">
                            <div className="flex justify-end">
                              {subItem.purdate}
                            </div>
                            <div className="flex justify-end">
                              {subItem.shpdate}
                            </div>
                            <div className="flex justify-end">
                              {subItem.reqdate}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return acc;
                  }, [])
                : item.descrip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
