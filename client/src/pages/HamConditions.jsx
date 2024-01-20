import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO: Edit config parameters
const dataEndpointLocation = "http://192.168.1.85:8800/HamConditions";
const pageTitle = "Ham Band Conditions";

// TODO: Change emojis if needed
const goodEmoji = '😍';
const fairEmoji = '😐';
const poorEmoji = '💩';

// TODO: Change page name
const HamConditions = () => {
  const [conditions, setConditions] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(dataEndpointLocation);
      // TODO: Change table name if needed
      setConditions(res.data.ConditionReports);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    // TODO: Adjust 1 minute refresh internal if needed
    const interval = setInterval(fetchData, 1 * 60 * 1000);
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const toggleRow = (index) => {
    setExpandedRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = !newRows[index];
      return newRows;
    });
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Ham Conditions</h1>
      <div className="mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-blue-100 dark:bg-blue-700">
                    <tr>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Time</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">80m-40m Day</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">80m-40m Night</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">30m-20m Day</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">30m-20m Night</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">17m-15m Day</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">17m-15m Night</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">12m-10m Day</th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">12m-10m Night</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {conditions.map((condition, index) => (
                      <React.Fragment key={index}>
                        <tr
                          className={`hover:bg-green-100 dark:hover:bg-green-700 ${
                            index % 2 === 0
                              ? "bg-gray-200 dark:bg-gray-500"
                              : ""
                          }`}
                          onClick={() => toggleRow(index)}
                        >
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.date_time}
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["80m_40m_Day"] === "Good" && goodEmoji}
                            {condition["80m_40m_Day"] === "Fair" && fairEmoji}
                            {condition["80m_40m_Day"] === "Poor" && poorEmoji}
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["80m_40m_Night"] === "Good" && goodEmoji}
                            {condition["80m_40m_Night"] === "Fair" && fairEmoji}
                            {condition["80m_40m_Night"] === "Poor" && poorEmoji}
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["30m_20m_Day"] === "Good" && goodEmoji}
                            {condition["30m_20m_Day"] === "Fair" && fairEmoji}
                            {condition["30m_20m_Day"] === "Poor" && poorEmoji}
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["30m_20m_Night"] === "Good" && goodEmoji}
                            {condition["30m_20m_Night"] === "Fair" && fairEmoji}
                            {condition["30m_20m_Night"] === "Poor" && poorEmoji}
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["17m_15m_Day"] === "Good" && goodEmoji}
                            {condition["17m_15m_Day"] === "Fair" && fairEmoji}
                            {condition["17m_15m_Day"] === "Poor" && poorEmoji}                            
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["17m_15m_Night"] === "Good" && goodEmoji}
                            {condition["17m_15m_Night"] === "Fair" && fairEmoji}
                            {condition["17m_15m_Night"] === "Poor" && poorEmoji}
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["12m_10m_Day"] === "Good" && goodEmoji}
                            {condition["12m_10m_Day"] === "Fair" && fairEmoji}
                            {condition["12m_10m_Day"] === "Poor" && poorEmoji}
                          </td>
                          <td className="py-4 px-6 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition["12m_10m_Night"] === "Good" && goodEmoji}
                            {condition["12m_10m_Night"] === "Fair" && fairEmoji}
                            {condition["12m_10m_Night"] === "Poor" && poorEmoji}
                          </td>
                        </tr>
                        {expandedRows[index] && (
                          <tr>
                            <td colspan="12" className="p-4">
                              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead className="bg-green-100 dark:bg-green-700">
                                  <tr>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Sunspot Number</th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Solar Flux</th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Geomagnetic Storm</th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Solar Wind</th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Noise Floor</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  <tr>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.sunspot_number}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.solar_flux}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.geomagnetic_storm}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.solar_wind}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.noise_floor}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

// TODO: Change page name
export default HamConditions;
