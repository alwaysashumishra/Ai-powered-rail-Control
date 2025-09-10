import React, { useState } from "react";
import Login from "./pages/Login"; 
import NeedHelp from "./components/NeedHelp"; // 👈 added NeedHelp page
import { Route, Routes } from "react-router-dom";
import Routing from "./utils/Routing";

export default function App() {
  
  // 👇 After login show main app
  return (
    <div>
   <Login/>
   <Routing/>
     </div>
  );
}
