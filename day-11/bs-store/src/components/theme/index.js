import { createTheme, ThemeProvider } from "@mui/material";
import { blue, brown, green, red, yellow } from "@mui/material/colors";

const theme1 = createTheme({
  palette: {
    primary: red,
    secondary: yellow,
  },
});

const theme2 = createTheme({
  palette: {
    primary: blue,
    secondary: yellow,
  },
});

const theme3 = createTheme({
  palette: {
    primary: green,
    secondary: brown,
  },
});


export {theme1, theme2, theme3} 