import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AuthorService from "../../services/AuthorService";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AddAuthor() {

  const authorService = new AuthorService();
  const {authors,setAuthors} = useContext(AppContext);

  const initial = {
    firstName:'Aslan',
    lastName:'Can',
    email:'aslan.can@gmail.com'
  }

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

    authorService.postOneAuthor(form).then(resp => 
      setAuthors([...authors, resp.data]))
      .catch(err => alert(err));
  }

  const handleChange = (e) => {
    // console.log({...form})
    
    setForm({
      ...form,
      [e.target.name] : e.target.value
     })
  }


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
    <div>
      
      <h1>Add</h1>
      <input name="firstName" 
      placeholder="firstname" 
      value={form.firstName}
      onChange={(e) => handleChange(e)}  />
      
      <input name="lastName"  placeholder="lastname" 
      value={form.lastName}
      onChange={handleChange}  />
      
      <input name="email"  placeholder="email"
      value={form.email} 
      onChange={handleChange}  />

      <button onClick={handleClick} >Add Author</button>

      <Fab
        sx={fab.sx}
        aria-label={fab.label}
        onClick={() => navigate("/admin/authors/list")}
        color={fab.color}
      >
        {fab.icon}
      </Fab>
      
      {/* {JSON.stringify(form)} */}
    </div>
  );
}
