import { createTheme } from "@mui/material";
import { blue, pink, red, yellow } from "@mui/material/colors";

const theme1 = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#42a5f5",
      dark: "#002884",
      contrastText: "#fff",
      tonalOffset: 0.2,
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
      tonalOffset: 0.2,
    },
    warning:{
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
      tonalOffset: 0.2,
    },
    typography: {
      fontSize:30,
      fontFamily:['-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',].join(','),
      body1: {
        fontWeight: 500,
        fontStyle: "italic",
        color: pink,
      },
      button: {
        fontStyle: 'italic',
      },
    },
  },
});

theme1.spacing(5);

const theme2 = createTheme({
  palette: {
    primary: {
      main: "#e65100",
    },
    secondary: {
      main: "#388e3c",
    },
  },
});

const theme3 = createTheme({
  palette: {
    primary: {
      main: "#33691e",
    },
    secondary: {
      main: "#e64a19",
    },
  },
});

const theme4 = createTheme({
  palette: {
    primary: red,
    secondary: yellow,
  }
});

export { theme1, theme2, theme3, theme4 };
