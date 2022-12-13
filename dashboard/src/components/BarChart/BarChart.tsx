import { TableData, Source } from "utils/types";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { addDays, format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ tableData }: { tableData: Source[]; }) => {
  
  const newTableData = tableData?.map((tableItem) => {
    return format(new Date(tableItem.timestamp), 'MM/dd/yyyy');
  });

  const labels = [...new Set(newTableData)];

  const data = {
    labels,
    datasets: [
      {
        label: "Count by Date",
        backgroundColor: "lightblue",
        borderColor: "rgb(255, 99, 132)",
        data: [50, 10, 5, 2, 9],
      },
    ],
  };
  return (
    <div className="py-5">
      <Bar data={data} />
    </div>
  );
};