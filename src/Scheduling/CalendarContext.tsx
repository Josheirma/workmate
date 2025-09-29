import { createContext } from "react";

export interface Shift {
  startShift: string;
  endShift: string;
}

export interface User {
  firstName: string;
  lastName: string;
  shifts: Shift[];
}

export interface CalendarContextType {
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  users: Record<string, User[]>;
  addUser: (date: string, user: User) => void;
  updateUser: (date: string, index: number, user: User) => void;
  deleteUser: (date: string, index: number) => void;
  reorderUsers: (date: string, fromIndex: number, toIndex: number) => void;
  sortUsersByLastName?: (date: string) => void;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);
