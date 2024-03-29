import React, { useState } from "react";
import WeatherControl from "./controls/WeatherControl";
import PoliticsControl from "./controls/PoliticsControl";
import HamControl from "./controls/HamControl";
import EconomicsControl from "./controls/EconomicsControl";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex bg-gray-100" style={{ borderRadius: '8px' }}>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? "border-blue-500 text-blue-500 bg-blue-50" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(1)}>Weather</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 2 ? "border-blue-500 text-blue-500 bg-blue-50" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(2)}>Politics</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 3 ? "border-blue-500 text-blue-500 bg-blue-50" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(3)}>Ham Radio</button>
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 4 ? "border-blue-500 text-blue-500 bg-blue-50" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(4)}>Economics</button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <WeatherControl />}
        {activeTab === 2 && <PoliticsControl />}
        {activeTab === 3 && <HamControl />}
        {activeTab === 4 && <EconomicsControl />}
      </div>
    </div>
  );
};

export default App;
