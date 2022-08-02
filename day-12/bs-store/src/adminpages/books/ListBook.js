import { Button } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ThemeMenu from '../../components/theme/ThemeMenu';
import { setTheme} from "../../store/actions/settingActions";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ListBook() {
  
  const {theme, pageSize} = useSelector(state => state.setting)
  const settingDispatch = useDispatch();
  
  const handleClick = () => {
    settingDispatch(setTheme("theme2"));
  }
  
  return (
    <>
    </>
  )
}
