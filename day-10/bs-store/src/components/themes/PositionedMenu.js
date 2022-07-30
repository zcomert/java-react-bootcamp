import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useSelector, useDispatch} from "react-redux";
import { setTheme } from "../../store/actions/settingActions";

export default function PositionedMenu() {

  const {theme} = useSelector(state => state.setting)
  const settingDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (changedTheme) => {
    setAnchorEl(null);
    settingDispatch(setTheme(changedTheme));
    console.log(theme)
  };


  return (
    <>
      <Button
        id='demo-positioned-button'
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant='outlined'
        sx={{ color: "white" }}
      >
        Theme
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleClose("theme1")}>Sky</MenuItem>
        <MenuItem onClick={() => handleClose("theme2")}>Orange</MenuItem>
        <MenuItem onClick={() => handleClose("theme3")}>Forest</MenuItem>
        <MenuItem onClick={() => handleClose("theme4")}>Fire</MenuItem>
      </Menu>
    </>
  );
}
