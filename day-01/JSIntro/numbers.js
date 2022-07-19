import _ from "lodash"

const numbers = [23, 12, 13, 44, 55, 61];

// numbers.forEach(n => console.log(n))

_.each(numbers, function (number, i) {
  console.log(number);
});
