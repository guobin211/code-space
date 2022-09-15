// ===========================================================================
// es6 module
/**
 * @description
 * ```
 * Object.defineProperty(exports, "__esModule", { value: true });
 * Module {
 *   default: {},
 *   logger: {},
 * }
 * ```
 */
export const logger = {
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

export function testSpeed(fn) {
  const start = new Date();
  fn();
  const end = new Date();
  console.log(`Time elapsed: ${(end - start) / 1000} seconds.`);
}

export default {
  logger,
};
