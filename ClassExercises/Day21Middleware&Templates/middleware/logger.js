const logger = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} at ${time}`);
  next();
};

module.exports = logger;