import React, { useEffect, useState } from "react";
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
      text: "90 Day Biden Approval Ratings",
    },
  },
};

const labels = [];
const approveValues = [];
const disapproveValues = [];
let hasRun = false;

const BidenApprovalChart = () => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        if (!hasRun) {
          hasRun = true;
          const res = await axios.get("http://192.168.0.235:8800/BidenData");
          setConditions(res.data.ConditionReports);

          res.data.ConditionReports.map((currentElement) => {
            labels.push(currentElement.reportDate);
            approveValues.push(currentElement.approveEstimate);
            disapproveValues.push(currentElement.disapproveEstimate);
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
        label: "Approve",
        data: labels.map((currentElement, index) => approveValues[index]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
      {
        label: "Disapprove",
        data: labels.map((currentElement, index) => disapproveValues[index]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default BidenApprovalChart;
