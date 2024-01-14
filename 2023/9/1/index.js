const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(s => s.split(/\s+/).map(c => +c));

console.log(input);

const getNext = (arr) => {
  const arrs = [arr];
  
  let iteration = 0;
  while (true) {
    let allZeros = true;
    const parentArr = arrs[iteration];
    const newArr = [];
    for (let i = 0; i < parentArr.length - 1; i++) {
      let diff = parentArr[i + 1] - parentArr[i];
      if (diff != 0) allZeros = false;
      newArr.push(diff);
    }

    if (allZeros) { break; }

    arrs.push(newArr);
    iteration++;
  }  
  
  return arrs.reduce((acc, curr) => acc += curr[curr.length - 1], 0);
};

const res = input.reduce((acc, curr) => acc += getNext(curr), 0);
console.log("Result: ", res);