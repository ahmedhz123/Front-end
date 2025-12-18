import { createContext } from "react";
interface DialogContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);
