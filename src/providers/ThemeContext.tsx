import { useMemo, useState, useEffect, type ReactNode } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { ColorModeContext } from "./MyContext";
interface ColorModeProviderProps {
  children: ReactNode;
}
export function ColorModeProvider({ children }: ColorModeProviderProps) {
  let theme = useTheme();
  type Mode = "light" | "dark";
  const [mode, setMode] = useState<Mode>(theme.palette.mode);

  // 🧠 Load saved mode from localStorage
  useEffect(() => {
    const savedMode = (localStorage.getItem("mode") as Mode) || null;

    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    } else {
      setMode("light"); // fallback
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  // 🎨 Custom theme for both modes
  theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#2a3445" },
                secondary: { main: "#f50057" },
                background: {
                  default: "#f5f7fa",
                  paper: "#ffffff",
                  bg: "#f4f4f4",
                },
                text: {
                  primary: "#141313ff",
                  secondary: "#555555",
                },
              }
            : {
                primary: { main: "#bcbcbeff" },
                secondary: { main: "#f48fb1" },
                background: {
                  default: "#050505ff",
                  paper: "#2a3445",
                  bg: "#1e2021",
                },
                text: {
                  primary: "#e6edf3",
                  secondary: "#9ba3af",
                },
              }),
        },
        typography: {
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
