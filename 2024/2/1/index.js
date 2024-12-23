const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(s => s.split(/\s+/).map(s => +s));

let sum = 0;
for (let i = 0; i < input.length; i++) {
  sum += valid(input[i]);
}

console.log(`Result: ${sum}. Took: ${(performance.now() - startTime) / 1000} seconds`);


function valid(row) {
  let state = 0;
  for (let i = 0; i < row.length - 1; i++) { 
    if (state == 0) state = row[i] < row[i + 1] ? 1 : -1;
    else if (row[i] < row[i + 1] && state < 0) return 0;
    else if (row[i] > row[i + 1] && state > 0) return 0;
    const diff = Math.abs(row[i + 1] - row[i]);
    if (diff < 1 || diff > 3) return 0;
  }

  return 1;
}