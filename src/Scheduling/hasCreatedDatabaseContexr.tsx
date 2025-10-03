import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the context type
interface BooleanContextType {
  value: boolean;
  setValue: (v: boolean) => void;
  toggle: () => void;
}

// Create context
const BooleanContext = createContext<BooleanContextType | null>(null);

// Provider
export function BooleanProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<boolean>(false);

  const toggle = () => setValue((prev) => !prev);

  return (
    <BooleanContext.Provider value={{ value, setValue, toggle }}>
      {children}
    </BooleanContext.Provider>
  );
}

// // Hook for consumers
// export function useBooleanContext() {
//   const ctx = useContext(BooleanContext);
//   if (!ctx) {
//     throw new Error("useBooleanContext must be used inside a BooleanProvider");
//   }
//   return ctx;
// }
