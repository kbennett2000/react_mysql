import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

import config from '../config';
const { ServerIPAddress, ServerPort, FetchInterval, OWMChartDataEndpointSuffix, OWMCloudinessChartTitle } = config;

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// TODO: Edit config parameters
const chartLabel = "Cloudiness";
const chartBorderColor = "rgb(204, 136, 0)";
const chartBackgroundColor = "rgba(204, 136, 0, 0.5)";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: OWMCloudinessChartTitle,
    },
  },
};

// TODO: Change control name
const OWMCloudinessChart = () => {
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
        const res = await axios.get(`http://${ServerIPAddress}:${ServerPort}/${OWMChartDataEndpointSuffix}`);
        
        // TODO: Change table name if needed
        setConditions(res.data.ConditionReports);
        const myLabels = [];
        const myValues = [];

        // TODO: Change table name if needed
        // TODO: Edit charted items here
        res.data.ConditionReports.forEach((currentElement) => {
          myLabels.push(currentElement.date + " - " + currentElement.time);
          myValues.push(currentElement.cloudiness.replace('%', ''));
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
  return <div><Bar options={options} data={data} /></div>;
};

// TODO: Change control name
export default OWMCloudinessChart;
