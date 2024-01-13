import React, { useState } from "react";
import HamConditions from "./pages/HamConditions";
import WeatherConditions from "./pages/WeatherConditions";
import PiStarConditions from "./pages/PiStarConditions";
import OWMConditions from "./pages/OWMConditions";
import OWMTempChart from "./pages/OWMTempChart";
import BidenData from "./pages/BidenData";

import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(1)}>Ham Conditions</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 2 ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(2)}>Weather Conditions</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 3 ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(3)}>PiStar Conditions</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 4 ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(4)}>OpenWeatherMap Conditions</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 5 ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(5)}>Biden Approval</button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <HamConditions />}
        {activeTab === 2 && <WeatherConditions />}
        {activeTab === 3 && <PiStarConditions />}
        {activeTab === 4 && <div><OWMConditions /> <br /> <OWMTempChart /></div>}
        {activeTab === 5 && <BidenData />}
      </div>
    </div>
  );
};

export default App;
