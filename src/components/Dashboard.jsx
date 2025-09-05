import React, { useState } from "react";
import TrainMap from "./Trainmap";

export default function Dashboard() {
  const [mapMaximized, setMapMaximized] = useState(false);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight text-center md:text-left">
          🚆 Railway Dashboard
        </h2>
        <button
          className="px-5 py-2.5 bg-gradient-to-r from-pink-300 to-indigo-300 
                     text-white font-medium rounded-xl shadow-lg hover:scale-105 
                     hover:shadow-2xl transition-all duration-300 ease-in-out"
          onClick={() => setMapMaximized(!mapMaximized)}
        >
          {mapMaximized ? "📉 Minimize Map" : "📈 Maximize Map"}
        </button>
      </div>

      {/* Map container */}
     <div
  className={`transition-all duration-700 ease-in-out rounded-2xl shadow-2xl
    bg-white overflow-hidden transform hover:scale-[1.01] relative z-0
    ${mapMaximized ? "h-[75vh]" : "h-96"}`}
>
  <TrainMap />
</div>

      {/* Info cards (hide when map is maximized) */}
      {!mapMaximized && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conflict Alerts */}
          <div className="p-6 bg-white/80 backdrop-blur-lg border border-gray-200 
                          rounded-2xl shadow-md hover:shadow-2xl transition-all">
            <h3 className="font-bold text-lg text-red-600 mb-3">
              ⚠️ Conflict Alerts
            </h3>
            <p className="text-gray-700">Train 456 and Train 789 on same track</p>
          </div>

          {/* AI Suggestions */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border 
                          border-gray-200 rounded-2xl shadow-md hover:shadow-2xl 
                          transition-all">
            <h3 className="font-bold text-lg text-blue-700 mb-3">🤖 AI Suggestions</h3>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li>Reschedule Train 123 → 10:45</li>
              <li>Reroute via Track 3</li>
            </ul>
          </div>

          {/* Train Queue */}
          <div className="p-6 bg-white/90 backdrop-blur-lg border border-gray-200 
                          rounded-2xl shadow-md hover:shadow-2xl transition-all">
            <h3 className="font-bold text-lg text-green-700 mb-3">🚦 Train Queue</h3>
            <div className="flex flex-col gap-2 text-gray-700">
              <span className="px-3 py-1 bg-green-100 rounded-lg shadow-sm">
                🚆 Train 456
              </span>
              <span className="px-3 py-1 bg-green-100 rounded-lg shadow-sm">
                🚆 Train 789
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
