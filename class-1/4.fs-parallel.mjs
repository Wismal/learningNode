import { read } from "node:fs";
import { readFile } from "node:fs/promises";

Promise.all([
  readFile("./archivo.txt", "utf-8"),
  readFile("./archivo2.txt", "utf-8"),
]).then(([text, text2]) => {
  console.log("File content of the first text:\n" + text);
  console.log("File content of the second text:\n" + text2);
});
