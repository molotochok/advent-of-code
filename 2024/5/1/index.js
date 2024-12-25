const fs = require("fs");

const startTime = performance.now();

let [order, rows] = fs.readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r\n\r\n/)
  .map(s => s.split(/\r?\n/));

const orderMap = processOrder(order);
const res = processRows(rows, orderMap);

console.log(`Result: ${res}. Took: ${(performance.now() - startTime) / 1000} seconds`);

function processRows(rows, orderMap) {
  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split(',').map(s => +s);
    sum += processRow(row, orderMap);
  }
  return sum;
}

function processRow(row, orderMap) {
  const processed = new Set();

  for (let j = 0; j < row.length; j++) {
    if (orderMap.has(row[j])) {
      const nextArr = orderMap.get(row[j]);
      for (let k = 0; k < nextArr.length; k++) {
        if (processed.has(nextArr[k])) {
          return 0;
        }
      }
    }
    
    processed.add(row[j]);
  }

  return row[Math.floor(row.length / 2)];
}

function processOrder(order) {  
  const map = new Map();
  for (let i = 0; i < order.length; i++) {
    const [left, right] = order[i].split('|').map(s => +s.trim());
    
    if (map.has(left)) {
      map.get(left).push(right);
    } else {
      map.set(left, [right]);
    }
  }
  return map;
}