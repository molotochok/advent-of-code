const fs = require("fs");

let arr = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split('\r\n');

const isPartNumber = (arr, i, j) => {
  return (i > 0 && arr[i - 1][j] != ".")     
    || (i > 0 && j > 0 && arr[i - 1][j - 1] != ".") 
    || (i > 0 && j < arr[i].length - 1 && arr[i - 1][j + 1] != ".") 
    || (i < arr.length - 1 && arr[i + 1][j] != ".")
    || (i < arr.length - 1 && j > 0 && arr[i + 1][j - 1] != ".") 
    || (i < arr.length - 1 && j < arr[i].length - 1 && arr[i + 1][j + 1] != ".")
    || (j < arr[i].length - 1 && arr[i][j + 1] != "." && !Number.isInteger(+arr[i][j + 1]))
    || (j > 0 && arr[i][j - 1] != "." && !Number.isInteger(+arr[i][j - 1]));
}

let sum = 0;
for (let i = 0; i < arr.length; i++) {
  let partNumber = false;
  let number = "";

  for (let j = 0; j < arr[i].length; j++) {
    if (Number.isInteger(+arr[i][j])) {
      if (number == "" || !partNumber) {
        partNumber = isPartNumber(arr, i, j); 
      }

      number += arr[i][j];      
    } else {
      if (partNumber) { 
        sum += +number; 
      }

      partNumber = false;
      number = "";
    }
  }

  if (partNumber && number != "") { 
    sum += +number; 
  }
}

console.log("SUM: ", sum);
// NOT: 507554