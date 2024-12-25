const fs = require("fs");

const startTime = performance.now();

let [order, rows] = fs.readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r\n\r\n/)
  .map(s => s.split(/\r?\n/));

const [beforeMap, afterMap] = processOrder(order);
const res = processRows(rows, beforeMap, afterMap);
console.log(`Result: ${res}. Took: ${(performance.now() - startTime) / 1000} seconds`);

function processRows(rows, beforeMap, afterMap) {
  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i].split(',').map(s => +s);
    if (!validRow(row, afterMap)) {
      row = fixRow(row, beforeMap, afterMap);
      sum += row[Math.floor(row.length / 2)];
    }
  }
  return sum;
}


function fixRow(row, beforeMap, afterMap) {
  return row.sort((a, b) => {
    const beforeA = beforeMap.get(a);
    if (beforeA && beforeA.has(b)) return 1;

    const afterA = afterMap.get(a);
    if (afterA && afterA.has(b)) return -1;

    const beforeB = beforeMap.get(b);
    if (beforeB && beforeB.has(a)) return -1;

    const afterB = afterMap.get(b);
    if (afterB && afterB.has(a)) return 1;

    return 0;
  });
}


function validRow(row, beforeMap) {
  const processed = new Set();

  for (let j = 0; j < row.length; j++) {
    if (beforeMap.has(row[j])) {
      const set = beforeMap.get(row[j]);
      for (const value of set) {
        if (processed.has(value)) {
          return false;
        }
      }
    }
    
    processed.add(row[j]);
  }

  return true;
}

function processOrder(order) {  
  const beforeMap = new Map();
  const afterMap = new Map();

  for (let i = 0; i < order.length; i++) {
    const [left, right] = order[i].split('|').map(s => +s.trim());
    
    if (afterMap.has(left)) {
      afterMap.get(left).add(right);
    } else {
      afterMap.set(left, new Set([right]));
    }

    if (beforeMap.has(right)) {
      beforeMap.get(right).add(left);
    } else {
      beforeMap.set(right, new Set([left]));
    }
  }
  return [beforeMap, afterMap];
}