const path = require("node:path");

// in unix-like systems, the path separator is "/"
// in windows, the path separator is "\"
console.log("Path separator: " + path.sep);
// join rutes with path.join

const filePath = path.join("folder", "subfolder", "file.txt");
console.log("File path: " + filePath);
//in unix-like systems, the path is "folder/subfolder/file.txt"
//in windows, the path is "folder\subfolder\file.txt"

const extension = path.extname("j.djsod.jsp.jpg.image.jpg");
console.log("File extension: " + extension);
