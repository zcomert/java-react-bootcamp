import React from "react";
import { Link } from "react-router-dom";
import AddAuthor from "./AddAuthor";

export default function ListAuthor({authors, setAuthors}) {
  return (
    <div>
      Author List {authors.length}

      {
        authors.map((author)=> {
          const {id,firstName, lastName} = author
          return(
            <p key={id} >{`${id} ${firstName} ${lastName}`}</p>
          )
        })
      }

      {/* <Link to='/admin/authors/add'>Add</Link> */}
      <AddAuthor authors={authors} setAuthors={setAuthors} />
    </div>
  );
}
