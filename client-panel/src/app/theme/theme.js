
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#fef6e4", 
      paper: "#f3d2c1", 
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
