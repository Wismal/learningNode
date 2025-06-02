import { platform, release, type, arch, totalmem, cpus } from "node:os";

console.log("Operating System Information:");
console.log("Name of the OS:", platform());
console.log("OS Release:", release());
console.log("OS Type:", type());
console.log("OS Architecture:", arch());
console.log("Total Memory (bytes):", totalmem());
console.log("CPU Information:", cpus()); // This will log an array of CPU information objects
