import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import AddAuthor from "./AddAuthor";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListAuthor() {
  const { authors, setAuthors } = React.useContext(AppContext);
  const navigate = useNavigate();

  const removeAuthor = (id) => {
    // let arr = [];

    // for(const author of authors){
    //     if(author.id!==id){
    //       arr.push(author);
    //     }
    // }
    // setAuthors(arr);

    // ACTION
    const url = `http://localhost:8080/api/v1/authors/${id}`;
    console.log(url);

    axios
      .delete(url)
      .then((resp) => resp.data)
      .then((resp) => {
        let afterRemove = authors.filter((author) => author.id !== id);
        setAuthors(afterRemove);
      })
      .catch((err) => console.error("DELETE ERROR", err));
  };

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  const fab = {
    color: "primary",
    sx: fabStyle,
    icon: <AddIcon />,
    label: "Add",
  };

  return (
    <div>
      Author List {authors.length}
      {authors.map((author, index) => {
        const { id, firstName, lastName } = author;
        return (
          <p key={index}>
            {`${id} ${firstName} ${lastName}`}
            <button onClick={() => removeAuthor(id)}>Remove</button>
          </p>
        );
      })}
      {/* <Link to='/admin/authors/add'>Add</Link> */}
      <div>
        <button onClick={() => setAuthors([])}>Clear all</button>
      </div>
      <Fab
        sx={fab.sx}
        aria-label={fab.label}
        onClick={() => navigate("/admin/authors/add")}
        color={fab.color}
      >
        {fab.icon}
      </Fab>
    </div>
  );
}
