import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// TODO: Edit config parameters
const chartTitle = "Colorado Gas Price Report";
const chartLabel = "Regular";
const chartLabel2 = "Mid-Grade";
const chartLabel3 = "Premium";
const chartLabel4 = "Diesel";
const chartBorderColor = "rgb(255, 99, 132)";
const chartBackgroundColor = "rgba(255, 99, 132, 0.5)";
const chartBorderColor2 = "rgb(53, 162, 235)";
const chartBackgroundColor2 = "rgba(53, 162, 235, 0.5)";
const chartBorderColor3 = "rgb(53, 162, 235)";
const chartBackgroundColor3 = "rgba(53, 162, 235, 0.5)";
const chartBorderColor4 = "rgb(53, 162, 235)";
const chartBackgroundColor4 = "rgba(53, 162, 235, 0.5)";
const dataEndpointLocation = "http://192.168.0.235:8800/GasPriceChartData";

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
const GasPricesChart = () => {
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
        setConditions(res.data.GasPrices);
        const myLabels = [];
        const myValues = [];
        const myValues2 = [];
        const myValues3 = [];
        const myValues4 = [];

        // TODO: Change table name if needed
        // TODO: Edit charted items here
        res.data.GasPrices.forEach((currentElement) => {
          myLabels.push(currentElement.date + " - " + currentElement.time);
          myValues.push(currentElement.regularPrice);
          myValues2.push(currentElement.midGradePrice);
          myValues3.push(currentElement.premiumPrice);
          myValues4.push(currentElement.dieselPrice);
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
            {
                label: chartLabel3,
                data: myValues3,
                borderColor: chartBorderColor3,
                backgroundColor: chartBackgroundColor3,
            },
            {
                label: chartLabel4,
                data: myValues4,
                borderColor: chartBorderColor4,
                backgroundColor: chartBackgroundColor4,
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
export default GasPricesChart;
