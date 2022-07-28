import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

export default function TopLink({authors}) {
  const data = useContext(AppContext);
  console.log(data)
  
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
