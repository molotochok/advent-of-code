const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

function solution(input) {
  return dfs(input, 0, findStartCol(input), {});
}

function findStartCol(input) {
  for (let i = 0; i < input[0].length; i++) {
    if (input[0][i] == '.') return i;
  }
  return -1;
}

function clone(v) {
  return Object.assign({}, v);
}

function getVisitedValue(v, row, col) {
  return v[row + "_" + col];
}

function setVisitedValue(v, row, col, value) {
  return v[row + "_" + col] = value;
}

function dfs(input, row, col, v) {
  if (input[row][col] == '#' || row == input.length - 1) {
    setVisitedValue(v, row, col, 0);
    return 0;
  }

  if (getVisitedValue(v, row, col) > -1) return getVisitedValue(v, row, col);
  if (!getVisitedValue(v, row, col)) setVisitedValue(v, row, col, 0);

  let max = 0;
  if (input[row][col] == '<' && col > 0) {
    max = 1 + dfs(input, row, col - 1, clone(v));
  } else if (input[row][col] == '>' && col < input[0].length - 1) {
    max = 1 + dfs(input, row, col + 1, clone(v));
  } else if (input[row][col] == '^' && row > 0) {
    max = 1 + dfs(input, row - 1, col, clone(v));
  } else if (input[row][col] == 'v' && row < input.length - 1) {
    max = 1 + dfs(input, row + 1, col, clone(v));
  } else {
    const cv = clone(v);
    const left = col > 0 ? dfs(input, row, col - 1, cv) : 0;
    const right = col < input[0].length - 1 ? dfs(input, row, col + 1, cv) : 0;
    const top = row > 0 ? dfs(input, row - 1, col, cv) : 0;
    const bottom = row < input.length - 1 ? dfs(input, row + 1, col, cv) : 0;
  
    max = 1 + Math.max(left, right, top, bottom);
  }
 
  setVisitedValue(v, row, col, max)
  return max;
}

const res = solution(input);
console.log(`Result: ${res}. Took ${(performance.now() - startTime) / 1000} seconds`);
