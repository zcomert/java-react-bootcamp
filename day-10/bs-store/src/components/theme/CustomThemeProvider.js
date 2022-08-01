import { ThemeProvider } from "@mui/material";
import { theme1, theme2, theme3 } from "./index";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setTheme} from "../../store/actions/settingActions";

function CustomThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.setting);
  const settingDispatch = useDispatch();
  const [currentTheme, setCurrentTheme] = useState(theme1);

  useEffect(() => {
    switch (theme) {
      case "theme1":
        setCurrentTheme(theme1);
        localStorage.setItem("theme", theme);
        break;
      case "theme2":
        setCurrentTheme(theme2);
        localStorage.setItem("theme", theme);
        break;
      case "theme3":
        setCurrentTheme(theme3);
        localStorage.setItem("theme", theme);
        break;
      default:
        setCurrentTheme(theme2);
        localStorage.setItem("theme", theme);
        break;
    }
  }, [theme]);
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
