const fs = require("fs");

let arr = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split('\r\n');

const findNumber = (arr, i, j) => {
  let s = j;
  while(s >= 0 && Number.isInteger(+arr[i][s])) {
    s--;
  }
  
  let e = j;
  while(e < arr.length && Number.isInteger(+arr[i][e])) {
    e++;
  }

  const number = arr[i].substring(s + 1, e);
  return +number;
};

const ratio = (arr, i, j) => {
  let numbers = [];
  
  let top = false;
  if (i > 0 && Number.isInteger(+arr[i - 1][j])) { top = true; numbers.push({i: i - 1, j}) };
  if (i > 0 && j > 0 && Number.isInteger(+arr[i - 1][j - 1]) && !top) numbers.push({i: i - 1, j: j - 1});
  if (i > 0 && j < arr[i].length - 1 && Number.isInteger(+arr[i - 1][j + 1]) && !top) numbers.push({i: i - 1, j: j + 1});
  
  let bottom = false;
  if (i < arr.length - 1 && Number.isInteger(+arr[i + 1][j])) { bottom = true; numbers.push({i: i + 1, j}) };
  if (i < arr.length - 1 && j > 0 && Number.isInteger(+arr[i + 1][j - 1]) && !bottom) numbers.push({i: i + 1, j: j - 1});
  if (i < arr.length - 1 && j < arr[i].length - 1 && Number.isInteger(+arr[i + 1][j + 1]) && !bottom) numbers.push({i: i + 1, j: j + 1});

  if (j > 0 && Number.isInteger(+arr[i][j - 1])) numbers.push({i, j: j - 1});
  if (j < arr[i].length - 1 && Number.isInteger(+arr[i][j + 1])) numbers.push({i, j: j + 1});
  
  if (numbers.length != 2) return 0;

  return numbers.reduce((acc, curr) => acc * findNumber(arr, curr.i, curr.j), 1);
};

let sum = 0;
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    if (arr[i][j] == '*') {
      sum += ratio(arr, i, j);
    }
  }
}

console.log("SUM: ", sum);