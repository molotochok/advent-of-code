const fs = require("fs");

let input = fs
  .readFileSync("test.txt")
  .toString('UTF8')
  .split(/\r?\n/);

console.log(input);

const galaxies = [];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] == "#") {
      galaxies.push([j, i]);      
    }
  }  
}

// Expand rows
for (let i = 0, k = 0; i < input.length; i++) {
  const foundGalaxies = galaxies.filter(g => g[1] == i);
  if (foundGalaxies.length > 0) foundGalaxies.forEach(g => g[1] = (g[1] + k) * (-1)); 
  else k++; 
}

// Expand columns
for (let i = 0, k = 0; i < input[0].length; i++) {
  const foundGalaxies = galaxies.filter(g => g[0] == i);
  if (foundGalaxies.length > 0) foundGalaxies.forEach(g => g[0] = (g[0] + k) * (-1)); 
  else k++; 
}

// Calculate result
let res = 0;
for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    res += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
  }
}

console.log("Result: ", res);
