const logger = {
  log: (...args) => {
    console.log('log.....');
    console.log(...args);
  },
  info: (...args) => {
    console.log('info.....');
    console.log(...args);
  },
  error: (...args) => {
    console.log('error.....');
    console.log(...args);
  },
};

module.exports = {
  logger,
};
