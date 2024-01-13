import React, { useState } from "react";
import OWMTempChart from "../charts/OWMTempChart";
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
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(1)}>Temperature Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 2 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(2)}>Cloudiness Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 3 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(3)}>Wind Speed Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 4 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(4)}>Relative Humidity Report</button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <OWMTempChart />}
        {activeTab === 2 && <OWMCloudinessChart />}
        {activeTab === 3 && <OWMWindSpeedChart />}
        {activeTab === 4 && <OWMHumidityChart />}
      </div>
    </div>
  );
};

export default WeatherChartsControl;
