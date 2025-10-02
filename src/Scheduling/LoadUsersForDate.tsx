import { User } from "./CalendarContext";
import { db } from "./database";


// ✅ Correct way
export async function loadUsersForDate(
  selectedDate: string,
  users: Record<string, User[]>,
  addUser: (date: string, user: User) => void,
  setSelectedEmployeeIndex: (index: number | null) => void
): Promise<void> {
  if (!selectedDate) return;

  try {
    const allUsers: User[] = await db.users.toArray();

    // Clear current list
    if (users[selectedDate]) {
      users[selectedDate].length = 0;
    }

    // Add each user
    allUsers.forEach((user: User) => {
      addUser(selectedDate, user);
    });

    // Reset selection
    setSelectedEmployeeIndex(null);
  } catch (error) {
    console.error("Error loading users:", error);
  }
}


export async function loadAllUsers(): Promise<User[]> {
  try {
    const users: User[] = await db.users.toArray();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}