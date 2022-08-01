import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AuthorService from "../../services/AuthorService";
import { Button, Fab, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddAuthor() {
  const authorService = new AuthorService();
  const { authors, 
    isLoading,
    setIsLoading,
    setAuthors } = useContext(AppContext);

  const initial = {
    firstName: "Aslan",
    lastName: "Can",
    email: "aslan.can@gmail.com",
  };

  const [form, setForm] = useState(initial);
  const navigate = useNavigate();

  const handleClick = () => {
    // const url = "http://localhost:8080/api/v1/authors";

    // const entity = {
    //   firstName:"Ayşe",
    //   lastName:"Ay",
    //   email:"abc@gmail.com"
    // }

    // axios.post(url, entity)
    // .then(resp => resp.data)
    // .then(resp => {
    //   console.log(resp.data);
    //   setAuthors([...authors, resp.data]) // action -> (dispatch) -> reducer
    // })

   setIsLoading(true);
   console.log(isLoading);
   
   setTimeout(() => {
       authorService
       .postOneAuthor(form)
       .then((resp) => setAuthors([...authors, resp.data]))
       .catch((err) => alert(err));
       setIsLoading(false);
       navigate("/admin/authors/list");
     },3000)
     
    

     console.log(isLoading);
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
    color: "primary",
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
        <Button variant="contained" onClick={handleClick}>Add</Button>
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
