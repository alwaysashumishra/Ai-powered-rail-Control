import React, { useState } from "react";
import {
  LayoutDashboard,
  Train,
  Route,
  Box,
  BarChart3,
  Settings,
  Building,
  Menu,
  X,
} from "lucide-react"; // lucide-react icons

import logo from "../assets/rail-logo.png"; // apna logo

export default function Sidebar({ activeSection, setActiveSection }) {
  const [open, setOpen] = useState(true);

  const sections = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Train Scheduling", icon: <Train size={18} /> },
    { name: "Routing Optimization", icon: <Route size={18} /> },
    { name: "TrainJourney", icon: <Box size={18} /> },
    { name: "Reports & Analytics", icon: <BarChart3 size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
    { name: "Station", icon: <Building size={18} /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      {activeSection !== "TrainJourney" && (
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-lg shadow-lg"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      {activeSection !== "TrainJourney" && (
        <aside
          className={`fixed md:static top-0 left-0 h-screen w-64 bg-white shadow-xl 
              flex flex-col rounded-r-2xl overflow-y-auto 
              transform transition-transform duration-300 z-40
              ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
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
          <nav className="flex-1 p-4 space-y-2">
            {sections.map((s) => (
              <button
                key={s.name}
                onClick={() => setActiveSection(s.name)}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl font-medium text-sm tracking-wide
                transition-all duration-300 ease-in-out
                ${
                  activeSection === s.name
                    ? "bg-gradient-to-r from-blue-400 to-sky-300 text-white shadow-lg scale-[1.02]"
                    : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                }`}
              >
                {s.icon}
                {s.name}
              </button>
            ))}
          </nav>
        </aside>
      )}
    </>
  );
}
