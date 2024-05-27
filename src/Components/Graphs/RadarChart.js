// RadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RadarChart = ({ data }) => {

  const chartData = {
    labels: data.map((entry) => entry.matiere),
    datasets: [
      {
        label: "Note",
        data: data.map((entry) => entry.note),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Progression de l'élève - Radar" },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
