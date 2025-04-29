import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#001858",
    },
    primary: {
      main: "#8bd3dd",
    },
  },
  typography: {
    fontFamily: `'Geist', 'Roboto', sans-serif`,
  },
});

export default theme;
