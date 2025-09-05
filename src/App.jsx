import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard"; 
import TrainScheduling from "./components/TrainScheduling";
import Routing from "./components/Routing";
import Resource from "./components/Resource";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Station from "./components/Station";


export default function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Train Scheduling":
        return <TrainScheduling />;
      case "Routing Optimization":
        return <Routing />;
      case "Resource Utilization":
        return <Resource />;
      case "Reports & Analytics":
        return <Reports />;
      case "Settings":
        return <Settings />;
      case "Station":
        return <Station />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        {renderSection()}
      </main>
    </div>
  );
}
