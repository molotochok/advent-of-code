const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

function accepted(ratings, workflows) {
  const terminateKeys = ["A", "R"];
  let workflowKey = "in";

  while (!terminateKeys.includes(workflowKey)) {
    const workflow = workflows.get(workflowKey);

    for (let condition of workflow) {
      let symbolIndex = condition[0].indexOf("<");
      if (symbolIndex == -1) symbolIndex = condition[0].indexOf(">");
      if (symbolIndex == -1) {
        workflowKey = condition[0];
        break;
      }

      const key = condition[0].substring(0, symbolIndex)
      const value = +condition[0].substring(symbolIndex + 1);

      if (condition[0][symbolIndex] == "<" && ratings[key] < value 
        || condition[0][symbolIndex] == ">" && ratings[key] > value) {
        workflowKey = condition[1];
        break;
      }
    }
  }

  if (workflowKey == "R") return 0;

  return Object.values(ratings).reduce((acc, curr) => acc + +curr, 0);
}

function solution(input) {
  let res = 0;

  for (let i = 0, workflowSetup = true, workflows = new Map(); i < input.length; i++) {
    if (input[i] == "") {
      workflowSetup = false;
      continue;
    }
  
    if (workflowSetup) {
      const openCurlyBraceIndex = input[i].indexOf("{");
      const workflow = input[i].substring(0, openCurlyBraceIndex);
      const commands = input[i].substring(openCurlyBraceIndex + 1, input[i].length - 1).split(",").map(c => c.split(":"));
      workflows.set(workflow, commands);
    } else {
      const row = input[i].substring(1, input[i].length - 1);
      const ratings = row.split(",").map(r => r.split("=")).reduce((acc, curr) => {
        acc[curr[0]] = curr[1];
        return acc;
      }, {});
  
      res += accepted(ratings, workflows);
    }
  }

  return res;
};

const res = solution(input);
console.log(`Result: ${res}. Took ${(performance.now() - startTime) / 1000} seconds`);
