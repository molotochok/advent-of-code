const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(r => r.split(" "));

// Types:
// 7: 5
// 6: 4
// 5: 3 2
// 4: 3
// 3: 2 2
// 2: 2
// 1: 1
const getType = (hand) => {
  const map = {};

  for (let i = 0; i < hand.length; i++) {
    if (!map[hand[i]]) map[hand[i]] = 1;
    else map[hand[i]]++;
  }

  let three = false;
  let two = false;
  for (const value of Object.values(map)) {
    if (value == 5) return 7;
    if (value == 4) return 6;
    if (value == 3) { 
      if (two) return 5;
      three = true; 
    } 
    else if (value == 2) {
      if (three) return 5;
      if (two) return 3;
      two = true;
    }
  }

  if (three) return 4;
  if (two) return 2;

  return 1;
};

const getValue = (char) => {
  const map = {
    'A': 14, 'K': 13, 'Q': 12, 'J': 11, 'T': 10
  };

  return map[char] ?? +char;
};

input.sort((a, b) => {
  const typeA = getType(a[0]);
  const typeB = getType(b[0]);

  if (typeA > typeB) return -1;
  if (typeA < typeB) return 1;

  for (let i = 0; i < a[0].length; i++){
    if (getValue(a[0][i]) > getValue(b[0][i])) return -1;
    if (getValue(a[0][i]) < getValue(b[0][i])) return 1;
  }

  return 0;
});

let res = 0;
for (let i = 0; i < input.length; i++) {
  res += (+input[i][1]) * (input.length - i);
}

console.log("Result: ", res);