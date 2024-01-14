const fs = require("fs");

let input = fs
  .readFileSync("test.txt")
  .toString('UTF8')
  .split(/\r?\n/);

const lr = input[0];
console.log("LR: ", lr);

const map = {};
const startPos = [];
for (let i = 2; i < input.length; i++) {
  const arr = input[i].split(" = ");
  map[arr[0]] = arr[1].substring(1, arr[1].length - 1).split(",").map(s => s.trim());

  if (arr[0][2] == "A") {
    startPos.push(arr[0]);
  }
}

console.log(startPos);

const zReachMap = {};

for (let i = 0, steps = 1, k = 0; i < startPos.length; i++) {
  const visitedZ = {};
  let pos = startPos[i];
  while(true) {
    pos = map[pos][lr[k] == "L" ? 0 : 1];
    k = (k + 1) % lr.length;

    if (pos[2] == "Z") {
      if (visitedZ[pos]) {
        zReachMap[startPos[i]] = steps - visitedZ[pos];
        break;
      }
      visitedZ[pos] = steps;
    }

    steps++;
  }
}

console.log(zReachMap);

const lcmForArr = (arr) => {
  const gcd = (a, b) => !b ? a : gcd(b, a % b);
  const lcm = (a, b) => a * b / gcd(a, b);

  let res = arr[0];
  for(let i = 1; i < arr.length; i++) {
    res = lcm(arr[i], res);
  }

  return res;
};

console.log("Result: ", lcmForArr(Object.values(zReachMap)));