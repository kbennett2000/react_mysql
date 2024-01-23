import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

import config from '../config';
const { DataEndpointAddress, FetchInterval, OWMChartDataEndpointSuffix, OWMTempChartTitle } = config;

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// TODO: Edit config parameters
const chartLabel = "Temperature";
const chartLabel2 = "Feels Like";
const chartBorderColor = "rgb(255, 99, 132)";
const chartBackgroundColor = "rgba(255, 99, 132, 0.5)";
const chartBorderColor2 = "rgb(53, 162, 235)";
const chartBackgroundColor2 = "rgba(53, 162, 235, 0.5)";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: OWMTempChartTitle,
    },
  },
};

// TODO: Change control name
const OWMTempChart = () => {
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
        const res = await axios.get(DataEndpointAddress + OWMChartDataEndpointSuffix);

        // TODO: Change table name if needed
        setConditions(res.data.ConditionReports);
        const myLabels = [];
        const myValues = [];
        const myValues2 = [];

        // TODO: Change table name if needed
        // TODO: Edit charted items here
        res.data.ConditionReports.forEach((currentElement) => {
          myLabels.push(currentElement.date + " - " + currentElement.time);
          myValues.push(currentElement.temp);
          myValues2.push(currentElement.feelsLike);
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

    const interval = setInterval(fetchData, FetchInterval);
    return () => clearInterval(interval);
  }, []);

  // TODO: Change chart type if needed
  return <div><Line options={options} data={data} /></div>;
};

// TODO: Change control name
export default OWMTempChart;
