const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("userLoggedIn", (user) => {
  console.log(`User ${user} logged in.`);
});

emitter.on("userLoggedOut", (user) => {
  console.log(`User ${user} logged out.`);
});

emitter.on("sessionExpired", (user) => {
  console.log(`Session expired for ${user}.`);
});

emitter.emit("userLoggedIn", "John");

setTimeout(() => {
  emitter.emit("sessionExpired", "John");
}, 5000);

emitter.emit("userLoggedOut", "John");
