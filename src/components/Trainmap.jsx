import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom train icon
const trainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/189/189001.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function TrainMap() {
  const trains = [
    { id: "G123", type: "Express", lat: 28.6139, lon: 77.2090, route: "Delhi → Bhopal" },
    { id: "P456", type: "Passenger", lat: 19.0760, lon: 72.8777, route: "Mumbai → Pune" },
    { id: "F789", type: "Freight", lat: 17.3850, lon: 78.4867, route: "Vijayawada → Hyderabad" },
  ];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        className="w-full h-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trains.map((train) => (
          <Marker
            key={train.id}
            position={[train.lat, train.lon]}
            icon={trainIcon}
          >
            <Popup>
              <b>{train.id} ({train.type})</b>
              <br />
              Route: {train.route}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
