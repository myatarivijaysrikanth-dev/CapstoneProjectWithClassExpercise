const moment = require("moment");

const name = process.argv[2];

if (!name) {
    console.log("Please provide your name");
    process.exit();
}

const now = moment().format("ddd MMM D YYYY, h:mm A");

console.log(`Hello, ${name}! Today is ${now}`);