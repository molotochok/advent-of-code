const fs = require("fs");

let arr = fs.readFileSync("input.txt").toString('UTF8').split('\r\n');
console.log(arr);

let sum = 0;
for (let i = 0; i < arr.length; i++) {
  let first = "";
  for (let j = 0; j < arr[i].length; j++) {
    if (Number.isInteger(+arr[i][j])) { 
      first = arr[i][j];
      break;
    }
  }

  let last = "";
  for (let j = arr[i].length - 1; j >= 0; j--) {
    if (Number.isInteger(+arr[i][j])) {
      last = arr[i][j];
      break;
    }
  }

  sum += +(first + last);
}

console.log(sum);