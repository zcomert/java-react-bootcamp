//@author sumeyye karagul

import fetch from "node-fetch";

const id = {
    id: 1
}

const deleteOneEmployee = async () =>{
    const url = "http://localhost:8080/api/employees/delete/{id}"
    return fetch(url, {
        method: 'DELETE',
        id,
        headers :{
          "Content-Type":"application/json"
        }
        }).then(resp => resp.json)
}

 const result = await deleteOneEmployee();

 console.log(result)