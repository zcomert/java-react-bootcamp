let names = []; 

function getNamesFromJsonServer(){
    const url = "http://localhost:3000/names";
    return fetch(url).then(resp => resp.json());
}

const root = document.getElementById("root");
const getData = getNamesFromJsonServer().then(resp => {
    
    console.log(resp);
    names = resp;
    
    names.map(name => {
        let element = document.createElement("p");
        element.innerHTML = name;
        root.append(element);
        console.log(name);
    })
});