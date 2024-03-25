class Queue {
  tail = null;
  head = null;

  enqueue(obj) {
    const node = { data: obj, next: null };

    if (!this.head) { 
      this.tail = node;
      this.head = node;
      return; 
    }

    this.head.next = node;
    this.head = node;
  }

  dequeue() {
    const node = this.tail;

    if (this.tail == this.head) {
      this.tail = null;
      this.head = null;
    }

    if (this.tail) {
      this.tail = this.tail.next;
    }

    if (!node) return null;

    return node.data;
  }

  empty() {
    return !this.head;
  }
}

const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/)
  .reduce((acc, curr) => {
    const arr = curr.split(" -> ");
    acc[arr[0]] = arr[1].split(", ");
    return acc;
  }, {});

function conjunctions(input) {
  const keys = Object.keys(input).filter(i => i.startsWith("&")).reduce((acc, curr) => {
    acc[curr.substring(1)] = {};
    return acc;
  }, {});
  
  Object.entries(input).forEach(([inputModule, outputModules]) => {
    for (let outputModule of outputModules) {
      if (keys[outputModule] !== undefined) {
        if (inputModule.startsWith("%") || inputModule.startsWith("&")) {
          inputModule = inputModule.substring(1);
        }

        keys[outputModule][inputModule] = false;
      }
    }
  });

  return keys;
}

function solution(input) {
  const conjs = conjunctions(input);

  const status = Object.keys(input).reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});

  const iterations = 1000;
  let lowPulses = iterations; // initial button clicks
  let highPulses = 0;

  for (let i = 1; i <= iterations; i++) {
    const queue = new Queue();
    // Pulse: low - false, high - true
    queue.enqueue(["broadcaster", false]);

    while(!queue.empty()) {
      let [inputModule, pulse] = queue.dequeue();
    
      let outputModules = input[inputModule];
      if (!outputModules) {
        if (input["%" + inputModule]) {
          outputModules = input["%" + inputModule];
          
          if (pulse) continue;

          pulse = !status[inputModule];
          status[inputModule] = !status[inputModule];
        } else if (input["&" + inputModule]) {
          outputModules = input["&" + inputModule];
          pulse = Object.values(conjs[inputModule]).filter(c => !c).length != 0;
        }
      }

      if (!outputModules) continue;

      for (let outputModule of outputModules) {
        if (conjs[outputModule] !== undefined) {
          conjs[outputModule][inputModule] = pulse;
        }

        if (pulse) highPulses++;
        else lowPulses++; 

        //console.log(`${inputModule} -${pulse ? "high" : "low"} -> ${outputModule}`);
        queue.enqueue([outputModule, pulse]);
      }
    }
  }

  return lowPulses * highPulses;
}

const res = solution(input);
console.log(`Result: ${res}. Took ${(performance.now() - startTime) / 1000} seconds`); // 898731036

