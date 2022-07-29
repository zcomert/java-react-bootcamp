import axios from "axios";
import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

export default function AddAuthor() {

  const {authors,setAuthors} = useContext(AppContext);

  const handleClick = () => {
    const url = "http://localhost:8080/api/v1/authors";
    
    const entity = {
      firstName:"Ayşe",
      lastName:"Ay",
      email:"abc@gmail.com"
    }

    axios.post(url, entity)
    .then(resp => resp.data)
    .then(resp => {
      console.log(resp.data);
      setAuthors([...authors, resp.data]) // action -> (dispatch) -> reducer
    })

  }

  return (
    <div>
      AddAuthor
      <button onClick={handleClick}>Add</button>
      <div>
        {authors.length}
      </div>
    </div>
  );
}
