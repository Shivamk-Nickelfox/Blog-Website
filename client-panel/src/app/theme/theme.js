import { createTheme } from "@mui/material/styles";

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    background: {
      default: mode === 'dark' ? "#121212" : "#ffffff",
      paper: mode === 'dark' ? "#1e1e1e" : "#ffffff",
    },
    text: {
      primary: mode === 'dark' ? "#ffffff" : "#001858",
    },
    primary: {
      main: "#8bd3dd",
    },
  },
  typography: {
    fontFamily: `'Geist', 'Roboto', sans-serif`,
  },
});

export default getTheme;
