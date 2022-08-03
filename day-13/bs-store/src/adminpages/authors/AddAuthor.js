import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AuthorService from "../../services/AuthorService";
import { Button, Container, Fab, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SimpleFab from "../../components/fab/SimpleFab";

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

  

  return (
    <Container maxWidth='md'>
      <Stack spacing={3}
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

      <SimpleFab url="/admin/authors/list"/>
      </Container>
  );
}
