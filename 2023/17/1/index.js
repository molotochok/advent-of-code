const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

console.log(input);
const path = (input) => {
  const visited = getVisited(input);

  const stack = [];
  stack.push([0, 0, -1, -1, 0, 1]);

  let min = Number.MAX_VALUE;
  while (stack.length > 0) {
    let [row, col, pRow, pCol, value, d] = stack.pop();
    
    if (row < 0 || row >= input.length) continue;
    if (col < 0 || col >= input[0].length) continue;

    value += +input[row][col];

    if (value > min) continue;

    if (row == input.length - 1 && col == input[0].length - 1) {
      min = Math.min(min, value - input[0][0]);
      continue;
    }

    const vKey = `${pRow < row || pRow > row ? "v" : "h"}_${d}`
    const v = visited[row][col].get(vKey);
    if (v && v <= value) continue;
    visited[row][col].set(vKey, value);

    if (d == 3) {
      if (pRow < row || pRow > row) {
        stack.push([row, col - 1, row, col, value, 1]);
        stack.push([row, col + 1, row, col, value, 1]);
      } else {
        stack.push([row - 1, col, row, col, value, 1]);
        stack.push([row + 1, col, row, col, value, 1]);
      }
    } else {
      if (pRow == -1) {
        stack.push([row + 1, col, row, col, value, d + 1]);
        stack.push([row, col + 1, row, col, value, d + 1]);
      } else if (pRow < row || pRow > row) {
        if (pRow < row) {
          stack.push([row + 1, col, row, col, value, d + 1]);
          stack.push([row, col - 1, row, col, value, 1]);
          stack.push([row, col + 1, row, col, value, 1]);
        } else {
          stack.push([row - 1, col, row, col, value, d + 1]);
          stack.push([row, col - 1, row, col, value, 1]);
          stack.push([row, col + 1, row, col, value, 1]);
        }
      } else {
        if (pCol < col) {
          stack.push([row - 1, col, row, col, value, 1]);
          stack.push([row + 1, col, row, col, value, 1]);
          stack.push([row, col + 1, row, col, value, d + 1]);  
        } else {
          stack.push([row - 1, col, row, col, value, 1]);
          stack.push([row + 1, col, row, col, value, 1]);
          stack.push([row, col - 1, row, col, value, d + 1]);
        }
      }
    }
  }

  return min;
}

function getVisited(input) {
  const v = [];
  for (let i = 0; i < input.length; i++) {
    const arr = [];
    for (let j = 0; j < input[0].length; j++) {
      arr.push(new Map());
    } 
    v.push(arr);
  }
  return v;
};

const startTime = performance.now()
const res = path(input);
console.log(`Result: ${res}. Took ${(performance.now() - startTime) / 1000} seconds`);
