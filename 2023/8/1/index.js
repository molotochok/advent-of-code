const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split(/\r?\n/);

const lr = input[0];
console.log("LR: ", lr);

const map = {};
for (let i = 2; i < input.length; i++) {
  const arr = input[i].split(" = ");
  map[arr[0]] = arr[1].substring(1, arr[1].length - 1).split(",").map(s => s.trim()); 
}

let pos = "AAA";
let i = 0;
let res = 0;
while(pos != "ZZZ") {
  pos = map[pos][lr[i] == "L" ? 0 : 1];
  i = (i + 1) % lr.length;
  res++;
}

console.log("Result: ", res);