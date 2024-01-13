import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: "24 Hour Temperature Report",
    },
  },
};

const labels = [];
const tempValues = [];
const feelsLikeValues = [];
let hasRun = false;

const OWMTempChart = () => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        if (!hasRun) {
          hasRun = true;
          const res = await axios.get("http://192.168.0.235:8800/OWMTempData");
          setConditions(res.data.ConditionReports);

          res.data.ConditionReports.map((currentElement) => {
            labels.push(currentElement.date + " - " + currentElement.time);
            tempValues.push(currentElement.temp);
            feelsLikeValues.push(currentElement.feelsLike);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, []);

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

  return <div><Line options={options} data={data} /> < br /> <Bar options={options} data={data} /></div>;

}
export default OWMTempChart;
