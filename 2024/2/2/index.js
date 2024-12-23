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
  let eIndex = findError(row, -1);
  if (eIndex == -1) return 1;
  if (findError(row, eIndex - 1) == -1) return 1;
  if (findError(row, eIndex) == -1) return 1;
  if (findError(row, eIndex + 1) == -1) return 1;
  return 0;
}

function findError(row, eIndex) {
  let state = 0;
  for (let i = 0; i < row.length - 1; i++) { 
    if (i == eIndex) continue;
    const step = (i + 1 == eIndex) ? 2 : 1;

    if (state == 0) state = row[i] < row[i + step] ? 1 : -1;
    else if (row[i] < row[i + step] && state < 0) return i;
    else if (row[i] > row[i + step] && state > 0) return i;
    const diff = Math.abs(row[i + step] - row[i]);
    if (diff < 1 || diff > 3) return i;
  }

  return -1;
}