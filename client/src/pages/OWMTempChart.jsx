import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
      position: "top",
    },
    title: {
      display: true,
      text: "24 Temperature Report",
    },
  },
};

let myConditions = [];

const OWMTempChart = () => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get("http://192.168.0.235:8800/OWMTempData");
        setConditions(res.data.ConditionReports);
        myConditions = conditions;
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, []);

  const labels = [];
  const tempValues = [];
  const feelsLikeValues = [];

  console.log(myConditions);

  myConditions.map((currentElement) => {
    labels.push(currentElement.date + " - " + currentElement.time);
    tempValues.push(currentElement.temp);
    feelsLikeValues.push(currentElement.feelsLike);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: labels.map((currentElement, index) => tempValues[index]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Feels Like",
        data: labels.map((currentElement, index) => feelsLikeValues[index]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default OWMTempChart;
