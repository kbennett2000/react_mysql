import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend,} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// TODO: Edit config parameters
const chartTitle = "Sunspot Number Chart";
const chartLabel = "Sunspot Number";
const chartBorderColor = "rgb(53, 162, 235)";
const chartBackgroundColor = "rgba(53, 162, 235, 0.5)";

const dataEndpointLocation = "http://192.168.1.85:8800/HamConditionsChartData";

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
const HAMSunspotNumberChart = () => {
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
        const res = await axios.get(dataEndpointLocation);

        // TODO: Change table name if needed
        setConditions(res.data.ConditionReports);
        const myLabels = [];
        const myValues = [];

        // TODO: Change table name if needed
        // TODO: Edit charted items here
        res.data.ConditionReports.forEach((currentElement) => {
          myLabels.push(currentElement.date_time);
          myValues.push(currentElement.sunspot_number);
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

    // TODO: Change from 1 minute interval if needed
    const interval = setInterval(fetchData, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // TODO: Change chart type if needed
  return <div><Line options={options} data={data} /></div>;
};

// TODO: Change control name
export default HAMSunspotNumberChart;
