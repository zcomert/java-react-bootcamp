import fetch from "node-fetch"

// arrow function 
const getAllEmployees = async () => {
    const url = "http://localhost:8080/api/employees";
    return await fetch(url).then(resp => resp.json())
}

console.log("Async method is started...");
const arr = await getAllEmployees();
console.log(arr);
console.log("Async method is completed...");