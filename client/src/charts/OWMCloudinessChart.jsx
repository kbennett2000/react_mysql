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
      text: "24 Cloudiness Report",
    },
  },
};

const labels = [];
const cloudinessValues = [];
let hasRun = false;

const OWMCloudinessChart = () => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        if (!hasRun) {
          hasRun = true;
          const res = await axios.get("http://192.168.0.235:8800/OWMChartData");
          setConditions(res.data.ConditionReports);

          res.data.ConditionReports.map((currentElement) => {
            labels.push(currentElement.date + " - " + currentElement.time);
            cloudinessValues.push(currentElement.cloudiness.replace('%', ''));
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
        label: "Cloudiness",
        data: labels.map((currentElement, index) => cloudinessValues[index]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <div><Bar options={options} data={data} /></div>;

}
export default OWMCloudinessChart;
