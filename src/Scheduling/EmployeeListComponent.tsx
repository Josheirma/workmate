import React, { useContext, useState } from "react";
import { CalendarContext, User } from "./CalendarContext";
import styles from "./EmployeeListComponent.module.css";

export default function EmployeeListComponent() {
  // ✅ always call hooks first
  const ctx = useContext(CalendarContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startShift, setStartShift] = useState("");
  const [endShift, setEndShift] = useState("");

  // conditional return after hooks
  if (!ctx) return null;

  const handleAdd = () => {
    if (!ctx.selectedDate) return;
    if (!firstName.trim() || !lastName.trim()) return;

    const newUser: User = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      startShift,
      endShift,
    };

    ctx.addUser(ctx.selectedDate, newUser);

    // reset form
    setFirstName("");
    setLastName("");
    setStartShift("");
    setEndShift("");
  };

  const handleDelete = (index: number) => {
    if (!ctx.selectedDate) return;
    ctx.deleteUser(ctx.selectedDate, index);
  };

  const employeeList = ctx.selectedDate ? ctx.users[ctx.selectedDate] || [] : [];

  if (!ctx.selectedDate) {
    return <div className={styles.container}>Select a day to view/add employees.</div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Employees for {ctx.selectedDate}</h3>

      <div className={styles.list}>
        {employeeList.length === 0 ? (
          <div className={styles.itemEmpty}>No employees</div>
        ) : (
          employeeList.map((u, i) => (
            <div key={i} className={styles.item}>
              <div>
                {u.firstName} {u.lastName} ({u.startShift} - {u.endShift})
              </div>
              <button className={styles.delete} onClick={() => handleDelete(i)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="time"
          value={startShift}
          onChange={(e) => setStartShift(e.target.value)}
        />
        <input
          type="time"
          value={endShift}
          onChange={(e) => setEndShift(e.target.value)}
        />
        <button className={styles.add} onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}
