const fs = require("fs");

const startTime = performance.now();

let input = fs
  .readFileSync(process.argv[2] + ".txt")
  .toString('UTF8')
  .split(/\r?\n/);

function accepted(workflowKey, workflows, ratings) {
  if (workflowKey == "R") return 0;
  if (workflowKey == "A") {
    return Object.values(ratings).map(v => v[1] - v[0] + 1).reduce((acc, curr) => acc * curr, 1);
  }

  const workflow = workflows.get(workflowKey);

  let res = 0;
  for (let condition of workflow) {
    let symbolIndex = condition[0].indexOf("<");
    if (symbolIndex == -1) symbolIndex = condition[0].indexOf(">");
    if (symbolIndex == -1) {
      workflowKey = condition[0];
      break;
    }

    const key = condition[0].substring(0, symbolIndex);
    const value = +condition[0].substring(symbolIndex + 1);

    if (condition[0][symbolIndex] == "<") {
      res += accepted(condition[1], workflows, {...ratings, [key]: [ratings[key][0], Math.min(ratings[key][1], value - 1)] });
      ratings = {...ratings, [key]: [Math.max(ratings[key][0], value), ratings[key][1]]};
    } else if (condition[0][symbolIndex] == ">") {
      res += accepted(condition[1], workflows, {...ratings, [key]: [Math.max(ratings[key][0], value + 1), ratings[key][1]] });
      ratings = {...ratings, [key]: [ratings[key][0], Math.min(ratings[key][1], value)]};
    } 
  }

  return res + accepted(workflowKey, workflows, ratings);
}

function solution(input) {
  const workflows = new Map();

  for (let i = 0, workflowSetup = true; i < input.length; i++) {
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
      break;
    }
  }

  return accepted("in", workflows, {a: [1, 4000], m: [1, 4000], x: [1, 4000], s: [1, 4000]});
};

const res = solution(input);
console.log(`Result: ${res}. Took ${(performance.now() - startTime) / 1000} seconds`);
