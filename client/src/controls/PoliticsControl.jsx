import React, { useState } from "react";
import BidenData from "../pages/BidenData";
import "../App.css";

const PoliticsControl = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <button className={`flex-1 py-2 px-4 border-b-2 ${activeTab === 1 ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"} focus:outline-none`} onClick={() => handleTabClick(1)}>Biden Approval Data</button>
      </div>

      <div className="tab-content mt-4">
        {activeTab === 1 && <BidenData />}
      </div>
    </div>
  );
};

export default PoliticsControl;
