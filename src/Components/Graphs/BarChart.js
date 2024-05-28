// BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.matiere),
    datasets: [
      {
        label: "Note élève" ,
        data: data.map((entry) => entry.note),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Moyenne classe",
        data: data.map((entry) => entry.note - 5),
        backgroundColor: "rgba(105, 10, 55, 50)",
        borderColor: "rgba(10, 10, 25, 100)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Note de l'élève sur la période" },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
