// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#9575cd',
      main:  '#673ab7',
      dark:  '#4527a0',
      contrastText: '#fff'
    },
    secondary: {
      light: '#80cbc4',
      main:  '#009688',
      dark:  '#00695c',
      contrastText: '#fff'
    },
    error: {
      main: '#d32f2f',
      contrastText: '#fff'
    },
    warning: {
      main: '#ffa000',
      contrastText: '#000'
    },
    info: {
      main: '#0288d1',
      contrastText: '#fff'
    },
    success: {
      main: '#2e7d32',
      contrastText: '#fff'
    },
    background: {
      default: '#f4f6f8',
      paper:   '#ffffff'
    },
    text: {
      primary:   '#212121',
      secondary: '#555555'
    },
    divider: '#e0e0e0'
  },

  typography: {
    fontFamily: [
      '"Poppins"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2.0rem', fontWeight: 700 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1.0rem', fontWeight: 500 },
    subtitle1: { fontSize: '0.95rem', fontWeight: 500 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 600 }
  },

  spacing: 8,          // so theme.spacing(2) === 16px
  shape: { borderRadius: 8 },

  components: {
    // inject global body background
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f4f6f8',
          margin: 0
        }
      }
    },
    // remove default AppBar shadow, add nice divider
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid #e0e0e0`
        }
      }
    },
    // globally round all Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6
        }
      }
    }
  }
});

export default theme;