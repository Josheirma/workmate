import React, { useContext, useState } from "react";
import { CalendarContext } from "./CalendarContext";
import { loadAllUsers, loadUsersForDate } from "./LoadUsersForDate";
import  {handleSave}  from "./HandleSave";
import styles from "./DatabaseComponent.module.css";

export function DatabaseComponent() {
    
  const ctx = useContext(CalendarContext);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState<number | null>(null);

  if (!ctx) return null;
  const { selectedDate, users, addUser } = ctx;

  return (
    <div className = {styles.buttonContainer}>
      <button className = {styles.loadButton}
        onClick={  () => {
          if (!selectedDate) return;
          loadAllUsers()
          loadUsersForDate(selectedDate, users, addUser, setSelectedEmployeeIndex);
        }}
      >
        Load file
      </button>

      <button className = {styles.saveButton } onClick={() => handleSave(users)}>Save file</button>
      <button onClick={() => handleSave(users)}>Delete file</button>
    </div>
  );
}
