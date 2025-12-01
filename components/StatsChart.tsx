import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { User } from 'lucide-react';

interface StatsChartProps {
  data: number[];
  labels: string[];
  title: string;
}

const StatsChart: React.FC<StatsChartProps> = ({ data, labels, title }) => {
  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Meditation Minutes',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div role="img" aria-label="Meditation statistics chart">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatsChart;