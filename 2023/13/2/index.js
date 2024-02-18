const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\n\n/)
  .map(a => a.split(/\n/));

const equals = (str1, str2, fatals) => {
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      if (fatals == 0) return [false, fatals];
      fatals--;
    }
  }

  return [true, fatals];
};

const points = (strs) => {
  let fatals = 1;

  for (let i = 1, k = 0, checkpoint = 0; i < strs.length; i++) {
    if (k == -1) {
      if (fatals == 0) return checkpoint == 0 ? 1 : checkpoint;
      else {
        checkpoint = 0;
        k = i - 1;
      }
    } 

    const e = equals(strs[i], strs[k], fatals);
    fatals = e[1];

    if (!e[0]) {
      if (fatals == 0 && checkpoint != 0) i = checkpoint;
      
      checkpoint = 0;
      fatals = 1;

      if (k == i - 1) k++;
      else k = i;
    } else {
      if (k == 0) {
        if (fatals == 0) return checkpoint == 0 ? 1 : checkpoint;
        k = i;
        checkpoint = 0;
        continue;
      }
      if (i == strs.length - 1) {
        if (fatals == 0) return checkpoint == 0 ? i : checkpoint;
        if (checkpoint == 0) return 0;
        i = checkpoint;
        k = i;
        checkpoint = 0;
        continue;
      } 

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

let index = 0;
let res = input.reduce((acc, curr) => {
  const v = vertical(curr);

  if (v == 0) {
    acc += 100 * horizontal(curr);
  } else {
    acc += v;
  }

  index++;
  return acc;
}, 0);

console.log("Result: ", res); // 33438
