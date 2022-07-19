import React from "react";

// Rest
// Spread Operator : ...
export default function Employee({ employee, ...props }) {
  
   // destructuring
  const { firstName, lastName, age, ...other } = employee;

  return (
    <div>
      <h3>
        {firstName}
        <span> </span>
        {lastName}
        <span> </span>
        {age}
      </h3>
    </div>
  );
}
