import React from "react";
import styles from "./TimeInput.module.css";

interface TimeInputProps {
  value: string; // fully controlled
  label?: string;
  onChange: (value: string) => void;
}

export function TimeInput({ value, label, onChange }: TimeInputProps) {

 


  function isEndAfterStart(start: string, end: string): boolean {
  // Convert hh:mm AM/PM string to minutes since midnight
  const toMinutes = (time: string): number | null => {
    const match = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
    if (!match) return null;

    const [, hh, mm, meridian] = match;
    let hour = parseInt(hh, 10);
    const minute = parseInt(mm, 10);

    if (meridian.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (meridian.toUpperCase() === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  };

  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  if (startMinutes === null || endMinutes === null) {
    throw new Error("Invalid time format. Use hh:mm AM/PM");
  }

  return endMinutes > startMinutes //&& endMinutes <= 1440;
}

console.log("test")
 // Example usage:
//console.log(isEndAfterStart("10:30 AM", "11:15 AM")); // true
console.log(isEndAfterStart("12:00 AM", "11:59 AM")); // false
//console.log(isEndAfterStart("12:00 PM", "12:01 AM")); // true
//console.log(isEndAfterStart("12:00 AM", "12:00 PM")); // true


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^0-9APM]/g, "");
    let newValue = "";
    let cursorPos = 0;

    for (let i = 0; i < raw.length && newValue.length < 8; i++) {
      const char = raw[i];
      if (!char) continue;

      switch (newValue.length) {
        case 0: // first hour digit
          if (/[0-1]/.test(char)) { newValue += char; cursorPos++; }
          break;

        case 1: { // second hour digit
          if (!/[0-9]/.test(char)) break;
          const hour = parseInt(newValue[0] + char, 10);
          if (hour >= 1 && hour <= 12) {
            newValue += char;
            cursorPos++;
            newValue += ":"; // auto colon
            cursorPos++;
          }
          break;
        }

        case 3: // first minute digit
          if (/[0-5]/.test(char)) { newValue += char; cursorPos++; }
          break;

        case 4: // second minute digit
          if (/[05]/.test(char)) {
            newValue += char;
            cursorPos++;
            newValue += " "; // auto space before AM/PM
            cursorPos++;
          }
          break;

        case 6: // A or P
          if (char === "A" || char === "P") {
            newValue += char;
            cursorPos++;
            newValue += "M"; // auto M
            cursorPos++;
          }
          break;
      }
    }

    onChange(newValue);

    // Restore cursor
    requestAnimationFrame(() => {
      const pos = Math.min(cursorPos, newValue.length);
      e.target.setSelectionRange(pos, pos);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const input = e.currentTarget;
  const pos = input.selectionStart ?? 0;

  if (e.key === "Backspace") {
    e.preventDefault();
    if (pos > 0) {
      // Remove character before cursor but preserve colon/space/AMPM
      const before = value.slice(0, pos - 1);
      const after = value.slice(pos);
      onChange(before + after);
      requestAnimationFrame(() => input.setSelectionRange(pos - 1, pos - 1));
    }
  } else if (e.key === "Delete") {
    e.preventDefault();
    if (pos < value.length) {
      // Remove character at cursor
      const before = value.slice(0, pos);
      const after = value.slice(pos + 1);
      onChange(before + after);
      requestAnimationFrame(() => input.setSelectionRange(pos, pos));
    }
  }
};

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="hh:mm AM/PM"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={8}
        className={styles.input}
      />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
