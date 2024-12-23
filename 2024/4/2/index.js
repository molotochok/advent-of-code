const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

let sum = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    sum += find(input, i, j);
  }
}

console.log(`Result: ${sum}. Took: ${(performance.now() - startTime) / 1000} seconds`);

function find(input, i, j) {
  if (get(input, i, j) !== "A") return 0;
  
  if (get(input, i - 1, j - 1) === "M") {
    if (get(input, i + 1, j + 1) !== "S") return 0;
  } else if (get(input, i - 1, j - 1) === "S") {
    if (get(input, i + 1, j + 1) !== "M") return 0;
  } else {
    return 0;
  }

  if (get(input, i + 1, j - 1) === "M") {
    if (get(input, i - 1, j + 1) !== "S") return 0;
  } else if (get(input, i + 1, j - 1) === "S") {
    if (get(input, i - 1, j + 1) !== "M") return 0;
  } else {
    return 0;
  }
  
  return 1;
}

function get(input, i, j, char, e) {
  if (i < 0 || i >= input.length) return null;
  if (j < 0 || j >= input[i].length) return null;
  return input[i][j];
}
