import React, { useContext, useState } from "react";
import { CalendarContext, CalendarContextType } from "./CalendarContext";
import { loadAllUsers, loadUsersForDate } from "./LoadUsersForDate";
import { handleSave } from "./HandleSave";
import styles from "./DatabaseComponent.module.css";

export function DatabaseComponent() {
  const ctx = useContext<CalendarContextType | null>(CalendarContext);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState<number | null>(null);

  // Example files
  const [files, setFiles] = useState<string[]>([
    "file1.json",
    "file2.json",
    "file3.json",
    "file4.json",
    "file5.json",
    "file6.json",
  ]);

  // Track selected file
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);

  if (!ctx) return null;
  const { selectedDate, users, addUser } = ctx;

  return (
    <div className={styles.container}>
      {/* Grey Box */}
      <div className={styles.fileBox}>
       
        <div className={styles.fileList}>
          {files.map((f, idx) => (
            <div
              key={idx}
              className={`${styles.fileItem} ${
                selectedFileIndex === idx ? styles.selectedFile : ""
              }`}
              onClick={() => setSelectedFileIndex(idx)}
            >
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.loadButton}
          onClick={() => {
            if (!selectedDate) return;
            loadAllUsers();
            loadUsersForDate(
              selectedDate,
              users,
              addUser,
              setSelectedEmployeeIndex
            );
          }}
        >
          Load file
        </button>

        <button
          className={styles.saveButton}
          onClick={() => handleSave(users)}
        >
          Save file
        </button>

        <button
          onClick={() => {
            if (selectedFileIndex !== null) {
              const updatedFiles = [...files];
              updatedFiles.splice(selectedFileIndex, 1);
              setFiles(updatedFiles);
              setSelectedFileIndex(null);
            }
          }}
        >
          Delete file
        </button>
      </div>

      {/* Input box */}
      <input
        className={styles.inputBox}
        type="text"
        placeholder="Enter filename..."
      />
    </div>
  );
}
