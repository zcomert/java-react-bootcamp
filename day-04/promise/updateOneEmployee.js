/**
 * @author M.Emin Zeyrekli
 */
 import fetch from "node-fetch";

 function updateOneEmployee() {
   const url = "http://localhost:8080/api/employees/1";
   const body = {
     firstName: "Adem",
     lastName: "Güneş",
   };
   return fetch(url, {
     method: "PUT",
     body: JSON.stringify(body),
     headers: {
       "Content-Type": "application/json",
     },
 
   }).then((resp) => resp.json());
 }
 const result = await updateOneEmployee(); 
 console.log(result);