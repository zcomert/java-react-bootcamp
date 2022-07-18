import fetch from 'node-fetch'

function getDataFromApi(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(resp => resp.json())
    .then(users => {
        users.map(user => {
            console.log(user);
        })
    });
}

getDataFromApi();