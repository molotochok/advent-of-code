const fs = require("fs");

let input = fs
  .readFileSync("input.txt")
  .toString('UTF8')
  .split(/\r?\n/);

const getMap = (name, input, index) => {
  const arr = [];

  for (let i = index + 1; i < input.length; i++) {
    if (!input[i]) break;

    arr.push(input[i].split(" ").map(s => +s));
  }

  return arr;
};

let index = 0;

const seedsRow = input[index].substring(7).split(" ");
const seeds = [];
for (let i = 0; i < seedsRow.length - 1; i += 2) {
  seeds.push([+seedsRow[i], +seedsRow[i + 1]]);
}

index = 2;
const seedToSoil = getMap("seed-to-soil", input, index);

index += seedToSoil.length + 2;
const soilToFertilizer = getMap("soil-to-fertilizer", input, index);

index += soilToFertilizer.length + 2;
const fertilizerToWater = getMap("fertilizer-to-water", input, index);

index += fertilizerToWater.length + 2;
const waterToLight = getMap("water-to-light", input, index);

index += waterToLight.length + 2;
const lightToTemperature = getMap("light-to-temperature", input, index);

index += lightToTemperature.length + 2;
const temperatureToHumidity = getMap("temperature-to-humidity", input, index);

index += temperatureToHumidity.length + 2;
const humidityToLocation = getMap("humidity-to-location", input, index);


const find = (source, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (source >= arr[i][1] && source < arr[i][1] + arr[i][2]) {
      return source - arr[i][1] + arr[i][0];
    }
  }

  return source;
};

let minLocation = 99999999999;
for (let i = 0; i < seeds.length; i++) {
  for (let j = seeds[i][0]; j < seeds[i][0] + seeds[i][1]; j++) {
    const soil = find(j, seedToSoil);
    const fertilizer = find(soil, soilToFertilizer);
    const water = find(fertilizer, fertilizerToWater);
    const light = find(water, waterToLight);
    const temperature = find(light, lightToTemperature);
    const humidity = find(temperature, temperatureToHumidity);
    const location = find(humidity, humidityToLocation);
    minLocation = Math.min(location, minLocation);
  }
}
  
console.log("RESULT: ", minLocation);