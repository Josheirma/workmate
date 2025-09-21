// only types / createContext / defaults — NO React components exported from this file
import { createContext } from "react";

export interface User {
  firstName: string;
  lastName: string;
  startShift: string;
  endShift: string;
}

export interface CalendarContextType {
  currentDay: number;
  currentWeekday: number;
  currentYear: number;
  currentMonth: number;
  currentWeek: number;
  users: Record<string, User[]>;   // keyed by date e.g. "2025-09-20"
  selectedDate: string | null;     // date key like "YYYY-MM-DD"
  setSelectedDate: (date: string | null) => void;
  addUser: (date: string, user: User) => void;
  deleteUser: (date: string, index: number) => void;
}

// stable default object (no-op functions) — used only as createContext default
const today = new Date();
export const defaultCalendarContext: CalendarContextType = {
  currentDay: today.getDate(),
  currentWeekday: today.getDay(),
  currentYear: today.getFullYear(),
  currentMonth: today.getMonth(),
  currentWeek: Math.ceil(today.getDate() / 7),
  users: {},
  selectedDate: null,
  setSelectedDate: () => {},
  addUser: () => {},
  deleteUser: () => {},
};

// export the context (no components here)
export const CalendarContext = createContext<CalendarContextType>(defaultCalendarContext);
