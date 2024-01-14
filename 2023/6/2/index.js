const fs = require("fs");

let arr = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(r => {
    let n = "";
    for (let i = 0; i < r.length; i++) {
      if (r[i] != ' ' && Number.isInteger(+r[i])) n += r[i];
    }
    return +n;
  });

const getWins = (t, d) => {
  let wins = 0;

  for (let i = Math.floor(t / 2); i >= 0; i--) {
    if (i * (t - i) <= d) break;
    wins += (i == t - i) ? 1 : 2;
  }
  
  return wins;
};

const wins = getWins(arr[0], arr[1]);
console.log("Result: ", wins);
