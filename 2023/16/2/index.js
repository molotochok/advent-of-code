const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

console.log(input);

const traverse = (input, row, col, pRow, pCol, v) => {
  if (row < 0 || row >= input.length) return 0;
  if (col < 0 || col >= input[0].length) return 0;

  if (v[row][col].has(`${pRow},${pCol}`)) return 0;
  
  const c = v[row][col].size == 0 ? 1 : 0;
  v[row][col].add(`${pRow},${pCol}`);

  if (input[row][col] == "\\") {
    if (pRow == row) {
      if (col > pCol) return c + traverse(input, row + 1, col, row, col, v);
      if (col < pCol) return c + traverse(input, row - 1, col, row, col, v);
    } else {
      if (row > pRow) return c + traverse(input, row, col + 1, row, col, v);
      if (row < pRow) return c + traverse(input, row, col - 1, row, col, v);
    }
  } else if (input[row][col] == "/") {
    if (pRow == row) {
      if (col > pCol) return c + traverse(input, row - 1, col, row, col, v);
      if (col < pCol) return c + traverse(input, row + 1, col, row, col, v);
    } else {
      if (row > pRow) return c + traverse(input, row, col - 1, row, col, v);
      if (row < pRow) return c + traverse(input, row, col + 1, row, col, v);
    }
  } else if (input[row][col] == "|") {
    if (pRow == row) {
      return c + traverse(input, row - 1, col, row, col, v) + traverse(input, row + 1, col, row, col, v);
    } else {
      if (row > pRow) return c + traverse(input, row + 1, col, row, col, v);
      if (row < pRow) return c + traverse(input, row - 1, col, row, col, v);
    }
  } else if (input[row][col] == "-") {
    if (pRow == row) {
      if (col > pCol) return c + traverse(input, row, col + 1, row, col, v);
      if (col < pCol) return c + traverse(input, row, col - 1, row, col, v);
    } else {
      return c + traverse(input, row, col - 1, row, col, v) + traverse(input, row, col + 1, row, col, v);
    }
  }

  if (row == pRow) {
    if (col > pCol) return c + traverse(input, row, col + 1, row, col, v);
    if (col < pCol) return c + traverse(input, row, col - 1, row, col, v);
  } 

  if (row > pRow) return c + traverse(input, row + 1, col, row, col, v);
  return c + traverse(input, row - 1, col, row, col, v);    
};

const getVisitedSet = (input) => {
  const v = [];
  for (let i = 0; i < input.length; i++) {
    const row = [];
    for (let j = 0; j < input[0].length; j++) {
      row.push(new Set());
    }
    v.push(row);
  }
  return v;
};

let max = 0;
for (let i = 0; i < input.length; i++) {
  max = Math.max(max, traverse(input, i, 0, i, -1, getVisitedSet(input)));
  max = Math.max(max, traverse(input, i, input[i].length - 1, i, input[i].length, getVisitedSet(input)));
}

for (let i = 0; i < input[0].length; i++) {
  max = Math.max(max, traverse(input, 0, i, -1, i, getVisitedSet(input)));
  max = Math.max(max, traverse(input, input.length - 1, i, input.length, i, getVisitedSet(input)));
}

console.log("Result: ", max);