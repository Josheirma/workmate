import React, { useState, ReactNode } from "react";
import { BooleanContext } from "./HasCreatedDatabaseContext";

export function BooleanProvider({ children }: { children: ReactNode }) {
  const [boolValue, setBoolValue] = useState<boolean>(false);

  const toggle = () => setBoolValue((prev) => !prev);

  return (
    <BooleanContext.Provider value={{ boolValue, setBoolValue, toggle }}>
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
