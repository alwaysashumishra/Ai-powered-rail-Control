import React, { useState } from "react";

export default function TrainScheduling() {
  const [search, setSearch] = useState("");
  const [filterStation, setFilterStation] = useState("All");

  // Sample Train Data
  const trains = [
    {
      id: 101,
      name: "Shatabdi Express",
      type: "Express",
      arrival: "09:30",
      departure: "09:50",
      platform: "1",
      station: "Delhi",
      status: "On Time",
    },
    {
      id: 102,
      name: "Passenger Local",
      type: "Passenger",
      arrival: "10:10",
      departure: "10:25",
      platform: "3",
      station: "Lucknow",
      status: "Delayed",
    },
    {
      id: 103,
      name: "Goods Carrier",
      type: "Goods",
      arrival: "11:00",
      departure: "11:30",
      platform: "5",
      station: "Kanpur",
      status: "On Track",
    },
    {
      id: 104,
      name: "Rajdhani Express",
      type: "Express",
      arrival: "12:00",
      departure: "12:20",
      platform: "2",
      station: "Delhi",
      status: "Conflict",
    },
  ];

  // Filter & Search
  const filteredTrains = trains.filter(
    (t) =>
      (filterStation === "All" || t.station === filterStation) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.station.toLowerCase().includes(search.toLowerCase()))
  );

  // Color coding for train type
  const getRowColor = (type) => {
    switch (type) {
      case "Passenger":
        return "bg-blue-50 border-l-4 border-blue-400";
      case "Express":
        return "bg-green-50 border-l-4 border-green-400";
      case "Goods":
        return "bg-orange-50 border-l-4 border-orange-400";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen rounded-xl shadow-inner">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        🚆 Train Scheduling System
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by train or station..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
        />

        <select
          value={filterStation}
          onChange={(e) => setFilterStation(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none text-sm sm:text-base"
        >
          <option value="All">All Stations</option>
          <option value="Delhi">Delhi</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Kanpur">Kanpur</option>
        </select>
      </div>

      {/* Train Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="px-3 sm:px-6 py-3">Train</th>
              <th className="px-3 sm:px-6 py-3">Type</th>
              <th className="px-3 sm:px-6 py-3">Arrival</th>
              <th className="px-3 sm:px-6 py-3">Departure</th>
              <th className="px-3 sm:px-6 py-3">Platform</th>
              <th className="px-3 sm:px-6 py-3">Station</th>
              <th className="px-3 sm:px-6 py-3">Status</th>
              <th className="px-3 sm:px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrains.length > 0 ? (
              filteredTrains.map((train) => (
                <tr
                  key={train.id}
                  className={`${getRowColor(
                    train.type
                  )} hover:bg-gray-100 transition`}
                >
                  <td className="px-3 sm:px-6 py-3 font-semibold whitespace-nowrap">
                    {train.name}
                  </td>
                  <td className="px-3 sm:px-6 py-3">{train.type}</td>
                  <td className="px-3 sm:px-6 py-3">{train.arrival}</td>
                  <td className="px-3 sm:px-6 py-3">{train.departure}</td>
                  <td className="px-3 sm:px-6 py-3">{train.platform}</td>
                  <td className="px-3 sm:px-6 py-3">{train.station}</td>
                  <td
                    className={`px-3 sm:px-6 py-3 font-medium ${
                      train.status === "Conflict"
                        ? "text-red-600"
                        : train.status === "Delayed"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {train.status}
                  </td>
                  <td className="px-3 sm:px-6 py-3">
                    <button className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-600 text-white hover:scale-105 transition w-full sm:w-auto">
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-gray-50">
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  ❌ No trains found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Conflict Alerts Panel */}
      <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-red-700">
          ⚠️ Conflict Alert
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 mt-1">
          Train 101 (Shatabdi Express) and Train 104 (Rajdhani Express) are
          requesting the same track at <b>Delhi Station</b>.
        </p>
        <button className="mt-3 px-4 py-2 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto">
          Resolve Conflict
        </button>
      </div>
    </div>
  );
}
