import React from "react";

// Rest
// Spread Operator : ...
export default function Employee({ employee, ...props }) {
  
   // destructuring
  const { id, firstName, lastName, age, ...other } = employee;
  // const url = "./images/"+id+".jpg";
  return (
    <article className="person">
      <img src={`./images/${id}.jpg`} alt={firstName} />
      <div>
        <h4>{firstName} {lastName}</h4>
        <p>{age} years old.</p>
      </div>
    </article>
  );
}
