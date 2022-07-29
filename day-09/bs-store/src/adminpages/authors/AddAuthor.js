import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import AuthorService from "../../services/AuthorService";

export default function AddAuthor() {

  const authorService = new AuthorService();
  const {authors,setAuthors} = useContext(AppContext);

  const initial = {
    firstName:'',
    lastName:'',
    email:''
  }

  const [form, setForm] = useState(initial); 

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

  return (
    <div>
      
      <input name="firstName" 
      placeholder="firstname" 
      onChange={(e) => handleChange(e)}  />
      
      <input name="lastName"  placeholder="lastname" 
      onChange={handleChange}  />
      
      <input name="email"  placeholder="email" 
      onChange={handleChange}  />

      <button onClick={handleClick} >Add Author</button>
      
      {/* {JSON.stringify(form)} */}
    </div>
  );
}