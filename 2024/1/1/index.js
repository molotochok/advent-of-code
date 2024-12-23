const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(s => s.split(/\s+/).map(s => +s));

const a1 = new Array(input.length);
const a2 = new Array(input.length);
for (let i = 0; i < input.length; i++) {  
  a1[i] = input[i][0];
  a2[i] = input[i][1];
}

a1.sort((a, b) => a - b);
a2.sort((a, b) => a - b);

let sum = 0;
for (let i = 0; i < input.length; i++) {
  sum += Math.abs(a1[i] - a2[i]);
}

console.log(`Result: ${sum}. Took: ${(performance.now() - startTime) / 1000} seconds`);
