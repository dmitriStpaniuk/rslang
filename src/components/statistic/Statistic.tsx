import { arrayCards } from "../constant"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Learned word count',
      },
    },
  };

const labels = arrayCards.map((item) => item.day);
const arrayLearn = arrayCards.map((item) => item.learnWords)
const arrayFilter = arrayLearn.map((e)=>e.filter(item => item.learn === true).length);

export const data = {
  labels,
  datasets: [
    {
      data: (arrayFilter),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const styles = {
    div: {
        width: "75%",
    }
}

export function Statistic() {
  return <div style={styles.div}>
            <Line options={options} data={data} updateMode='resize'/>;
         </div>
}