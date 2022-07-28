import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import AddAuthor from "./AddAuthor";

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


    let afterRemove = authors.filter(author => author.id!==id)
    setAuthors(afterRemove);
  }
  
  return (
    <div>
      Author List {authors.length}
      {authors.map((author,index) => {
        const { id, firstName, lastName } = author;
        return <p 
        key={index}>
          {`${id} ${firstName} ${lastName}`}
          <button onClick={() => removeAuthor(id)} >Remove</button>
          </p>;
      })}
      {/* <Link to='/admin/authors/add'>Add</Link> */}
<div>
  <button onClick={() => setAuthors([])} >Clear all</button>
</div>
<div>
      <AddAuthor />

</div>
    </div>
  );
}
