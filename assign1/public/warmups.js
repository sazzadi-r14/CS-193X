/* Replace the TODO in the next line with your sunetid */
import checkAnswer from "https://web.stanford.edu/class/cs193x/assign1/debugme.js?sunetid=sazzad14";

import DATA from "./data.js";

/* Call this function from the console and use the debugger to find the secret code. */
const debugExercise = () => {
  checkAnswer("TODO");
  /* Strategy: TODO */
};
window.debugExercise = debugExercise;

/* Return an array of the SUNetIDs of the first N students in the data. */
const firstNSunets = (n) => {
  //TODO
};

/* Return an Object mapping department names to codes of all departments with two-character codes. */
const shortDeptCodes = () => {
  //TODO
};

/* Return the average number of units completed by the students in the data */
const averageUnits = () => {
  //TODO
};

/* Test the warmup functions */
const testWarmups = () => {
  debugExercise();

  /* These checks work by converting the return value into a string for comparison. We will talk more about JSON later in the course. */
  console.assert(JSON.stringify(firstNSunets(3)) === `["mchang91","neelk","jahchuen"]`,
    "firstNSunets() returned incorrect answer");
  console.assert(JSON.stringify(shortDeptCodes()) === `{"Computer Science":"CS","Electrical Engineering":"EE"}`,
    "shortDeptCodes() returned incorrect answer");
  console.assert(averageUnits().toFixed(3) === "176.000", "averageUnits() returned incorrect answer");

  console.log("Tests completed");
};
window.testWarmups = testWarmups;
