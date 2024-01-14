const fs = require("fs");

let arr = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split('\r\n')
  .map(a => a.substring(a.indexOf(":") + 1).split(";").flatMap(s => s.split(",")));

const power = (row) => {
  let r = 1;
  let g = 1;
  let b = 1;

  for(let i = 0; i < row.length; i++) {
    let number = "";
    for(let j = 0; j < row[i].length; j++) {
      if (Number.isInteger(+row[i][j])) number += row[i][j];
      else if (row[i][j] == 'r') { r = Math.max(r, +number); break; } 
      else if (row[i][j] == 'g') { g = Math.max(g, +number); break; } 
      else if (row[i][j] == 'b') { b = Math.max(b, +number); break; } 
    } 
  } 

  console.log("ROW: ", r, g, b);

  return r * g * b;
};

let res = 0;
for(let i = 0; i < arr.length; i++) {
  res += power(arr[i]);
}

console.log(res);