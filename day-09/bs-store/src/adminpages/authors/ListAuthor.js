import { Fab } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import AddAuthor from "./AddAuthor";
import AddIcon from '@mui/icons-material/Add';

export default function ListAuthor() {
  const { authors, setAuthors } = React.useContext(AppContext);

  const removeAuthor = (id) => {
    // let arr = [];

    // for(const author of authors){
    //     if(author.id!==id){
    //       arr.push(author);
    //     }
    // }
    // setAuthors(arr);

    let afterRemove = authors.filter((author) => author.id !== id);
    setAuthors(afterRemove);
  };

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };
  
  const fab =  {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
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
      <div>
        <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
          {fab.icon}
        </Fab>
      </div>
    </div>
  );
}
