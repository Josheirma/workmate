import Dexie, { Table } from "dexie";
import { CalendarContext, User, Shift } from "./CalendarContext";

// export interface Shift {
//   startShift: string;
//   endShift: string;
// }

// export interface User {
//   id: string;              // add an id for primary key
//   firstName: string;
//   lastName: string;
//   shifts: Shift[];
// }

class MyDB extends Dexie {
  users!: Table<User, string>; // Table<User, primaryKeyType = string>

  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      users: "++id", // index by id
    });
  }
}

export const db = new MyDB();

// Example: Save a nested object
async function saveUser() {
  const user: User = {
    
    firstName: "Alice",
    lastName: "Smith",
    shifts: [
      { startShift: "09:00 AM", endShift: "05:00 PM" },
      { startShift: "06:00 PM", endShift: "10:00 PM" },
    ],
  };

  await db.users.put(user); // add or update
}

// Example: Read back
async function loadUsers() {
  const users = await db.users.toArray();
  users.forEach(u => {
    console.log(u.firstName, "has", u.shifts.length, "shifts");
  });
}
