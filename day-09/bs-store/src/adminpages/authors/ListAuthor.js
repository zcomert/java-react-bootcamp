import React from "react";
import { Link } from "react-router-dom";

export default function ListAuthor({authors}) {
  return (
    <div>
      Author List {authors.length}

      {authors.map((author)=>(
        <p key={author.id} >{author.id}</p>
      ))}
      
      <Link to='/admin/authors/add'>Add</Link>
    </div>
  );
}
