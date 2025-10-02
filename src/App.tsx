import React from "react";
import  CalendarProvider  from "./Scheduling/CalendarProvider";
import EmployeeListComponent from "./Scheduling/EmployeeListComponent";
import MonthComponent from "./Scheduling/MonthComponent";
import DailyGraphComponent2 from "./Scheduling/DailyGraphComponent2";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <CalendarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div><MonthComponent />  <EmployeeListComponent /></div>} />
          <Route path="/daily-graph" element={<DailyGraphComponent2 />} />
        </Routes>
      </BrowserRouter>
    </CalendarProvider>
  );
}


      

