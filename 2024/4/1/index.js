const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

const word = "XMAS";
let sum = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    sum += find(input, i, j, i, j, word, 0);
  }
}

console.log(`Result: ${sum}. Took: ${(performance.now() - startTime) / 1000} seconds`);

function find(input, i, j, prevI, prevJ, word, wi) {
  if (i < 0 || i >= input.length) return 0;
  if (j < 0 || j >= input[i].length) return 0;
  if (input[i][j] !== word[wi]) return 0;
  if (wi === word.length - 1) return 1;

  if (prevI < i) {
    if (prevJ < j) return find(input, i + 1, j + 1, i, j, word, wi + 1);
    if (prevJ > j) return find(input, i + 1, j - 1, i, j, word, wi + 1);
    return find(input, i + 1, j, i, j, word, wi + 1);
  }

  if (prevI === i) {
    if (prevJ < j) return find(input, i, j + 1, i, j, word, wi + 1);
    if (prevJ > j) return find(input, i, j - 1, i, j, word, wi + 1);
    return find(input, i - 1, j - 1, i, j, word, wi + 1)
     + find(input, i - 1, j, i, j, word, wi + 1)
     + find(input, i - 1, j + 1, i, j, word, wi + 1)
     + find(input, i, j - 1, i, j, word, wi + 1)
     + find(input, i, j + 1, i, j, word, wi + 1)
     + find(input, i + 1, j - 1, i, j, word, wi + 1)
     + find(input, i + 1, j, i, j, word, wi + 1)
     + find(input, i + 1, j + 1, i, j, word, wi + 1);
  }

  if (prevJ < j) return find(input, i - 1, j + 1, i, j, word, wi + 1);
  if (prevJ > j) return find(input, i - 1, j - 1, i, j, word, wi + 1);
  return find(input, i - 1, j, i, j, word, wi + 1);
}
