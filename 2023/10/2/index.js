const fs = require("fs");

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

const getVerticies = (matrix, i, j) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const verticies = [];

  const visited = Array(input.length).fill().map(() => Array(input[0].length).fill(0));
  const stack = [[i, j]];
  
  while(stack.length > 0) {
    [i, j] = stack.pop();
    
    if (i < 0 || i >= rows || j < 0 || j >= cols) continue;
    if (!!visited[i][j]) continue;
    visited[i][j] = 1;

    if ("SLJ7F".includes(matrix[i][j])) verticies.push([j, i]);

    switch (matrix[i][j]) {
      case "S": {
        if (i - 1 > 0 && "|7F".includes(matrix[i - 1][j]))    stack.push([i - 1, j]);
        if (i + 1 < rows && "|7F".includes(matrix[i + 1][j])) stack.push([i + 1, j]);
        if (j - 1 > 0 && "-LF".includes(matrix[i][j - 1]))    stack.push([i, j - 1]);
        if (j + 1 < cols && "-7J".includes(matrix[i][j + 1])) stack.push([i, j + 1]);
        break;
      }
      // |  is a vertical pipe connecting north and south.
      case "|": { stack.push([i - 1, j]); stack.push([i + 1, j]); break; }
      // - is a horizontal pipe connecting east and west.
      case "-": { stack.push([i, j - 1]); stack.push([i, j + 1]); break; }
      // L is a 90-degree bend connecting north and east.
      case "L": { stack.push([i - 1, j]); stack.push([i, j + 1]); break; }
      // J is a 90-degree bend connecting north and west.
      case "J": { stack.push([i - 1, j]); stack.push([i, j - 1]); break; }
      // 7 is a 90-degree bend connecting south and west.
      case "7": { stack.push([i + 1, j]); stack.push([i, j - 1]); break; }
      // F is a 90-degree bend connecting south and east.
      case "F": { stack.push([i + 1, j]); stack.push([i, j + 1]); break; }
    }
  }

  return verticies;
};

const verticies = getVerticies(input, sPos[0], sPos[1]);
console.log(verticies);

const calcArea = (v) => {
  let sum = 0;
  for (let i = 0; i < v.length - 1; i++) {
    sum += v[i][0] * v[i + 1][1] - v[i][1] * v[i + 1][0];
  }

  sum += v[v.length - 1][0] * v[0][1] - v[v.length - 1][1] * v[0][0];

  return Math.floor(Math.abs(sum) / 2);
};

const A = calcArea(verticies);
console.log("A: ", A);

const calcB = (v) => {
  let sum = 0;
  
  for (let i = 0; i < v.length - 1; i++) {
    sum += v[i][0] == v[i + 1][0]
      ? Math.abs(v[i][1] - v[i + 1][1])
      : Math.abs(v[i][0] - v[i + 1][0]);
  }

  sum += v[0][0] == v[v.length - 1][0]
      ? Math.abs(v[0][1] - v[v.length - 1][1])
      : Math.abs(v[0][0] - v[v.length - 1][0]);

  return sum;
};

const b = calcB(verticies);
console.log("b: ", b);

const i = Math.floor(A + 1 - b / 2);
console.log("Res: ", i);