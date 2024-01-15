/*
import React, { useEffect, useState } from "react";
import axios from "axios";

const PiStarConditions = () => {
  const [conditions, setConditions] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://192.168.0.235:8800/PiStarConditions"
        );
        setConditions(res.data.ConditionReports);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
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
      <h1 className="text-3xl font-bold mb-4">PiStar Conditions</h1>
      <div class="mx-auto">
        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-blue-100 dark:bg-blue-700">
                    <tr>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        CPU Temp
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Linked To
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
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
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.date}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.time}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.cpu_temp}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.linked_to}
                          </td>
                        </tr>
                        {expandedRows[index] && (
                          <tr>
                            <td colspan="12" class="p-4">
                              <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead class="bg-green-100 dark:bg-green-700">
                                  <tr>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Sunspot Number
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Solar Flux
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Geomagnetic Storm
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Solar Wind
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Noise Floor
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  <tr>
                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      1
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      2
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      3
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      4
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      5
                                    </td>
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

export default PiStarConditions;
*/


import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO: Edit config parameters
const dataEndpointLocation = "http://192.168.1.85:8800/PiStarConditions";
const pageTitle = "PiStar Conditions";

// TODO: Change page name
const PiStarConditions = () => {
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
      <h1 className="text-3xl font-bold mb-4">PiStar Conditions</h1>
      <div class="mx-auto">
        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-blue-100 dark:bg-blue-700">
                    <tr>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        CPU Temp
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Linked To
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
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
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.date}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.time}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.cpu_temp}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.linked_to}
                          </td>
                        </tr>
                        {expandedRows[index] && (
                          <tr>
                            <td colspan="12" class="p-4">
                              <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead class="bg-green-100 dark:bg-green-700">
                                  <tr>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Sunspot Number
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Solar Flux
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Geomagnetic Storm
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Solar Wind
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Noise Floor
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  <tr>
                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      1
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      2
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      3
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      4
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      5
                                    </td>
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
export default PiStarConditions;
