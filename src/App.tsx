import React from "react";
import CalendarProvider from "./Scheduling/CalendarProvider";
import MonthComponent from "./Scheduling/MonthComponent"; // your calendar UI
import EmployeeListComponent from "./Scheduling/EmployeeListComponent";

export default function App() {
  return (
    <CalendarProvider>
      <div style={{ display: "flex", gap: 24 }}>
        <MonthComponent />
        <EmployeeListComponent />
      </div>
    </CalendarProvider>
  );
}
