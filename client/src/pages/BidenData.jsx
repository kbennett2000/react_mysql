import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO: Edit config parameters
const dataEndpointLocation = "http://192.168.0.235:8800/BidenData";
const pageTitle = "Biden's Approval Rating";

// TODO: Change page name
const BidenData = () => {
  const [conditions, setConditions] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(dataEndpointLocation);
      // TODO: Change table name if needed
      setConditions(res.data.BidenApproval);
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
      <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
      <div class="mx-auto">
        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-blue-100 dark:bg-blue-700">
                    <tr>
                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Date</th>
                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Time</th>
                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Report Date</th>
                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Approve</th>
                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">Disapprove</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {conditions.map((condition, index) => (
                      <React.Fragment key={index}>
                        <tr className={`hover:bg-green-100 dark:hover:bg-green-700 ${index % 2 === 0 ? "bg-gray-200 dark:bg-gray-500" : "" }`} onClick={() => toggleRow(index)}>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.date}</td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.time}</td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.reportDate}</td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.approveEstimate}</td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.disapproveEstimate}</td>
                        </tr>
                        {expandedRows[index] && (
                          <tr>
                            <td colspan="12" class="p-4">
                              <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead class="bg-green-100 dark:bg-green-700">
                                  <tr>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">1</th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100">2</th>
                                  </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  <tr>
                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.date}</td>
                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{condition.time}</td>
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
export default BidenData;
