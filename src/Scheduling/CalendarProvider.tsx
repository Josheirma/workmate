// this file exports ONLY the provider component (default export).
// Do not export other constants/types from this file.
import React, { useState } from "react";
import { CalendarContext, defaultCalendarContext, User } from "./CalendarContext";

export default function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<Record<string, User[]>>(defaultCalendarContext.users);
  const [selectedDate, setSelectedDate] = useState<string | null>(defaultCalendarContext.selectedDate);
  const [month, setMonth] = useState<number>(defaultCalendarContext.currentMonth);
  const [year, setYear] = useState<number>(defaultCalendarContext.currentYear);

  const addUser = (date: string, user: User) => {
    setUsers(prev => ({ ...prev, [date]: prev[date] ? [...prev[date], user] : [user] }));
  };

  const deleteUser = (date: string, index: number) => {
    setUsers(prev => {
      const next = { ...prev };
      const arr = next[date] ? [...next[date]] : [];
      arr.splice(index, 1);
      next[date] = arr;
      return next;
    });
  };

  // Only export the provider component from this module (default export)
  return (
    <CalendarContext.Provider
      value={{
        currentDay: new Date().getDate(),
        currentWeekday: new Date().getDay(),
        currentYear: year,
        currentMonth: month,
        currentWeek: Math.ceil(new Date().getDate() / 7),
        users,
        selectedDate,
        setSelectedDate,
        addUser,
        deleteUser,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
