import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ---------- Icons ----------
const stationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const movingTrainIcon = new L.Icon({
  iconUrl:
    "https://i.pinimg.com/736x/79/11/04/7911040e4a9a042a45bc5c654f74016f.jpg",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// ---------- Map Auto Fit ----------
const MapZoomToBounds = ({ positions }) => {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds, { padding: [40, 40] });
      }, 300);
    }
  }, [positions, map]);
  return null;
};

// ---------- Dummy Data ----------
const trains = [
  {
    number: "12101",
    name: "Delhi Express",
    color: "#007bff",
    schedule: [
      {
        station: "Delhi",
        arrival: "09:00",
        departure: "09:10",
        coords: [28.7041, 77.1025],
        platform: 7,
      },
      {
        station: "Mathura",
        arrival: "11:00",
        departure: "11:10",
        coords: [27.4924, 77.6737],
        platform: 2,
      },
      {
        station: "Agra",
        arrival: "12:30",
        departure: "12:40",
        coords: [27.1767, 78.0081],
        platform: 4,
      },
      {
        station: "Gwalior",
        arrival: "14:00",
        departure: "14:10",
        coords: [26.2183, 78.1828],
        platform: 1,
      },
      {
        station: "Jhansi",
        arrival: "15:30",
        departure: "15:40",
        coords: [25.4484, 78.5685],
        platform: 3,
      },
      {
        station: "Bhopal",
        arrival: "18:00",
        departure: "18:10",
        coords: [23.2599, 77.4126],
        platform: 5,
      },
    ],
  },
  {
    number: "22439",
    name: "Vande Bharat",
    color: "#9c27b0",
    schedule: [
      {
        station: "Delhi",
        arrival: "05:30",
        departure: "05:40",
        coords: [28.7041, 77.1025],
        platform: 1,
      },
      {
        station: "Agra",
        arrival: "07:00",
        departure: "07:10",
        coords: [27.1767, 78.0081],
        platform: 2,
      },
      {
        station: "Jhansi",
        arrival: "09:30",
        departure: "09:40",
        coords: [25.4484, 78.5685],
        platform: 5,
      },
      {
        station: "Bhopal",
        arrival: "12:00",
        departure: "12:10",
        coords: [23.2599, 77.4126],
        platform: 4,
      },
    ],
  },
];

// ---------- Main ----------
const TrainJourney = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [date, setDate] = useState("");
  const [availableTrains, setAvailableTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trainPosition, setTrainPosition] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const intervalRef = useRef(null);

  const allStations = Array.from(
    new Set(trains.flatMap((t) => t.schedule.map((s) => s.station)))
  );

  // ---------- Search ----------
  const handleSearchTrain = () => {
    if (!start || !end) {
      alert("⚠️ Select start and end station.");
      return;
    }
    const found = trains.filter((t) => {
      const stations = t.schedule.map((s) => s.station);
      return (
        stations.includes(start) &&
        stations.includes(end) &&
        stations.indexOf(start) < stations.indexOf(end)
      );
    });
    setAvailableTrains(found);
    setSelectedTrain(null);
  };

  // ---------- Select ----------
  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
    setTrainPosition(train.schedule[0].coords);
    setAnimating(true);
    setTimelineProgress(0);
  };

  // ---------- Animate ----------
  useEffect(() => {
    if (!animating || !selectedTrain) return;
    let index = 0,
      progress = 0;
    const schedule = selectedTrain.schedule;

    intervalRef.current = setInterval(() => {
      if (index >= schedule.length - 1) {
        clearInterval(intervalRef.current);
        setAnimating(false);
        return;
      }
      const [lat1, lon1] = schedule[index].coords;
      const [lat2, lon2] = schedule[index + 1].coords;
      const lat = lat1 + (lat2 - lat1) * progress;
      const lon = lon1 + (lon2 - lon1) * progress;
      setTrainPosition([lat, lon]);
      setTimelineProgress(index + progress);
      progress += 0.02;
      if (progress >= 1) {
        progress = 0;
        index++;
      }
    }, 200);

    return () => clearInterval(intervalRef.current);
  }, [animating, selectedTrain]);

  return (
    <div className="train-app">
      {/* Left Panel */}
      <div className="left-panel">
        <h2 className="title">🚆 Train Planner</h2>

        {/* Search */}
        <div className="card search-card">
          <h3>Plan Your Journey</h3>
          <div className="form">
            <select value={start} onChange={(e) => setStart(e.target.value)}>
              <option value="">--Start--</option>
              {allStations.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select value={end} onChange={(e) => setEnd(e.target.value)}>
              <option value="">--End--</option>
              {allStations.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={handleSearchTrain}>🔍 Search</button>
          </div>
        </div>

        {/* Available Trains */}
        {!selectedTrain && availableTrains.length > 0 && (
          <div>
            <h3 className="section-heading">Available Trains</h3>
            {availableTrains.map((t) => (
              <div
                key={t.number}
                className="card train-card"
                onClick={() => handleSelectTrain(t)}
              >
                <div className="train-name" style={{ color: t.color }}>
                  {t.name} ({t.number})
                </div>
                <div>
                  {t.schedule[0].station} →{" "}
                  {t.schedule[t.schedule.length - 1].station}
                </div>
                <small>
                  Departure: {t.schedule[0].departure} | Arrival:{" "}
                  {t.schedule[t.schedule.length - 1].arrival}
                </small>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {selectedTrain && (
          <div className="card timeline-card">
            <h3 style={{ color: selectedTrain.color }}>
              {selectedTrain.name} Journey Timeline
            </h3>
            <table className="timeline-table">
              <thead>
                <tr>
                  <th>Station</th>
                  <th>Arrival</th>
                  <th>Departure</th>
                  <th>PF</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedTrain.schedule.map((s, idx) => {
                  let status = "Yet to arrive";
                  if (timelineProgress > idx) status = "Departed";
                  if (Math.floor(timelineProgress) === idx) status = "At station";

                  return (
                    <tr
                      key={idx}
                      className={
                        timelineProgress >= idx && timelineProgress < idx + 1
                          ? "active-row"
                          : ""
                      }
                    >
                      <td>🚉 {s.station}</td>
                      <td style={{ color: "green" }}>{s.arrival}</td>
                      <td style={{ color: "red" }}>{s.departure}</td>
                      <td>{s.platform}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            status === "Yet to arrive"
                              ? "yellow"
                              : status === "Departed"
                              ? "gray"
                              : "green"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="map-panel">
        <MapContainer
          center={[28.7041, 77.1025]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {selectedTrain && (
            <>
              <Polyline
                positions={selectedTrain.schedule.map((s) => s.coords)}
                color={selectedTrain.color}
                weight={5}
                dashArray="6,8"
              />
              {selectedTrain.schedule.map((s, idx) => (
                <Marker key={idx} position={s.coords} icon={stationIcon}>
                  <Popup>
                    <b>{s.station}</b>
                    <br />
                    Arrival: {s.arrival}
                    <br />
                    Departure: {s.departure}
                    <br />
                    PF: {s.platform}
                  </Popup>
                </Marker>
              ))}
              {trainPosition && (
                <Marker position={trainPosition} icon={movingTrainIcon}>
                  <Popup>🚆 Moving</Popup>
                </Marker>
              )}
              <MapZoomToBounds
                positions={selectedTrain.schedule.map((s) => s.coords)}
              />
            </>
          )}
        </MapContainer>
      </div>

      {/* Styles */}
      <style>{`
        .train-app {
          display: flex;
          flex-direction: row;
          height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          background: #f4f6fa;
        }
        .left-panel {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: #fff;
          box-shadow: 2px 0 6px rgba(0,0,0,0.08);
        }
        .map-panel {
          flex: 2;
          height: 100%;
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
          color: #0047ab;
          font-weight: 700;
        }
        .card {
          background: #fff;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 15px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          transition: 0.3s;
        }
        .card:hover { transform: scale(1.01); }
        .search-card h3 { margin-bottom: 12px; color: #0047ab; }
        .form { display: flex; flex-wrap: wrap; gap: 10px; }
        select, input, button {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #ccc;
          flex: 1;
        }
        button {
          background: #0047ab;
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: 0.2s;
        }
        button:hover { background: #002d72; }
        .section-heading { margin: 15px 0; font-weight: 600; }
        .train-card { cursor: pointer; }
        .train-card:hover { box-shadow: 0 6px 12px rgba(0,0,0,0.1); }
        .train-name { font-size: 16px; font-weight: 700; }

        /* Timeline Table */
        .timeline-card { overflow-x: auto; }
        .timeline-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .timeline-table th {
          background: #f0f4ff;
          padding: 8px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #ddd;
        }
        .timeline-table td {
          padding: 8px;
          border-bottom: 1px solid #eee;
        }
        .active-row {
          background: #e8f0ff;
          border-left: 4px solid #0047ab;
        }
        .status-badge {
          padding: 3px 8px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-badge.yellow {
          background: #fff3cd;
          color: #856404;
        }
        .status-badge.gray {
          background: #e2e3e5;
          color: #383d41;
        }
        .status-badge.green {
          background: #d4edda;
          color: #155724;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .train-app { flex-direction: column; }
          .map-panel { height: 50vh; }
          .left-panel { height: 50vh; }
        }
      `}</style>
    </div>
  );
};

export default TrainJourney;
