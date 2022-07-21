const computeSqrtAsync = async function (number) {
  
   if (number < 0) {
    return Promise.reject("no negative number, please.");
  }
  
  if (number === 0) {
    return Promise.resolve(0);
  }
  
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(Math.sqrt(number)), 1000);
  });
};


const forNegative1 = await computeSqrtAsync(-1);
const forZero = await computeSqrtAsync(0);
const forSixteen = await computeSqrtAsync(16);

console.log(forNegative1);  
console.log(forZero);
console.log(forSixteen);