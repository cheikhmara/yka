import React from "react";
import {
  Line,
  Bar,
  Radar,
  PolarArea,
  Doughnut,
  Pie,
  Bubble,
  Scatter,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrer les composants utilisés par Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Line Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

const barData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Bar Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
    },
  ],
};

const radarData = {
  labels: ["Running", "Swimming", "Eating", "Cycling", "Reading"],
  datasets: [
    {
      label: "Radar Dataset",
      data: [20, 10, 4, 2, 15],
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
    },
  ],
};

const polarAreaData = {
  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
  datasets: [
    {
      label: "Polar Area Dataset",
      data: [11, 16, 7, 3, 14],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
    },
  ],
};

const doughnutData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Doughnut Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const pieData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Pie Dataset",
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const bubbleData = {
  labels: ["January"],
  datasets: [
    {
      label: "Bubble Dataset",
      data: [
        {
          x: 20,
          y: 30,
          r: 15,
        },
        {
          x: 40,
          y: 10,
          r: 10,
        },
      ],
      backgroundColor: "#FF6384",
      hoverBackgroundColor: "#FF6384",
    },
  ],
};

const scatterData = {
  datasets: [
    {
      label: "Scatter Dataset",
      data: [
        { x: -10, y: 0 },
        { x: 0, y: 10 },
        { x: 10, y: 5 },
        { x: 0.5, y: 5.5 },
      ],
      backgroundColor: "rgba(75,192,192,1)",
    },
  ],
};

const Graphs = () => {
  return (
    <>
        <div className="row">
            <div className="col">
                <h3>Line Graph</h3>
                <Line data={lineData} />
            </div>
            <div className="col">
                <h3>Bar Graph</h3>
                <Bar data={barData} />
            </div>
            <div className="col">
                <h3>Radar Graph</h3>
                <Radar data={radarData} />
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h3>Polar Area Graph</h3>
                <PolarArea data={polarAreaData} />
            </div>
            <div className="col">
                <h3>Doughnut Graph</h3>
                <Doughnut data={doughnutData} />
            </div>
            <div className="col">
                <h3>Pie Graph</h3>
                <Pie data={pieData} />
            </div>
        </div>
        {/*
        <h2>Bubble Graph</h2>
        <Bubble data={bubbleData} />

        <h2>Scatter Graph</h2>
        <Scatter data={scatterData} />*/}
    </>
  );
};

export default Graphs;
