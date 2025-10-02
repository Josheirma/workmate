import React, { useContext, useState, useRef } from "react";
import { CalendarContext, User, Shift } from "./CalendarContext";
import {TimeInput} from "./TimeInput";
import styles from "./EmployeeListComponent.module.css";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";






export default function EmployeeListComponent() {
  const ctx = useContext(CalendarContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState<number | null>(null);

  const measureRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!ctx) return null;

  const { selectedDate, users, addUser, updateUser, deleteUser, reorderUsers } = ctx;
  

  const employeeList = selectedDate ? users[selectedDate] ?? [] : [];

  
  const fitsInRow = (first: string, last: string) => {
    if (!measureRef.current || !containerRef.current) return true;
    measureRef.current.textContent = `${last}, ${first}`;
    const nameWidth = measureRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;
    const deleteBtnWidth = 28;
    return nameWidth  < (containerWidth - deleteBtnWidth - 130);
  };

  const handleFirstNameChange = (val: string) => {
    if (val.length < firstName.length || fitsInRow(val, lastName)) setFirstName(val);
  };

  const handleLastNameChange = (val: string) => {
    if (val.length < lastName.length || fitsInRow(firstName, val)) setLastName(val);
  };

  const handleAddEmployee = () => {
    if (!selectedDate || !firstName.trim() || !lastName.trim()) return;
    const newUser: User = { firstName: firstName.trim(), lastName: lastName.trim(), shifts: [] };
    addUser(selectedDate, newUser);
    setFirstName("");
    setLastName("");
    setSelectedEmployeeIndex(employeeList.length);
  };

  const handleSetShift = () => {
    if (selectedEmployeeIndex === null || !selectedDate || !timeStart || !timeEnd) return;
    const currentList = users[selectedDate] || [];
    const user = { ...currentList[selectedEmployeeIndex] };
    user.shifts = [...(user.shifts || []), { startShift: timeStart, endShift: timeEnd }];
    updateUser(selectedDate, selectedEmployeeIndex, user);
    setTimeStart("");
    setTimeEnd("");
  };

  const handleDelete = (index: number) => {
    if (!selectedDate) return;
    deleteUser(selectedDate, index);
    if (selectedEmployeeIndex === index) setSelectedEmployeeIndex(null);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !selectedDate) return;
    const { source, destination } = result;
    reorderUsers(selectedDate, source.index, destination.index);
  };

  // Alphabetize employees by last name
  const handleAlphabetize = () => {
  if (!selectedDate || !ctx?.sortUsersByLastName) return;
  ctx.sortUsersByLastName(selectedDate);
  setSelectedEmployeeIndex(null);
};





  if (!selectedDate)
    return <div className={styles.container}>Select a day to view/add employees.</div>;

  return (
    <div className={styles.container} ref={containerRef}>
      <h3 className={styles.title}>Employees for {selectedDate}</h3>
      <span ref={measureRef} className={styles.measure}></span>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="employeeList">
          {(provided) => (
            <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
              {employeeList.length === 0 ? (
                <div className={styles.itemEmpty}>No employees</div>
              ) : (
                employeeList.map((u, i) => {
                  const isSelected = selectedEmployeeIndex === i;
                  return (
                    <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${styles.item} ${isSelected ? styles.selected : ""}`}
                          onClick={() => setSelectedEmployeeIndex(i)}
                        >
                          <div className={styles.entry}>
                            <button
                              className={styles.deleteTop}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(i);
                              }}
                            >
                              ×
                            </button>
                            <div className={styles.names}>
                              <div className={styles.fullName}>
                                {u.lastName}, {u.firstName}
                              </div>
                              {u.shifts.map((s: Shift, si: number) => (
                                <div key={si + "-" + s.startShift + s.endShift}>
                                  {s.startShift} - {s.endShift}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleFirstNameChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleLastNameChange(e.target.value)}
        />

        <div className={styles.inputsContainer}>
          <TimeInput label="Start shift" value={timeStart} onChange={setTimeStart} />
          <TimeInput label="End shift" value={timeEnd} onChange={setTimeEnd} />
        </div>

        <button className={`${styles.add} ${styles.green}`} onClick={handleSetShift}>
          Set Shift
        </button>
        <button className={styles.add} onClick={handleAddEmployee}>
          Add Employee
        </button>

        <button className={styles.add} onClick={handleAlphabetize}>
          Alphabetize
        </button>
      </div>
      
    </div>
  );

  




}
