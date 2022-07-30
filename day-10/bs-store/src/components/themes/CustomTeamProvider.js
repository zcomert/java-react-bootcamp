import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/system";
import { theme1, theme2, theme3, theme4 } from "./index";
import { useSelector } from "react-redux";


export default function CustomThemeProvider({ children }) {
  
  const { theme } = useSelector((state) => state.setting);
  const [currentTheme, setCurrentTheme] = useState(theme1);
  
  useEffect(() => {
    switch (theme) {
        case "theme1":
          setCurrentTheme(theme1);
          localStorage.setItem("theme",theme);
          break;
        case "theme2":
          setCurrentTheme(theme2);
          localStorage.setItem("theme",theme);
          break;
        case "theme3":
          setCurrentTheme(theme3);
          localStorage.setItem("theme",theme);
          break;
          case "theme4":
            setCurrentTheme(theme4);
            localStorage.setItem("theme",theme);
            break;
        default:
            setCurrentTheme(theme1);
            localStorage.setItem("theme","theme1");
          break;
      }
  },[theme])
  
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}
