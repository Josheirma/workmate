// HandleSave.ts
import { User } from "./CalendarContext";
import { db } from "./database";

export async function handleSave(users: Record<string, User[]>) {
  try {
    for (const userArray of Object.values(users || {})) {
      for (const u of userArray) {
        const id = await db.users.add(u);
        console.log("Saved user with ID:", id);
      }
    }
  } catch (err) {
    console.error("Error saving user:", err);
  }
}
