/*
Task 1b: Working with data structures
For the rest of this assignment, you'll work with data for a few sample students and departments.

First, open data.js to have a look at the provided data. The file exports a single JavaScript Object with three entries:

students is an Array of Objects, each object representing a student. A student object contains their givenName, their surname, and their sunetid. (Note: These aren't the CAs' actual SUNetIDs.) You can assume that SUNetIDs will be unique across all students in the array.
depts is an Array of Objects. Each object contains information about a department: its name (like "Computer Science") and its code (like "CS").
units is an Object mapping student SUNetIDs (keys) to the number of units that student has completed (values). You may assume that there will be one entry in the object for each student in students.
This data object has been imported into warmups.js as the variable DATA. Once you have reviewed the data, fill in the functions in warmups.js, using DATA, as follows:

[start deliverable]
firstNSunets returns the SUNetIDs of the first n students (n is a parameter to the function) in the students array. You can assume there are at least n students.
shortDeptCodes returns an Object whose keys are department names and whose values are their corresponding codes. But only include a department in the result if its code is exactly two characters long.
averageUnits returns the average number of units completed by all students in the data. You can assume there will be at least one student, and you don't need to round or truncate the result.
*/


/* Replace the TODO in the next line with your sunetid */
import checkAnswer from "https://web.stanford.edu/class/cs193x/assign1/debugme.js?sunetid=sazzad14";

import DATA from "./data.js";

/* Call this function from the console and use the debugger to find the secret code. */
const debugExercise = () => {
  checkAnswer("pGgWgbn0");
  /* I went to the dev tool in my Chrome and then went to sources. Inside the warmup.js file, I set a breakpoint inside the debugExercise function.
  From there Scope >> Module >> checkAnswers >> Scopes >> 0: Module >> secret: "pGgWgbn0rb2Yf384oZKo0Ac51pfaBxTJ0CwLSbjJZwM= */
};
window.debugExercise = debugExercise;

/* Return an array of the SUNetIDs of the first N students in the data. */
const firstNSunets = (n) => {
  return DATA.students.slice(0, n).map((student) => student.sunetid);
};

/* Return an Object mapping department names to codes of all departments with two-character codes. */
const shortDeptCodes = () => {
  const result = {};
  DATA.depts.forEach((dept) => {
    if (dept.code.length === 2) {
      result[dept.name] = dept.code;
    }
  });
  return result;
};

/* Return the average number of units completed by the students in the data */
const averageUnits = () => {
  const totalUnits = Object.values(DATA.units).reduce((total, units) => total + units, 0);
  return totalUnits / Object.values(DATA.units).length;
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
