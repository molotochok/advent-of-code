const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .flatMap(s => s.split(","));

console.log(input);

const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h += str.charCodeAt(i);
    h = h * 17 % 256;
  }
  return h;
};

const res = input.reduce((acc, curr) => {
  acc += hash(curr);
  return acc;
}, 0);

console.log("Result: " + res);