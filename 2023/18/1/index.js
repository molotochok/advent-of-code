const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(s => s.split(" "));

const getCoordinates = (input) => {
  const coordinates = [];

  let p = [0, 0];
  coordinates.push(p);

  for (let i = 0; i < input.length; i++) {
    
    switch (input[i][0]) {
      case "R": p = [p[0] + +input[i][1], p[1]]; break;
      case "L": p = [p[0] - +input[i][1], p[1]]; break;
      case "D": p = [p[0], p[1] + +input[i][1]]; break;
      case "U": p = [p[0], p[1] - +input[i][1]]; break;
    }

    coordinates.push(p);
  }

  return coordinates;
};

const findArea = (coords) => {
  let sum = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    sum += coords[i][0] * coords[i + 1][1] - coords[i + 1][0] * coords[i][1];
  }

  return sum / 2;
};

const startTime = performance.now();
const a = findArea(getCoordinates(input));
const b = input.reduce((acc, curr) => acc + +curr[1], 0);
const total = a + 1 + b / 2;
console.log(`Result: ${total}. Took ${(performance.now() - startTime) / 1000} seconds`);
