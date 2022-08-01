import { Button } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme} from "../../store/actions/settingActions";

export default function ListBook() {
  
  const {theme, pageSize} = useSelector(state => state.setting)
  const settingDispatch = useDispatch();
  
  const handleClick = () => {
    settingDispatch(setTheme("theme2"));
  }
  
  return (
    <div>Book List 
      <div>
      {theme}
      </div>
      <div>
      {pageSize}
      </div>
      <div>
        <Button onClick={handleClick} variant="contained">Change Theme</Button>
      </div>

    </div>
  )
}
