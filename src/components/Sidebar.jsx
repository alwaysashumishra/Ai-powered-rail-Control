import React from "react";
import logo from "../assets/rail-logo.png"; // apna logo file yahan rakho (src/assets/rail-logo.png)

export default function Sidebar({ activeSection, setActiveSection }) {
  const sections = [
    "Dashboard",
    "Train Scheduling",
    "Routing Optimization",
    "Resource Utilization",
    "Reports & Analytics",
    "Settings",
    "Station",
  ];

  return (
    <aside className="w-64 bg-white shadow-xl flex flex-col rounded-r-2xl overflow-hidden">
      {/* Header with Logo */}
      <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-blue-400 to-sky-300 shadow-md">
        <img
          src={logo}
          alt="Railways Logo"
          className="w-12 h-12 rounded-full border-2 border-white shadow"
        />
        <span className="font-bold text-lg text-white tracking-wide">
          Ministry of Railways
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-3">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`w-full text-left px-5 py-3 rounded-xl font-medium text-sm tracking-wide
              transition-all duration-300 ease-in-out
              ${
                activeSection === s
                 ? "bg-gradient-to-r from-gray-400 to-blue-300 text-white shadow-lg scale-[1.02]"
                  : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
              }`}
          >
            {s}
          </button>
        ))}
      </nav>
    </aside>
  );
}
