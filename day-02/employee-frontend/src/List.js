import React from "react";
import Employee from "./Employee";

export default function List({ names }) {
  return (
    <div>
      {names.map((emp, index) => (
        <Employee key={index} employee={emp} />
      ))}
    </div>
  );
}
