const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(s => s.split(" "));

const getInfo = (input) => {
  const coordinates = [];

  let p = [0, 0];
  coordinates.push(p);

  let edgePoints = 0;
  for (let i = 0; i < input.length; i++) {
    const color = input[i][2];
    const dir = color[color.length - 2];
    const value = Number(`0x${color.substring(2, color.length - 2)}`);
    switch (dir) {
      case "0": p = [p[0] + value, p[1]]; break;
      case "2": p = [p[0] - value, p[1]]; break;
      case "1": p = [p[0], p[1] + value]; break;
      case "3": p = [p[0], p[1] - value]; break;
    }

    coordinates.push(p);
    edgePoints += value;
  }

  return [coordinates, edgePoints];
};

const findArea = (coords) => {
  let sum = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    sum += coords[i][0] * coords[i + 1][1] - coords[i + 1][0] * coords[i][1];
  }

  console.log(sum, sum >> 1, sum << 1, sum / 2);

  return sum / 2;
};

const startTime = performance.now();
const [coords, b] = getInfo(input);
console.log(coords);
const a = findArea(coords);
const total = a + 1 + b / 2;
console.log(`Result: ${total}. Took ${(performance.now() - startTime) / 1000} seconds`);
