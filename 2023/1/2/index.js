const fs = require("fs");

const findSumFromDigitsArr = (digitsArr) => {
  let sum = 0;
  for (let i = 0; i < digitsArr.length; i++) {
    let first = "";
    for (let j = 0; j < digitsArr[i].length; j++) {
      if (Number.isInteger(+digitsArr[i][j])) { 
        first = digitsArr[i][j];
        break;
      }
    }

    let last = "";
    for (let j = digitsArr[i].length - 1; j >= 0; j--) {
      if (Number.isInteger(+digitsArr[i][j])) {
        last = digitsArr[i][j];
        break;
      }
    }

    sum += +(first + last);
  }

  return sum;
}

const createDigitsArr = (arr) => {
  const digitsTree = {
    "o": { "n": { "e": 1 }
    },
    "t": {
      "w": { "o": 2 },
      "h": { "r": { "e": { "e": 3 } } }
    },
    "f": { 
      "o": { "u": { "r": 4 } },
      "i": { "v": { "e": 5 } }
    },
    "s": {
      "i": { "x": 6 },
      "e": { "v": { "e": { "n": 7 } } }
    },
    "e": { "i": { "g": { "h": { "t": 8 } } } },
    "n": { "i": {"n": {"e": 9 } }}
  };
  
  const findDigit = (node, str, i) => {
    if (!node) return "";

    if (typeof node !== 'object') {
      return node;
    }

    if (i >= str.length) return "";
    if (!node[str[i]]) return "";
    
    return findDigit(node[str[i]], str, i + 1);
  };

  const digitsArr = [];
  
  for (let i = 0; i < arr.length; i++) {
    const strArr = [];
    for(let j = 0; j < arr[i].length; j++) {
      if (Number.isInteger(+arr[i][j])) {
        strArr.push(arr[i][j]);
        continue;
      }
      
      const digit = findDigit(digitsTree, arr[i], j);
      strArr.push(digit);
    }
    digitsArr.push(strArr.join(""));
  }

  return digitsArr;
}

let arr = fs.readFileSync("input.txt").toString('UTF8').split('\r\n');
console.log(arr);

const digitsArr = createDigitsArr(arr);
console.log(digitsArr);

console.log(findSumFromDigitsArr(digitsArr));