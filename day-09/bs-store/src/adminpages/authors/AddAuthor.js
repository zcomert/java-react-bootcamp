import React from "react";

export default function AddAuthor({authors, setAuthors}) {

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
