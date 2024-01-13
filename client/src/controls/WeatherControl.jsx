import React, { useState } from "react";
import WeatherConditions from "../pages/WeatherConditions";
import OWMConditions from "../pages/OWMConditions";
import WeatherChartsControl from "./WeatherChartsControl";
import "../App.css";

const WeatherControl = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex bg-gray-200" style={{ borderRadius: '8px' }}>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? "border-blue-500 text-blue-500 bg-blue-100" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(1)}>Weather Conditions</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 2 ? "border-blue-500 text-blue-500 bg-blue-100" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(2)}>OpenWeatherMap Conditions</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 3 ? "border-blue-500 text-blue-500 bg-blue-100" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(3)}>Weather Charts</button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <WeatherConditions />}
        {activeTab === 2 && <OWMConditions />}
        {activeTab === 3 && <WeatherChartsControl />}
      </div>
    </div>
  );
};

export default WeatherControl;
