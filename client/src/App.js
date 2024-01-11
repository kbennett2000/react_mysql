import React, { useState } from 'react';
import HamConditions from './pages/HamConditions';
import WeatherConditions from './pages/WeatherConditions';
import './App.css';



const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <button
          className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-500'} focus:outline-none`}
          onClick={() => handleTabClick(1)}
        >
          Ham Conditions
        </button>
        <button
          className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 2 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-500'} focus:outline-none`}
          onClick={() => handleTabClick(2)}
        >
          Weather Conditions
        </button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <HamConditions />}
        {activeTab === 2 && <WeatherConditions />}
      </div>
    </div>
  );
};

export default App;