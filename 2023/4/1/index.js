const fs = require("fs");

let arr = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split('\r\n');

console.log(arr);

let sum = 0;
for (let i = 0; i < arr.length; i++) {
  let points = 0;
  let found = false;

  const [win, all] = arr[i]
    .substring(arr[i].indexOf(":") + 1)
    .split("|");
  
  const winSet = new Set(win.trim().split(/\s+/));
  const allArr = all.trim(" ").split(/\s+/);

  console.log(allArr);
  console.log(winSet);

  for (let i = 0; i < allArr.length; i++) {
    if (winSet.has(allArr[i])) {
      if (!found) { points = 1; found = true; }
      else { points *= 2; } 
    }
  }

  console.log("Iteration: " + i, points);

  sum += points;
}

console.log("SUM: ", sum);


