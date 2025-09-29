import React from "react";
import  CalendarProvider  from "./Scheduling/CalendarProvider";
import EmployeeListComponent from "./Scheduling/EmployeeListComponent";
import MonthComponent from "./Scheduling/MonthComponent";

export default function App() {
  return (
    <CalendarProvider>
      <MonthComponent />
      <EmployeeListComponent />
    </CalendarProvider>
  );
}