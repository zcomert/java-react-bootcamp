import React from "react";
import { Link } from "react-router-dom";

export default function ListAuthor(props) {
  return (
    <div>
      Author List {props.authors.length}

      
      
      <Link to='/admin/authors/add'>Add</Link>
    </div>
  );
}
