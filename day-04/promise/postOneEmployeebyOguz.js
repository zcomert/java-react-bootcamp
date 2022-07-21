import fetch from "node-fetch";

const url = "http://localhost:8080/api/employees/add";
const body = { firstName: "Oğuz", lastName: "Bilgin" };

const response = async () => {
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
};

console.log(response);
