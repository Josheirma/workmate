import React, { useContext } from "react";
import styles from "./DailyGraphComponent.module.css";
import { CalendarContext, User } from "./CalendarContext";
import { Link } from "react-router-dom";




export interface Worker {
  firstName: string;
  lastName: string;
  shifts: { start: number; end: number }[];
}

let workers: Worker[] = [];

const TOTAL_SEGMENTS = 25 * 4; // 25 hours, 15-min segments
const SEGMENT_WIDTH = 18;

function timeToSection(time: string, type: "start" | "end" = "start"): number {
  const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) throw new Error("Invalid time format");

  const [, hh, mm, period] = match;
  let hours = parseInt(hh, 10);
  const minutes = parseInt(mm, 10);

  if (period.toUpperCase() === "AM") {
    if (hours === 12) hours = 0;
  } else {
    if (hours !== 12) hours += 12;
  }

  let section = Math.floor((hours * 60 + minutes) / 15);
  section = (section - 4 + 96) % 96;

  if (type === "start") section += 1;
  if (type === "end" && hours === 1 && minutes === 0 && period.toUpperCase() === "AM") {
    section = 96;
  }

  return section;
}

export default function DailyGraphComponent() {
  workers = [];
  const calendarCtx = useContext(CalendarContext);
  
  if (!calendarCtx) return <div>No calendar context</div>;
  

  const { selectedDate, users } = calendarCtx;
  
  const usersForDate: User[] = selectedDate ? users[selectedDate] || [] : [];

  const totalWidth = (TOTAL_SEGMENTS - 3) * SEGMENT_WIDTH;
  const segments = Array.from({ length: TOTAL_SEGMENTS - 3 }, (_, i) => i);

  workers = usersForDate.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    shifts: user.shifts.map((shift) => ({
      start: timeToSection(shift.startShift, "start"),
      end: timeToSection(shift.endShift, "end"),
    })),
  }));

  // Count total occurrences of each last name
  const lastNameTotalCount: Record<string, number> = {};
  workers.forEach((user) => {
    lastNameTotalCount[user.lastName] = (lastNameTotalCount[user.lastName] || 0) + 1;
  });

  // Track running count for numbering repeated last names
  const lastNameRunningCount: Record<string, number> = {};

  const formatHour = (hour: number) => {
    if (hour === 24) return "12 AM";
    if (hour === 25) return "1 AM";
    const period = hour < 12 ? "AM" : "PM";
    const hr12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hr12} ${period}`;
  };
  
  const renderHeader = () => (
    <div className={styles.headerWrapper} style={{ position: "relative" }}>
      <div className={styles.labelWrapper}>
        <div className={styles.labelRow} style={{ position: "relative" }}>
          {Array.from({ length: 25 }, (_, hour) => {
            const leftPos = hour * 4 * SEGMENT_WIDTH + 17;
            return (
              <div
                key={hour}
                className={styles.headerLabel}
                style={{ position: "absolute", left: `${leftPos}px`, transform: "translateX(-50%)", whiteSpace: "nowrap" }}
              >
                {formatHour(hour + 1)}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.hourRow}>
        {Array.from({ length: TOTAL_SEGMENTS - 3 }, (_, idx) => {
          const isFirstOfHour = idx % 4 === 0;
          return <div key={idx} className={`${styles.hourSegment} ${isFirstOfHour ? styles.firstOfHour : ""}`} />;
        })}
      </div>
    </div>
  );

  const renderLeftColumn = () => (
    <div className={styles.leftColumn}>
      {workers.map((user, idx) => {
        let displayName = user.lastName;
        if (lastNameTotalCount[user.lastName] > 1) {
          const count = (lastNameRunningCount[user.lastName] || 0) + 1;
          lastNameRunningCount[user.lastName] = count;
          displayName = `(${count}) ${user.lastName}`;
        }
        return (
          <div key={idx} className={styles.userRow} style={{ height: 60 }}>
            {displayName}
          </div>
        );
      })}
    </div>
  );

  const renderTimelineRow = (user: Worker, idx: number) => (
    <div key={idx} className={styles.timelineRow} style={{ width: totalWidth, position: "relative" }}>
      {segments.map((s) => {
        const isHour = s % 4 === 0;
        const cellClasses = [styles.timelineCell, isHour ? styles.timelineCellHour : ""].join(" ");
        return <div key={s} className={cellClasses} style={{ width: SEGMENT_WIDTH }} />;
      })}

      {user.shifts.map((shift, i) => (
        <div
          key={i}
          className={styles.eventBar}
          style={{ left: `${shift.start * SEGMENT_WIDTH}px`, width: `${(shift.end - shift.start + 1) * SEGMENT_WIDTH}px` }}
        />
      ))}
    </div>
  );

 
  return (
    <>
      <div className={styles.dailyWrapper}>
        <div className={styles.dateHeading}>{selectedDate}</div>
        <div className={styles.backLinkWrapper}>
          <Link to="/" className={styles.backLink}>
            Back to Calendar
          </Link>
        </div>
      </div>

      <div className={styles.container}>
        <div /> {/* empty top-left cell */}
        {renderHeader()}
        <div className={styles.leftList}>{renderLeftColumn()}</div>
        <div className={styles.timelineContainer}>{workers.map(renderTimelineRow)}</div>
      </div>
    </>
  );
}
