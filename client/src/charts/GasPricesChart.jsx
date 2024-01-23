import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

import config from '../config';
const { DataEndpointAddress, FetchInterval, GasPriceChartDataEndpointSuffix, GasPriceChartTitle } = config;

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// TODO: Edit config parameters
const chartLabel = "Regular";
const chartLabel2 = "Mid-Grade";
const chartLabel3 = "Premium";
const chartLabel4 = "Diesel";
const chartBorderColor = "rgb(153, 0, 0)";
const chartBackgroundColor = "rgba(153, 0, 0, 0.5)";
const chartBorderColor2 = "rgb(255, 213, 0)";
const chartBackgroundColor2 = "rgba(255, 213, 0, 0.5)";
const chartBorderColor3 = "rgb(0, 85, 255)";
const chartBackgroundColor3 = "rgba(0, 85, 255, 0.5)";
const chartBorderColor4 = "rgb(0, 128, 0)";
const chartBackgroundColor4 = "rgba(0, 128, 0, 0.5)";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: GasPriceChartTitle,
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
      {
        label: chartLabel3,
        data: [],
        borderColor: chartBorderColor3,
        backgroundColor: chartBackgroundColor3,
      },
      {
        label: chartLabel4,
        data: [],
        borderColor: chartBorderColor4,
        backgroundColor: chartBackgroundColor4,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(DataEndpointAddress + GasPriceChartDataEndpointSuffix);

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
          myValues.push(currentElement.regularPrice.replace('$', ''));
          myValues2.push(currentElement.midGradePrice.replace('$', ''));
          myValues3.push(currentElement.premiumPrice.replace('$', ''));
          myValues4.push(currentElement.dieselPrice.replace('$', ''));
        });

        console.log(myLabels);
        console.log(myValues);
        console.log(myValues2);
        console.log(myValues3);
        console.log(myValues4);

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

    const interval = setInterval(fetchData, FetchInterval);
    return () => clearInterval(interval);
  }, []);

  // TODO: Change chart type if needed
  return <div><Line options={options} data={data} /></div>;
};

// TODO: Change control name
export default GasPricesChart;
