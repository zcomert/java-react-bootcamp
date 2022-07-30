import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AuthorService from "../../services/AuthorService";
import { Button, Fab, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useSelector, useDispatch} from "react-redux"
import { postOneAuthor } from "../../store/actions/authorActions";

export default function AddAuthor() {
  const initial = {
    firstName: "Aslan",
    lastName: "Can",
    email: "aslan.can@gmail.com",
  };
  
  const { isLoading, setIsLoading } = useContext(AppContext);
  const authors = useSelector(state => state.author);
  const authorDispatch = useDispatch();
  const [form, setForm] = useState(initial);
  const navigate = useNavigate();

  


  const loading = async () => {
    setIsLoading(true);
  }

  
  const handleClick = async () => {
    await loading();
    authorDispatch(postOneAuthor(form))
    navigate("/admin/authors/list");
    setIsLoading(false);
    
  };

 

  const handleChange = (e) => {
    // console.log({...form})

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  const fab = {
    color: "secondary",
    sx: fabStyle,
    icon: <ArrowBackIcon />,
    label: "Add",
  };

  return (
    <>
      <Stack
        alignSelf='center'
        alignItems='center'
        sx={{ minWidth: "650px" }}
        spacing={3}
      >
        <Typography align='center' gutterBottom variant='h5'>
          Add Author
        </Typography>

        <TextField
          color='primary'
          label='First Name'
          name='firstName'
          placeholder='firstname'
          value={form.firstName}
          onChange={(e) => handleChange(e)}
        />

        <TextField
          name='lastName'
          label='Last Name'
          placeholder='lastname'
          value={form.lastName}
          onChange={handleChange}
        />
        <TextField
          name='email'
          label='Email'
          placeholder='email'
          value={form.email}
          onChange={handleChange}
        />
        <Button variant='contained' onClick={handleClick}>
          Add
        </Button>
      </Stack>

      <Fab
        sx={fab.sx}
        aria-label={fab.label}
        onClick={() => navigate("/admin/authors/list")}
        color={fab.color}
      >
        {fab.icon}
      </Fab>
    </>
  );
}
