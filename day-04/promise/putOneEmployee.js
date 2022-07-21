/**
 * @author M.Emin
 */
import fetch from "node-fetch";

function putOneEmployee(id,employee) {
  
  const url = `http://localhost:8080/api/employees/${id}`;
  
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(employee),
    headers: {
      "Content-Type": "application/json",
    }
  }).then((resp) => resp.json());
}

const emp = {
  firstName: "Adem",
  lastName: "Güneş",
}

// await promise in çalışmasının bitmesini bekler.
const result = await putOneEmployee(3,emp); 
console.log(result);
