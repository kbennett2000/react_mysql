import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherConditions = () => {
  const [conditions, setConditions] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          "http://192.168.0.180:8800/WeatherConditions"
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
      <h1 className="text-3xl font-bold mb-4">Weather Conditions</h1>
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
                        Conditions
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Temp
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                      >
                        Humidity
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
                            {condition.modified_date}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.modified_time}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.weather}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.temp_f}
                          </td>
                          <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {condition.relative_humidity}
                          </td>
                        </tr>
                        {expandedRows[index] && (
                          <tr>
                            <td colspan="12" class="p-4">
                              <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead class="bg-green-100 dark:bg-green-600">
                                  <tr>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Wind Direction
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Wind Degrees
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Wind Knots
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Pressure
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Dewpoint
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Wind Chill
                                    </th>
                                    <th
                                      scope="col"
                                      class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-100"
                                    >
                                      Visibility
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                  <tr>
                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {condition.wind_dir}
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {condition.wind_degrees}
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {condition.wind_kt}
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {condition.pressure_in}
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {condition.dewpoint_f}
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {condition.windchill_f}
                                    </td>

                                    <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {condition.visibility_mi}
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

export default WeatherConditions;