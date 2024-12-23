const fs = require("fs");

const startTime = performance.now();

let input = fs.readFileSync(process.argv[2] + ".txt").toString('UTF8');

const target = "mul(";
const doT = "do()";
const dontT = "don't()";

let sum = 0;
let add = true;
for (let i = 0, ti = 0, doi = 0, donti = 0, d1 = null, d2 = null; i < input.length; i++) {
  d1 = ti === target.length ? "" : d1;
  add = doi === doT.length ? true : add;
  add = donti === dontT.length ? false : add;

  if (d2 != null) { 
    const n = input.charCodeAt(i);
    if (n >= 48 && n <= 57) {
      d2 += input[i];
    } else if (n == 41){
      sum += add ? +d1 * +d2 : 0;
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

  ti = input[i] === target[ti] ? ti + 1 : 0;
  doi = input[i] === doT[doi] ? doi + 1 : 0;
  donti = input[i] === dontT[donti] ? donti + 1 : 0;
}

console.log(`Result: ${sum}. Took: ${(performance.now() - startTime) / 1000} seconds`);
