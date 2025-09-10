import React, { useState } from "react";
import Login from "./pages/Login"; 
import { Route, Routes } from "react-router-dom";


export default function App() {
  
  // 👇 After login show main app
  return (
    <div>
   <Login/>
     </div>
  );
}
