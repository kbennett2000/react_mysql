import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

import config from '../config';
const { DataEndpointAddress, FetchInterval, HamConditionsChartDataEndpointSuffix, HamSolarFluxChartTitle } = config;

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// TODO: Edit config parameters
const chartLabel = "Solar Flux";
const chartBorderColor = "rgb(153, 0, 0)";
const chartBackgroundColor = "rgba(153, 0, 0, 0.5)";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: HamSolarFluxChartTitle,
    },
  },
};

// TODO: Change control name
const HAMSolarFluxChart = () => {
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
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(DataEndpointAddress + HamConditionsChartDataEndpointSuffix);

        // TODO: Change table name if needed
        setConditions(res.data.ConditionReports);
        const myLabels = [];
        const myValues = [];

        // TODO: Change table name if needed
        // TODO: Edit charted items here
        res.data.ConditionReports.forEach((currentElement) => {
          myLabels.push(currentElement.date_time);
          myValues.push(currentElement.solar_flux);
        });

        console.log(myLabels);
        console.log(myValues);

        setData({
          labels: myLabels,
          datasets: [
            {
              label: chartLabel,
              data: myValues,
              borderColor: chartBorderColor,
              backgroundColor: chartBackgroundColor,
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
export default HAMSolarFluxChart;
