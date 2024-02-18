const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\n\n/)
  .map(a => a.split(/\n/));

const points = (strs) => {
  for (let i = 1, k = 0, checkpoint = 0; i < strs.length; i++) {
    if (k == -1) return checkpoint == 0 ? 1 : checkpoint;

    if (strs[i] !== strs[k]) {
      checkpoint = 0;
      if (k == i - 1) k++;
      else k = i;
    } else {
      if (k == 0) return checkpoint == 0 ? 1 : checkpoint;
      if (i == strs.length - 1) return checkpoint == 0 ? i : checkpoint;

      if (i - 1 == k) checkpoint = i;
      k--;
    }
  }

  return 0;
}

const vertical = (matrix) => {
  const strs = [];
  for(let i = 0; i < matrix[0].length; i++) {
    let str = "";
    for(let j = 0; j < matrix.length; j++) {
      str += matrix[j][i];
    }
    strs.push(str);
  }

  return points(strs);
};

const horizontal = (matrix) => {
  return points(matrix);
};

let res = input.reduce((acc, curr) => {
  const v = vertical(curr);

  if (v == 0) {
    acc += 100 * horizontal(curr);
  } else {
    acc += v;
  }

  return acc;
}, 0);

console.log("Result: ", res); // 29130
