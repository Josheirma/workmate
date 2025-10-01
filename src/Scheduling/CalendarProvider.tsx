import React, { useState, useEffect } from "react";
import { CalendarContext, User } from "./CalendarContext";

export default function CalendarProvider({ children }: { children: React.ReactNode }) {
  const today = new Date();
  const [currentDay] = useState(today.getDate());
  const [currentMonth] = useState(today.getMonth());
  const [currentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  //const [selectedDate, setSelectedDate] = useState("2025-09-29");
  
  const [users, setUsers] = useState<Record<string, User[]>>({});
  

useEffect(() => {
  if (selectedDate) {
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
    addUser(selectedDate, { firstName: "Alice", lastName: "Smith", shifts: [] });
    addUser(selectedDate, { firstName: "Bob", lastName: "Johnson", shifts: [] });
  }
}, [selectedDate]);
  

  const addUser = (date: string, user: User) => {
    setUsers((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), user],
    }));
  };

  const updateUser = (date: string, index: number, user: User) => {
    setUsers((prev) => ({
      ...prev,
      [date]: prev[date].map((u, i) => (i === index ? user : u)),
    }));
  };

  const deleteUser = (date: string, index: number) => {
    setUsers((prev) => ({
      ...prev,
      [date]: prev[date].filter((_, i) => i !== index),
    }));
  };

  const reorderUsers = (date: string, fromIndex: number, toIndex: number) => {
    setUsers((prev) => {
      const list = [...(prev[date] || [])];
      console.log("Before reorder:", list);
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      console.log("After reorder:", list);
      return { ...prev, [date]: list };
    });
  };

  const sortUsersByLastName = (date: string) => {
  setUsers(prev => {
    const list = [...(prev[date] || [])];
    list.sort((a, b) => a.lastName.localeCompare(b.lastName));
    return { ...prev, [date]: list };
  });
};


  return (
    <CalendarContext.Provider
      value={{
        currentDay,
        currentMonth,
        currentYear,
        selectedDate,
        setSelectedDate,
        users,
        addUser,
        updateUser,
        deleteUser,
        reorderUsers,
        sortUsersByLastName,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
