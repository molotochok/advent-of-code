const fs = require("fs");

let arr = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split('\r\n');

console.log(arr);

let sum = 0;
let arrPoints = Array(arr.length).fill(1);
for (let i = 0; i < arr.length; i++) {
  let points = 0;

  const [win, all] = arr[i]
    .substring(arr[i].indexOf(":") + 1)
    .split("|");
  
  const winSet = new Set(win.trim().split(/\s+/));
  const allArr = all.trim(" ").split(/\s+/);

  for (let i = 0; i < allArr.length; i++) {
    if (winSet.has(allArr[i])) {
      points ++;
    }
  }


  for (let j = i + 1; j < arr.length && j < i + 1 + points; j++) {
    arrPoints[j] += arrPoints[i];
  }
  console.log(`arrPoints[${i + 1}]: `, arrPoints[i]);
  sum += arrPoints[i];
}

console.log("SUM: ", sum);


