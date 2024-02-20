const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

console.log(input);

const startTime = performance.now();

const rows = input.length;
const cols = input[0].length;

let res = 0;
for (let i = 0; i < cols; i++) {
  let rounds = 0;
  let solidIndex = -1;
  for (let j = 0; j < rows; j++) {
    if (input[j][i] == "O") {
      res += rows - (solidIndex + 1) - rounds;
      rounds++;
    } else if (input[j][i] == "#") {
      rounds = 0;
      solidIndex = j;
    }
  }  
}

console.log(`Result: ${res}. Took ${performance.now() - startTime}ms`);
