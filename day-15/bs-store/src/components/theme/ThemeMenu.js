import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch} from "react-redux";
import {setTheme} from "../../store/actions/settingActions";

export default function ThemeMenu() {
  const settingDispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (theme) => {
    setAnchorEl(null);
    settingDispatch(setTheme(theme));
  };

  return (
    <div>
      <Button sx={{color:'#fff'}}        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Theme
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleClose('theme1')}>Dragon</MenuItem>
        <MenuItem onClick={() => handleClose('theme2')}>Purple Sky</MenuItem>
        <MenuItem onClick={() => handleClose('theme3')}>Spring</MenuItem>
      </Menu>
    </div>
  );
}
