const fs = require("fs");

const MAX_VALUE = 999999999;

let input = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split(/\r?\n/);

console.log(input);

const getStartPos = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == "S") return [i, j];
    }
  }

  return null;
};

const sPos = getStartPos(input);
console.log("StartPos: ", sPos);

const dfs = (matrix, i, j) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const visited = Array(input.length).fill().map(() => Array(input[0].length).fill(MAX_VALUE));
  visited[i][j] = 0;

  const arr = [];
  let d = 1;

  if (i - 1 > 0 && "|7F".includes(matrix[i - 1][j]))    arr.push([i - 1, j, d]);
  if (i + 1 < rows && "|7F".includes(matrix[i + 1][j])) arr.push([i + 1, j, d]);
  if (j - 1 > 0 && "-LF".includes(matrix[i][j - 1]))    arr.push([i, j - 1, d]);
  if (j + 1 < cols && "-7J".includes(matrix[i][j + 1])) arr.push([i, j + 1, d]);

  let max = 0;
  while(arr.length > 0) {
    [i, j, d] = arr.pop();
    
    if (i < 0 || i >= rows || j < 0 || j >= cols) continue;
    if (visited[i][j] != MAX_VALUE) continue;
    max = Math.max(max, d);
    visited[i][j] = d;

    d++;
    switch (matrix[i][j]) {
      // |  is a vertical pipe connecting north and south.
      case "|": { arr.push([i - 1, j, d]); arr.push([i + 1, j, d]); break; }
      // - is a horizontal pipe connecting east and west.
      case "-": { arr.push([i, j - 1, d]); arr.push([i, j + 1, d]); break; }
      // L is a 90-degree bend connecting north and east.
      case "L": { arr.push([i - 1, j, d]); arr.push([i, j + 1, d]); break; }
      // J is a 90-degree bend connecting north and west.
      case "J": { arr.push([i - 1, j, d]); arr.push([i, j - 1, d]); break; }
      // 7 is a 90-degree bend connecting south and west.
      case "7": { arr.push([i + 1, j, d]); arr.push([i, j - 1, d]); break; }
      // F is a 90-degree bend connecting south and east.
      case "F": { arr.push([i + 1, j, d]); arr.push([i, j + 1, d]); break; }
    }
  }

  console.log(visited);
  console.log(max);

  return Math.ceil(max / 2);
};

const res = dfs(input, sPos[0], sPos[1]);
console.log("Result: ", res);