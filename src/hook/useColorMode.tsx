import { useContext } from "react";
import { ColorModeContext } from "../providers/MyContext";

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used inside ColorModeProvider");
  }

  return context;
}
