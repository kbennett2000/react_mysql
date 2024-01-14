import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// TODO: Edit config parameters
const chartTitle = "Joe Biden's Approval Rating";
const chartLabel = "Approve";
const chartLabel2 = "Disapprove";
const chartBorderColor = "rgb(53, 162, 235)";
const chartBackgroundColor = "rgba(53, 162, 235, 0.5)";
const chartBorderColor2 = "rgb(255, 99, 132)";
const chartBackgroundColor2 = "rgba(255, 99, 132, 0.5)";
const dataEndpointLocation = "http://192.168.0.235:8800/BidenChartData";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: chartTitle,
    },
  },
};

// TODO: Change control name
const BidenApprovalChart = () => {
  const [conditions, setConditions] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: chartLabel,
        data: [],
        borderColor: chartBorderColor,
        backgroundColor: chartBackgroundColor,
      },
      {
        label: chartLabel2,
        data: [],
        borderColor: chartBorderColor2,
        backgroundColor: chartBackgroundColor2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(dataEndpointLocation);
        
        // TODO: Change table name if needed
        setConditions(res.data.BidenApproval);
        const myLabels = [];
        const myValues = [];
        const myValues2 = [];

        // TODO: Change table name if needed
        // TODO: Edit charted items here
        res.data.BidenApproval.forEach((currentElement) => {
          myLabels.push(currentElement.reportDate);
          myValues.push(currentElement.approveEstimate);
          myValues2.push(currentElement.disapproveEstimate);
        });

        setData({
          labels: myLabels,
          datasets: [
            {
              label: chartLabel,
              data: myValues,
              borderColor: chartBorderColor,
              backgroundColor: chartBackgroundColor,
            },
            {
              label: chartLabel2,
              data: myValues2,
              borderColor: chartBorderColor2,
              backgroundColor: chartBackgroundColor2,
            },
          ],
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Initial fetch

    // TODO: Change from 1 minute interval if needed
    const interval = setInterval(fetchData, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // TODO: Change chart type if needed
  return <div><Line options={options} data={data} /></div>;
};

// TODO: Change control name
export default BidenApprovalChart;
