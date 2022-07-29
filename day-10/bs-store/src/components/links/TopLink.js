import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";



export default function TopLink() {
  const {authors} = useContext(AppContext);
  console.log(authors)
  
  return (
    <div>
      <ul>
        <li>
          <Link to='/admin/authors/list'>Authors</Link>
        </li>
        <li>
          {" "}
          <Link to='/'>Home</Link>
        </li>
      
        <li>
           ... {authors.length}
        </li>
      </ul>
    </div>
  );
}
