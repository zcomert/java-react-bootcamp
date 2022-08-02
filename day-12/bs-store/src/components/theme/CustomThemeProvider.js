import { ThemeProvider } from '@mui/material'
import {theme1, theme2, theme3} from "./index";
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function CustomThemeProvider({children}) {

    const {theme} = useSelector(state => state.setting);
    const [currentTheme, setCurrentTheme] = useState(theme1);

    useEffect(() => {
        switch (theme) {
            case 'theme1':
                setCurrentTheme(theme1);
                break;
            case 'theme2':
                setCurrentTheme(theme2);
                break;
            case 'theme3':
                setCurrentTheme(theme3);
                break;
            default:
                setCurrentTheme(theme2)
                break;
        }
    },[theme]);
  return (
    <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
  )
}

export default CustomThemeProvider;