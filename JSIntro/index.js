const names = ["Ahmet","Erdi","Hüseyin", "Can","Merve"];
const root = document.getElementById("root");

names.map(name => {
    let element = document.createElement("p");
    element.innerHTML = name;
    root.append(element);
    console.log(name);
})



