import { createContext} from "react";

// Define the context type
interface BooleanContextType {
  boolValue: boolean;
  setBoolValue: (v: boolean) => void;
  toggle: () => void;
}

// Create context
export const BooleanContext = createContext<BooleanContextType | null>(null);

