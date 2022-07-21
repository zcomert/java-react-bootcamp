// @author sumeyye karagul

import fetch from "node-fetch";

const deleteOneEmployee = async (id) => {
  const url = `http://localhost:8080/api/employees/${id}`; // Template literal
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const result = await deleteOneEmployee(2);
console.log(result);
