import React from "react";
import { MapContainer, Polyline, Marker, Tooltip, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom train icon
const trainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/189/189001.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Station coordinates
const stationsCoords = {
  "Delhi": [28.6139, 77.2090],
  "Bhopal": [23.2599, 77.4126],
  "Mumbai": [19.0760, 72.8777],
  "Pune": [18.5204, 73.8567],
  "Vijayawada": [16.5062, 80.6480],
  "Hyderabad": [17.3850, 78.4867],
};

// Sample trains
const trains = [
  { id: "G123", type: "Express", station: "Delhi" },
  { id: "P456", type: "Passenger", station: "Mumbai" },
  { id: "F789", type: "Freight", station: "Vijayawada" },
];

export default function TrainMap({ startStation, endStation }) {
  const routeLine =
    startStation && endStation
      ? [stationsCoords[startStation], stationsCoords[endStation]]
      : [];

  return (
    <div className="w-full h-full" style={{ minHeight: "100%" }}>
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Optional TileLayer for minimal style */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Draw selected route */}
        {routeLine.length === 2 && (
          <Polyline positions={routeLine} color="blue" weight={4} />
        )}

        {/* Train markers */}
        {trains.map((train) => (
          <Marker
            key={train.id}
            position={stationsCoords[train.station]}
            icon={trainIcon}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              {train.id} ({train.type})
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
