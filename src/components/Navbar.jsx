import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-[#0f172a]/80 to-[#1e293b]/80 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png" // apna logo yaha replace karo
            alt="iRAIL-Control"
            className="h-9 w-9 drop-shadow-lg"
          />
          <span className="text-white font-bold text-xl tracking-wide">
            iRAIL-Control
          </span>
        </div>

        {/* Center - Nav Links (Desktop) */}
        <div className="hidden md:flex space-x-10 text-white font-medium">
          {["Home", "About", "Helpline"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group"
            >
              <span className="transition-colors group-hover:text-blue-400">
                {item}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right - Login Button (Desktop) */}
        <div className="hidden md:block">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-blue-500/50 hover:scale-105 transition-transform duration-300 ease-in-out">
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] px-6 pb-4 space-y-4 text-white font-medium">
          {["Home", "About", "Helpline"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-blue-500/50 transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
