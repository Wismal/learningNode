const fs = require("node:fs");

/* promises version
require('node:fs/promises');
 */

// Using the callback version, the classical way to read files
console.log("Reading file...");

const text = fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  console.log("File content of the first text:\n" + text);
});

console.log("Reading second file...");

const text2 = fs.readFile("./archivo2.txt", "utf-8", (err, text2) => {
  console.log("File content of the second text:\n" + text2);
});
