import React, { useContext } from "react";
import styles from "./DailyGraphComponent.module.css";
import { CalendarContext, User } from "./CalendarContext";

export interface Worker {
  firstName: string;
  lastName: string;
  shifts: { start: number; end: number }[];
}

let workers: Worker[] = [
  // { firstName: "Alice", lastName: "Smith", startShiftNumber: 1, endShiftNumber: 6 },
  // { firstName: "Bob", lastName: "Johnson", startShiftNumber: 10, endShiftNumber: 15 },
  // { firstName: "Carol", lastName: "Williams", startShiftNumber: 3, endShiftNumber: 7 },
  // { firstName: "David", lastName: "Brown", startShiftNumber: 20, endShiftNumber: 25 },
  // { firstName: "Eva", lastName: "Davis", startShiftNumber: 5, endShiftNumber: 9 },
];



const TOTAL_SEGMENTS = 24 * 4; // 96 segments (15 min each)
const LEFT_COL_WIDTH = 260;
const HEADING_HEIGHT = 90;
const ROW_HEIGHT = 60;
const SEGMENT_WIDTH = 18;



function timeToSection(time: string, type: "start" | "end" = "start"): number {

  const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) throw new Error("Invalid time format");

  const [, hh, mm, period] = match;
  let hours = parseInt(hh, 10);
  const minutes = parseInt(mm, 10);

  // Convert to 24-hour format
  if (period.toUpperCase() === "AM") {
    if (hours === 12) hours = 0; // 12 AM → 0h
  } else {
    if (hours !== 12) hours += 12; // PM but not 12 → add 12
  }

  const totalMinutes = hours * 60 + minutes;
  const section = Math.floor(totalMinutes / 15);

  // Shift so 1:00 AM = 0
  let adjusted = section - 4;

  // Adjust for start or end segment
  if (type === "start") adjusted += 1;  // start: 1 segment right
  //else if (type === "end"); // end: 2 segments left

  return adjusted;
}





export default function DailyGraphComponent() {
  workers = []; // reset for dynamic population
  const calendarCtx = useContext(CalendarContext);
  if (!calendarCtx) return <div>No calendar context</div>;

  const { selectedDate, users } = calendarCtx;
  const usersForDate: User[] = selectedDate ? users[selectedDate] || [] : [];

  const totalWidth = (TOTAL_SEGMENTS-3) * SEGMENT_WIDTH;
  const segments = Array.from({ length: TOTAL_SEGMENTS-3 }, (_, i) => i);

 
 workers = usersForDate.map(user => ({
  firstName: user.firstName,
  lastName: user.lastName,
  shifts: user.shifts.map(shift => ({
    start: timeToSection(shift.startShift, "start"),
    end: timeToSection(shift.endShift, "end"),
  })),
}));
    


  function renderHour(hour: number, translateX: string) {
  return (
    <div
      key={hour}
      className={styles.headerLabel}
      
    >
      {formatHour(hour)}
    </div>
  );
}

  const formatHour = (hour: number) => {
    if (hour === 24) return "12 AM";
    const period = hour < 12 ? "AM" : "PM";
    const hr12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hr12} ${period}`;
  };

 const renderHeader = () => {
  return (
    <div className={styles.headerWrapper}>
      {/* Wrapper for labels to create vertical space */}
      <div className={styles.labelWrapper}>
        <div className={styles.labelRow}>
          {renderHour(1, "-30%")}
          {renderHour(2, "-30%")}
          {renderHour(3, "-35%")}
          {renderHour(4, "-35%")}
          {renderHour(5, "-40%")}
          {renderHour(6, "-40%")}
          {renderHour(7, "-45%")}
          {renderHour(8, "-45%")}
          {renderHour(9, "-50%")}
          {renderHour(10, "-50%")}
          {renderHour(11, "-60%")}
          {renderHour(12, "-80%")}
          {renderHour(13, "-110%")}
          {renderHour(14, "-110%")}
          {renderHour(15, "-115%")}
          {renderHour(16, "-115%")}
          {renderHour(17, "-120%")}
          {renderHour(18, "-120%")}
          {renderHour(19, "-110%")}
          {renderHour(20, "-110%")}
          {renderHour(21, "-110%")}
          {renderHour(22, "-85%")}
          {renderHour(23, "-110%")}
          {renderHour(24, "-120%")}
          {renderHour(25, "-120%")}

        </div>
      </div>

      {/* Hour lines */}
      <div className={styles.hourRow}>
        {Array.from({ length: TOTAL_SEGMENTS - 3 }, (_, idx) => {
          const isFirstOfHour = idx % 4 === 0;
          return (
            <div
              key={idx}
              className={`${styles.hourSegment} ${isFirstOfHour ? styles.firstOfHour : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
};

  const renderLeftColumn = () => (
    <div className={styles.leftColumn}>
      {workers.map((user, idx) => (
        <div key={idx} className={styles.userRow} style={{ height: 60 }}>
          {user.lastName}
        </div>
      ))}
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
        style={{
          left: `${shift.start * SEGMENT_WIDTH}px`,
          width: `${(shift.end - shift.start + 1) * SEGMENT_WIDTH}px`,
        }}
      />
    ))}
  </div>
);


  let LEFT_SPACER = 100
  let segmentWidth = 18;
  
  return (
    <div>
    <div
      className={styles.container}
      
    >
      <div /> {/* empty top-left cell */}
      {renderHeader()}
      <div className={styles.leftList}>
      {renderLeftColumn()}
      </div>
      <div className={styles.timelineContainer}>{workers.map(renderTimelineRow)}</div>
      
    </div>

  <div className="absolute left-0 top-8" style={{ width: totalWidth }}>
    
              {/* For accessibility show a demo event */}
              <div
                style={{
                  left: LEFT_SPACER + (8 * 4 + 1) * segmentWidth, // 08:15 -> hour 8 *4 + 1
                  width: (2 * 4 + 3) * segmentWidth, // 2h30m = 10:45 - 08:15 -> 2.5h = 10 segments
                }}
                className={styles.myBox}
                role="button"
                aria-label="Sample event from 08:15 to 10:45"
              >
                Sample event — 08:15 to 10:45
              </div>
            </div>
          </div>
          
    
  );
}
