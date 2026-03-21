
console.log("Node.js Version:", process.version);
console.log("Current File Name:", __filename);
console.log("Current Directory:", __dirname);
const timer = setInterval(() => {
    console.log("Welcome to Node.js!");
}, 3000);
setTimeout(() => {
    clearInterval(timer);
    console.log("Timer stopped after 10 seconds.");
}, 10000);