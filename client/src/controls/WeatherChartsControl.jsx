import React, { useState } from "react";
import OWMTempChart from "../charts/OWMTempChart";
import OWMTempChart30Day from "../charts/OWMTempChart30Day";
import OWMCloudinessChart from "../charts/OWMCloudinessChart";
import OWMWindSpeedChart from "../charts/OWMWindSpeedChart";
import OWMHumidityChart from "../charts/OWMHumidityChart";
import "../App.css";

const WeatherChartsControl = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex bg-gray-300" style={{ borderRadius: '8px' }}>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(1)}>24 Hour Temperature Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 2 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(2)}>30 Day Temperature Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 3 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(3)}>Cloudiness Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 4 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(4)}>Wind Speed Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 5 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(5)}>Relative Humidity Report</button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <OWMTempChart />}
        {activeTab === 2 && <OWMTempChart30Day />}
        {activeTab === 3 && <OWMCloudinessChart />}
        {activeTab === 4 && <OWMWindSpeedChart />}
        {activeTab === 5 && <OWMHumidityChart />}
      </div>
    </div>
  );
};

export default WeatherChartsControl;
