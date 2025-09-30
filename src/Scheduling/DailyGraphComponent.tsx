import React, { useContext } from "react";
import styles from "./DailyGraphComponent.module.css";
import { CalendarContext, User } from "./CalendarContext";

export interface Worker {
  firstName: string;
  lastName: string;
  startShiftNumber: number;
  endShiftNumber: number;
}

const workers: Worker[] = [
  { firstName: "Alice", lastName: "Smith", startShiftNumber: 1, endShiftNumber: 5 },
  { firstName: "Bob", lastName: "Johnson", startShiftNumber: 10, endShiftNumber: 15 },
  { firstName: "Carol", lastName: "Williams", startShiftNumber: 3, endShiftNumber: 7 },
  { firstName: "David", lastName: "Brown", startShiftNumber: 20, endShiftNumber: 25 },
  { firstName: "Eva", lastName: "Davis", startShiftNumber: 5, endShiftNumber: 9 },
];

const TOTAL_SEGMENTS = 24 * 4; // 96 segments (15 min each)
const LEFT_COL_WIDTH = 260;
const HEADING_HEIGHT = 40;
const ROW_HEIGHT = 30;
const SEGMENT_WIDTH = 18;

export default function DailyGraphComponent() {
  const calendarCtx = useContext(CalendarContext);
  if (!calendarCtx) return <div>No calendar context</div>;

  const { selectedDate, users } = calendarCtx;
  const usersForDate: User[] = selectedDate ? users[selectedDate] || [] : [];

  const totalWidth = TOTAL_SEGMENTS * SEGMENT_WIDTH;
  const segments = Array.from({ length: TOTAL_SEGMENTS }, (_, i) => i);

  const formatHour = (hour: number) => {
    const period = hour < 12 ? "AM" : "PM";
    const hr12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hr12} ${period}`;
  };

  const renderHeader = () => (
    <div className={styles.headerRow} style={{ width: totalWidth }}>
      {segments.map((s) => {
        const isHour = s % 4 === 0;
        return (
          <div
            key={s}
            className={`${styles.headerCell} ${isHour ? styles.headerCellHour : ""}`}
            style={{ width: SEGMENT_WIDTH }}
          >
            {isHour && <span className={styles.headerLabel}>{formatHour(s / 4)}</span>}
          </div>
        );
      })}
    </div>
  );

  const renderLeftColumn = () => (
    <div className={styles.leftColumn}>
      {usersForDate.map((user, idx) => (
        <div key={idx} className={styles.userRow} style={{ height: ROW_HEIGHT }}>
          {user.lastName}
        </div>
      ))}
    </div>
  );

  const renderTimelineRow = (user: User, idx: number) => (
    <div key={idx} className={styles.timelineRow} style={{ width: totalWidth }}>
      {segments.map((s) => {
        const isHour = s % 4 === 0;
        const isEventCell = workers.some(
          (w) => w.lastName === user.lastName && s >= w.startShiftNumber && s <= w.endShiftNumber
        );
        const cellClasses = [
          styles.timelineCell,
          isHour ? styles.timelineCellHour : "",
          isEventCell ? styles.timelineCellEvent : "",
        ].join(" ");
        return <div key={s} className={cellClasses} style={{ width: SEGMENT_WIDTH }} />;
      })}
    </div>
  );

  return (
    <div
      className={styles.container}
      style={{
        "--left-col-width": `${LEFT_COL_WIDTH}px`,
        "--total-width": `${totalWidth}px`,
        "--row-height": `${ROW_HEIGHT}px`,
        "--heading-height": `${HEADING_HEIGHT}px`,
      } as React.CSSProperties}
    >
      <div /> {/* empty top-left cell */}
      {renderHeader()}
      {renderLeftColumn()}
      <div className={styles.timelineContainer}>{usersForDate.map(renderTimelineRow)}</div>
    </div>
  );
}
