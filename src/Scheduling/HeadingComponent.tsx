import React from "react";
import styles from "../../src/Scheduling/HeadingComponent.module.css";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

interface Props {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function HeadingComponent({ month, year, onPrev, onNext }: Props) {
  return (
    <div className={styles.heading}>
      <img src="/src/assets/prev.png" alt="Previous" onClick={onPrev} className={styles.navBtn} />
      <h2>{monthNames[month]} {year}</h2>
      <img src="/src/assets/next.png" alt="Next" onClick={onNext} className={styles.navBtn} />
    </div>
  );
}
