import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import AuthorService from "../../services/AuthorService";
import { Button, Fab, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useSelector, useDispatch} from "react-redux"
import { getOneAuthor, postOneAuthor, putOneAuthor } from "../../store/actions/authorActions";


export default function UpdateAuthor() {
  const initial = {
    firstName: "",
    lastName: "",
    email: "",
  };
  
  const { isLoading, setIsLoading } = useContext(AppContext);
  const {author,authors} = useSelector(state => state.author);
  const {id} = useParams();
  const authorDispatch = useDispatch();
  const [form, setForm] = useState(initial);
  const navigate = useNavigate();

  useEffect(() => {
    new AuthorService().getOneAuthor(id)
    .then(resp => resp.data)
    .then(resp => {
        setForm({
            firstName:resp.firstName,
            lastName:resp.lastName,
            email : resp.email
        })
    })

  },[])
  


  const loading = async () => {
    setIsLoading(true);
  }

  
  const handleClick = async () => {
    // await loading();
     authorDispatch(putOneAuthor(id,form))
     navigate("/admin/authors/list");
    // setIsLoading(false);
    
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
        <Button variant='contained' onClick={handleClick}>
          Save
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
