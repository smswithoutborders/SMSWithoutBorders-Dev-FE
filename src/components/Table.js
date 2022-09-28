import React, { Fragment, useMemo, useState } from "react";
import { BiMessageError } from "react-icons/bi";
import { BsArrowClockwise } from "react-icons/bs";
import PropTypes from "prop-types";

const Table = ({
  data,
  refresh,
  defaultTime,
  pollingTimes,
  updatePollingTime,
}) => {
  const [count, setCount] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  // filtering by criteria
  const filtered = useMemo(() => {
    if (!data) return [];
    else if (!filterText && !filterDate) return data;
    else if (filterType !== "all") {
      return data
        .filter((item) => item.createdAt.includes(filterDate))
        .filter((item) => item[filterType].includes(filterText));
    }
    return data
      .filter((item) => item.createdAt.includes(filterDate))
      .filter((item) => {
        let match = false;
        for (const key in item) {
          // fuzzy matching
          if (item[key].toLowerCase().includes(filterText.toLowerCase())) {
            match = true;
          }
        }
        return match;
      });
  }, [data, filterText, filterType, filterDate]);

  // items per page
  const pageItems = useMemo(() => {
    if (!filtered) return [];
    return filtered.slice(0, count);
  }, [filtered, count]);

  return (
    <Fragment>
      <div className="flex flex-col flex-wrap space-y-2 md:space-y-0 md:space-x-2 md:items-center md:flex-row">
        {/* filter text */}
        <input
          aria-label="filter"
          type="text"
          placeholder="filter"
          className="flex-grow py-2 bg-gray-800 border-gray-500 rounded-md"
          onInput={(evt) => {
            setFilterText(evt.target.value);
          }}
        />

        {/* filter type */}
        <select
          value={filterType}
          aria-label="filter type"
          className="py-2 bg-gray-800 border-gray-500 rounded-md"
          onChange={(evt) => setFilterType(evt.target.value)}
        >
          <option value="all">filter by all</option>
          <option value="uid">filter by UID</option>
          <option value="phone_number">filter by recipient</option>
          <option value="operator_name">filter by operator</option>
          <option value="createdAt">filter by timestamp</option>
          <option value="status">filter by status</option>
          <option value="message">filter by message</option>
        </select>

        {/* Date range  */}
        <input
          aria-label="date input"
          type="date"
          className="flex-grow py-2 bg-gray-800 border-gray-500 rounded-md"
          onInput={(evt) => setFilterDate(evt.target.value)}
        />
        {/* items per page */}
        <select
          value={count}
          aria-label="items per page"
          className="py-2 bg-gray-800 border-gray-500 rounded-md"
          onChange={(evt) => setCount(evt.target.value)}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>

        {/*polling time */}
        <div className="flex items-center justify-between p-0 bg-gray-800 border border-gray-500 rounded-md focus:ring-blue-800">
          <select
            value={defaultTime}
            aria-label="polling time"
            className="flex-1 bg-transparent border-0 border-r border-gray-500 rounded-l-md"
            onChange={(evt) => updatePollingTime(evt.target.value)}
          >
            {pollingTimes.map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>

          <button
            className="px-4 py-2 text-gray-300 rounded-r-md"
            onClick={() => refresh()}
          >
            <BsArrowClockwise size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="table-auto">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2">UID</th>
              <th className="p-2">Recipient</th>
              <th className="p-2">Operator Name</th>
              <th className="p-2">TimeStamp</th>
              <th className="p-2">Status</th>
              <th className="p-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length ? (
              <Fragment>
                {pageItems.map((item) => (
                  <tr key={item.uid}>
                    <td className="p-2">{item.uid}</td>
                    <td className="p-2">{item.phone_number}</td>
                    <td className="p-2">{item.operator_name}</td>
                    <td className="p-2">{item.createdAt}</td>
                    <td className="p-2">{item.status}</td>
                    <td className="p-2">{item.message}</td>
                  </tr>
                ))}
              </Fragment>
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <BiMessageError size={48} className="inline" />
                  <p className="my-1 text-lg">
                    No {filterText ? " matching" : "available"} items
                  </p>
                  {filterText && (
                    <p className="mt-0">Try changing the filter type</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-gray-700">
            <tr>
              <td colSpan={6} className="p-2 font-bold">
                {count} <span className="font-light"> of </span>
                {filtered?.length}
                <span className="font-light"> items</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Fragment>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
  defaultTime: PropTypes.number.isRequired,
  pollingTimes: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatePollingTime: PropTypes.func.isRequired,
};

export default Table;
