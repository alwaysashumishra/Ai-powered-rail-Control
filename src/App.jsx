import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard"; 
import TrainScheduling from "./components/Trainscheduling";
import Routing from "./components/Routing";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Station from "./components/Station";
import TrainJourney from "./components/TrainJourney";
import Login from "./components/Login";   // 👈 Login component add kiya

export default function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 login track karne ke liye

  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Train Scheduling":
        return <TrainScheduling />;
      case "Routing Optimization":
        return <Routing />;
      case "TrainJourney":
        return <TrainJourney/>;
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

  // 👇 Agar login nahi hai to Login page dikhao
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

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
