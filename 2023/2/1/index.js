const fs = require("fs");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

let arr = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split('\r\n')
  .map(a => a.substring(a.indexOf(":") + 1).split(";").flatMap(s => s.split(",")));

console.log(arr);

const valid = (row) => {
  for(let i = 0; i < row.length; i++) {
    let number = "";
    for(let j = 0; j < row[i].length; j++) {
      if (Number.isInteger(+row[i][j])) {
        number += row[i][j];
      } 
      else if (row[i][j] == 'r') {
        if (+number > MAX_RED) return false;
        break;
      } 
      else if (row[i][j] == 'g') {
        if (+number > MAX_GREEN) return false;
        break;
      } 
      else if (row[i][j] == 'b') {
        if (+number > MAX_BLUE) return false;
        break;
      } 
    } 
  } 
  return true;
};

let res = 0;
for(let i = 0; i < arr.length; i++) {
  if (valid(arr[i])) {
    res += i + 1;
  }
}

console.log(res);