import fetch from "node-fetch";

const body = {
    firstName:"Fatma",
    lastName:"Güneş"
}

const url = "http://localhost:8080/api/employees";
const response = await fetch(url,{
    method : 'POST',
    body : JSON.stringify(body),
    headers :{
        "Content-Type":"application/json"
    }
}).then(resp => resp.json());

console.log(response);