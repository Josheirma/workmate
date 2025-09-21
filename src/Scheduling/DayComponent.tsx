import React from "react";
import styles from "./DayComponent.module.css";

interface Props {
  day: number | null;
  date: Date | null;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export default function DayComponent({ day, isToday, isSelected, onClick }: Props) {
  if (!day) return <div className={styles.empty}></div>;

  return (
    <div
      className={`${styles.day} ${isToday ? styles.today : ""} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {day}
    </div>
  );
}
