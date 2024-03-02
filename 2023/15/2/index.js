const fs = require("fs");

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .flatMap(s => s.split(","));

console.log(input);

const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h += str.charCodeAt(i);
    h = h * 17 % 256;
  }
  return h;
};

const split = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "-" || str[i] == "=") {
      operation = str[i];
      return {
        key: str.substring(0, i),
        value: str.substring(i + 1),
        operation: str[i]
      }
    }
  }

  return {};
};

const map = input.reduce((map, curr) => {
  const entry = split(curr);
  const h = hash(entry.key);

  if (map.has(h)) {
    let arr = map.get(h);
    
    if (entry.operation == "-") {
      map.set(h, arr.filter(i => i.key != entry.key));
    } else if (entry.operation == "=") {
      const obj = arr.find(v => v.key == entry.key);
      if (obj) obj.value = entry.value;
      else arr.push({ key: entry.key, value: entry.value });
    }
  } else {
    if (entry.operation == "=") {
      map.set(h, [{ key: entry.key, value: entry.value }]);
    }
  }

  return map;
}, new Map());

let res = 0;
for (let [box, arr] of map.entries()) {
  if (arr.length == 0) continue;
  console.log(box, arr);
  res += arr.reduce((acc, curr, i) => acc + (box + 1) * (i + 1) * (+curr.value), 0);
}

console.log(res);