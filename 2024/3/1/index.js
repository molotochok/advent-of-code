const fs = require("fs");

const startTime = performance.now();

let input = fs.readFileSync(process.argv[2] + ".txt").toString('UTF8');

const target = "mul(";

let sum = 0;
for (let i = 0, ti = 0, d1 = null, d2 = null; i < input.length; i++) {
  if (ti === target.length) {
    d1 = "";
  }

  if (d2 != null) { 
    const n = input.charCodeAt(i);
    if (n >= 48 && n <= 57) {
      d2 += input[i];
    } else if (n == 41){
      sum += +d1 * +d2;
      d1 = null; d2 = null; ti = 0;
    } else {
      d1 = null; d2 = null; ti = 0;
    }
  }
  else if (d1 != null) {
    const n = input.charCodeAt(i);
    if (n >= 48 && n <= 57) {
      d1 += input[i];
    } else if (n == 44){
      d2 = "";
    } else {
      d1 = null; d2 = null; ti = 0;
    }
  }

  if (input[i] === target[ti]) {
    ti++;
  } else {
    ti = 0;
  }
}

console.log(`Result: ${sum}. Took: ${(performance.now() - startTime) / 1000} seconds`);
