const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .map(s => s.split(""));

const rows = input.length;
const cols = input[0].length;

const top = () => {
  for (let i = 0; i < cols; i++) {
    let pos = 0;
  
    for (let j = 0; j < rows; j++) {
      if (input[j][i] == "O") {
        if (pos != j) {
          input[pos][i] = "O";
          input[j][i] = ".";
        }
        
        pos++;
      } else if (input[j][i] == "#") {
        pos = j + 1;
      }
    }  
  }  
};

const bottom = () => {
  for (let i = 0; i < cols; i++) {
    let pos = rows - 1;
  
    for (let j = rows - 1; j >= 0; j--) {
      if (input[j][i] == "O") {
        if (pos != j) {
          input[pos][i] = "O";
          input[j][i] = ".";
        }
        
        pos--;
      } else if (input[j][i] == "#") {
        pos = j - 1;
      }
    }  
  }  
};

const left = () => {
  for (let i = 0; i < rows; i++) {
    let pos = 0;
  
    for (let j = 0; j < cols; j++) {
      if (input[i][j] == "O") {
        if (pos != j) {
          input[i][pos] = "O";
          input[i][j] = ".";
        }
        
        pos++;
      } else if (input[i][j] == "#") {
        pos = j + 1;
      }
    }  
  }  
};

const right = () => {
  for (let i = 0; i < rows; i++) {
    let pos = cols - 1;
  
    for (let j = cols - 1; j >= 0; j--) {
      if (input[i][j] == "O") {
        if (pos != j) {
          input[i][pos] = "O";
          input[i][j] = ".";
        }
        
        pos--;
      } else if (input[i][j] == "#") {
        pos = j - 1;
      }
    }  
  }  
};

const toHash = () => {
  let hash = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      hash = (3 * hash + input[i][j].charCodeAt(0)) % 9999999;
    }
  }

  return hash;
};

const load = (input) => {
  let res = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (input[j][i] == "O") {
        res += rows - j;
      }
    }  
  }
  return res;
};

for (let i = 0; i < 1000; i++) {
  top();
  left();
  bottom();
  right();
}

console.log(`Result: ${load(input)}.`);
