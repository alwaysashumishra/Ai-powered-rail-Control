import React, { useState } from "react";

export default function Station() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [trains, setTrains] = useState([]);

  const addTrain = () => {
    if (from && to) {
      setTrains([...trains, { from, to }]);
      setFrom("");
      setTo("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Station Management</h2>

      <div className="flex gap-4">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">From Station</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Chennai">Chennai</option>
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">To Station</option>
          <option value="Bhopal">Bhopal</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <button
          onClick={addTrain}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Add Train
        </button>
      </div>

      <ul className="list-disc pl-6">
        {trains.map((t, i) => (
          <li key={i}>
            🚆 {t.from} → {t.to}
          </li>
        ))}
      </ul>
    </div>
  );
}
