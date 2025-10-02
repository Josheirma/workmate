import React from "react";
import  CalendarProvider  from "./Scheduling/CalendarProvider";
import EmployeeListComponent from "./Scheduling/EmployeeListComponent";
import MonthComponent from "./Scheduling/MonthComponent";
import DailyGraphComponent from "./Scheduling/DailyGraphComponent";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import  {DatabaseComponent}  from "./Scheduling/DatabaseComponent";

export default function App() {
  return (
    <CalendarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div><MonthComponent /> <EmployeeListComponent /> <DatabaseComponent/>    </div>} />
          <Route path="/daily-graph" element={<DailyGraphComponent />} />
        </Routes>
      </BrowserRouter>
    </CalendarProvider>
  );
}


      

