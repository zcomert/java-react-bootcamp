import React from "react";
import { Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function SimpleFab({backUrl,iconType}) {
  
    const navigate = useNavigate();

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  const fab = {
    color: "secondary",
    sx: fabStyle,
    icon: iconType==="new" ? <AddIcon />: <ArrowBackIcon />,
    label: "Add",
  };

  return (
    <Fab
      sx={fab.sx}
      aria-label={fab.label}
      onClick={() => navigate(backUrl)}
      color={fab.color}
    >
      {fab.icon}
    </Fab>
  );
}
