import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import GrowthPlanAPI from '../../api/GrowthPlanAPI';
import { GrowthPlanType } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const PlannedGrowthChart = () => {
  const { growthPlanData } = GrowthPlanAPI();

    const currentYear = new Date().getFullYear(); // get the current year
    const lastYear = new Date().getFullYear() - 1;
  const sumByMonthlast = growthPlanData
    .filter((item: GrowthPlanType) => item.year === lastYear)
    .reduce((acc: Record<string, number>, item: GrowthPlanType) => {
      const key = `${item.month}`;
      if (acc[key]) {
        acc[key] += Math.floor(item.qtyshp);
      } else {
        acc[key] = Math.floor(item.qtyshp);
      }
      return acc;
    }, {});
      const targetMonth = growthPlanData
        .filter((item: GrowthPlanType) => item.year === lastYear)
        .reduce((acc: Record<string, number>, item: GrowthPlanType) => {
          const key = `${item.month}`;
          if (acc[key]) {
            acc[key] += Math.floor(item.qtyshp + item.qtyshp * 0.1);
          } else {
            acc[key] = Math.floor(item.qtyshp + item.qtyshp * 0.1);
          }
          return acc;
        }, {});

  const sumByMonthcur = growthPlanData
    .filter((item: GrowthPlanType) => item.year === currentYear)
    .reduce((acc: Record<string, number>, item: GrowthPlanType) => {
      const key = `${item.month}`;
      if (acc[key]) {
        acc[key] += Math.floor(item.qtyshp);
      } else {
        acc[key] = Math.floor(item.qtyshp);
      }
      return acc;
    }, {});

  

  const data = {
    labels,
    datasets: [
      {
        label: `${new Date().getFullYear() - 1}`,
        data: sumByMonthlast,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `${new Date().getFullYear()}`,
        data: sumByMonthcur,
        backgroundColor: 'rgba(113, 197, 190, 0.8)',
      },
      {
        label: `target`,
        data: targetMonth,
        backgroundColor: 'rgba(0, 247, 44, 0.34)',
      },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default PlannedGrowthChart;
