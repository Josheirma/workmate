import React, { useContext, useState } from "react";
import { CalendarContext } from "./CalendarContext";
import HeadingComponent from "./HeadingComponent";
import DayComponent from "./DayComponent";
import styles from "./MonthComponent.module.css";
import { Link } from 'react-router-dom';

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MonthComponent() {
  const ctx = useContext(CalendarContext);
  if (!ctx) return null;

  const { currentDay, currentMonth, currentYear, selectedDate, setSelectedDate, users } = ctx;

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  const startDay = (firstDay.getDay() + 6) % 7; // Monday = 0, Sunday = 6

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const days: (number | null)[] = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // ✅ Check if any employee has at least one shift
  const hasAnyShift = Object.values(users || {}).some((userList: any) =>
    userList.some((u: any) => u.shifts && u.shifts.length > 0)
  );

  return (
    <div className={styles.calendar}>
      <HeadingComponent month={month} year={year} onPrev={prevMonth} onNext={nextMonth} />

      <div className={styles.weekdays}>
        {weekdays.map((d) => (
          <div key={d} className={styles.weekday}>{d}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((day, i) => {
          const date = day ? new Date(year, month, day) : null;
          const isToday = !!(
            day &&
            day === currentDay &&
            month === currentMonth &&
            year === currentYear
          );
          const isSelected = !!(
            selectedDate &&
            day &&
            new Date(selectedDate).getDate() === day &&
            new Date(selectedDate).getMonth() === month &&
            new Date(selectedDate).getFullYear() === year
          );

          return (
            <DayComponent
              key={i}
              day={day}
              date={date}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => date && setSelectedDate(date.toISOString().split("T")[0])}
            />
          );
        })}
      </div>

      <div className={styles.linkWrapper}>
      {hasAnyShift ? (
        <Link to="/daily-graph" className={styles.link}>
          View Daily Graph
        </Link>
      ) : (
        <span className={styles.linkDisabled}>View Daily Graph</span>
      )}
    </div>
    </div>
  );
}
