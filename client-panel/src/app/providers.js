"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useMemo, createContext, useContext } from "react";
import getTheme from "./theme/theme";

const ThemeContext = createContext();

export function Providers({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () => getTheme(darkMode ? "dark" : "light"),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
