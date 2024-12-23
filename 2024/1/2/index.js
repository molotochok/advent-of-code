const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(s => s.split(/\s+/).map(s => +s));

const a1 = new Array(input.length);
const a2 = new Map();
for (let i = 0; i < input.length; i++) {  
  a1[i] = input[i][0];

  if (a2.has(input[i][1])) {
    a2.set(input[i][1], a2.get(input[i][1]) + 1);
  } else {
    a2.set(input[i][1], 1);
  }
}

let sum = 0;
for (let i = 0; i < input.length; i++) {
  sum += a1[i] * (a2.get(a1[i]) ?? 0);
}

console.log(`Result: ${sum}. Took: ${(performance.now() - startTime) / 1000} seconds`);
