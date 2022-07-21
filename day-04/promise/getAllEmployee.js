import fetch from "node-fetch";
const url = "http://localhost:8080/api/employees";

const result = fetch(url)
            .then(resp => resp.json())
            .then(data => console.log(data));

