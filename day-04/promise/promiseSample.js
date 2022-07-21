const getComments = (number) =>
  new Promise((resolve, reject) => {
    switch (number) {
      case 1:
        resolve({ name: "Zafer", age: 35 });
        break;
      case 2:
        reject("Error...");
        break;

      default:
        reject("Error...");
        break;
    }
  });

getComments(2)
    .then(data => console.log(data))
    .catch(err => console.log(err))


