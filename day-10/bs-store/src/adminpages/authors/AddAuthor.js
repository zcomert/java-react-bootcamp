import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

export default function AddAuthor() {

  const {authors,setAuthors} = useContext(AppContext);

  const handleClick = () => {
    const entity = {
      id:10,
      firstName:"Ayşe",
      lastName:"Ay"
    }
    setAuthors([...authors, entity])
   
    console.log(entity)
    console.log(authors)
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
