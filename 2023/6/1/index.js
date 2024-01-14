const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(i => i.split(/\s+/));

let arr = [];
for (let i = 1; i < input[0].length; i++) {
  arr.push([+input[0][i], +input[1][i]]);
}

const getWins = (t, d) => {
  let wins = 0;

  for (let i = Math.floor(t / 2); i >= 0; i--) {
    if (i * (t - i) <= d) break;
    wins += (i == t - i) ? 1 : 2;
  }
  
  return wins;
};

let res = 1;
for (let i = 0 ; i < arr.length; i++) {
  const wins = getWins(arr[i][0], arr[i][1]);
  console.log(wins);
  res *= wins;
}
console.log("Result: ", res);
