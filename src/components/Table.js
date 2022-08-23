import React, { Fragment, useMemo, useState } from "react";
import { BiMessageError } from "react-icons/bi";
import PropTypes from "prop-types";

const Table = ({ data, refresh }) => {
  const [count, setCount] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [filterType, setFilterType] = useState("uuid");
  const [filterDate, setFilterDate] = useState("");

  // filtering by criteria
  const filtered = useMemo(() => {
    if (!data) return [];
    else if (!filterText && !filterDate) return data;
    return data
      .filter((item) => item.timestamp.includes(filterDate))
      .filter((item) => item[filterType].includes(filterText));
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
          className="flex-grow py-2 border border-gray-300 rounded-md"
          onInput={(evt) => {
            setFilterText(evt.target.value);
          }}
        />

        {/* filter type */}
        <select
          value={filterType}
          aria-label="filter type"
          className="py-2 border border-gray-300 rounded-md"
          onChange={(evt) => setFilterType(evt.target.value)}
        >
          <option value="uuid">filter by UUID</option>
          <option value="number">filter by number</option>
          <option value="operator">filter by operator</option>
          <option value="timestamp">filter by timestamp</option>
          <option value="status">filter by status</option>
        </select>

        {/* Date range  */}
        <input
          aria-label="date input"
          type="date"
          className="flex-grow py-2 border border-gray-300 rounded-md"
          onInput={(evt) => setFilterDate(evt.target.value)}
        />
        {/* items per page */}
        <select
          value={count}
          aria-label="items per page"
          className="py-2 border border-gray-300 rounded-md"
          onChange={(evt) => setCount(evt.target.value)}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">100 per page</option>
        </select>
        <button
          className="px-6 py-2 text-white bg-blue-800 border-none rounded-md appearance-none"
          onClick={() => refresh()}
        >
          Refresh
        </button>
      </div>
      <table className="table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">UUID</th>
            <th className="p-2">Phone number</th>
            <th className="p-2">Operator Name</th>
            <th className="p-2">TimeStamp</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.length ? (
            <Fragment>
              {pageItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">{item.uuid}</td>
                  <td className="p-2">{item.number}</td>
                  <td className="p-2">{item.operator}</td>
                  <td className="p-2">{item.timestamp}</td>
                  <td className="p-2">{item.status}</td>
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
        <tfoot className="bg-gray-200">
          <tr>
            <td colSpan={4} className="p-2"></td>
            <td className="p-2 font-bold">
              {count} <span className="font-light"> of </span> {filtered.length}
              <span className="font-light"> items</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default Table;
