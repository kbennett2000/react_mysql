import React, { useState } from "react";
import HAMSunspotNumberChart from "../charts/HAMSunspotNumberChart";
import HAMSolarFluxChart from "../charts/HAMSolarFluxChart";
import HAMSolarWindChart from "../charts/HAMSolarWindChart";
import "../App.css";

const HamChartsControl = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex bg-gray-300" style={{ borderRadius: '8px' }}>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(1)}>Sunspot Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 2 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(2)}>Solar Flux Report</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 3 ? "border-blue-500 text-blue-500 bg-blue-200" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(3)}>Solar Wind Report</button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <HAMSunspotNumberChart />}
        {activeTab === 2 && <HAMSolarFluxChart />}
        {activeTab === 3 && <HAMSolarWindChart />}
      </div>
    </div>
  );
};

export default HamChartsControl;
