import React from "react";

// Rest
// Spread Operator : ...
export default function Employee({ employee, ...props }) {
  
   // destructuring
  const { firstName, lastName, age, ...other } = employee;

  return (
    <article className="person">
      <img src="./images/1.jpg" alt={firstName} />
      <div>
        <h4>{firstName} {lastName}</h4>
        <p>{age} years old.</p>
      </div>
    </article>
  );
}
